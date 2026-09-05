import { Injectable } from '@nestjs/common';
import { PrismaService } from '../DBConnection/prisma.service.js';
import { extractTextFromPDF } from '../Common/Utils/extractText.helper.js';
import { chunkText } from '../Common/Utils/chunkText.helper.js';
import { embeddingText } from '../Common/Utils/embedText.helper.js';
import { GoogleGenAI } from '@google/genai'
import dotenv from 'dotenv';
dotenv.config();
@Injectable()
export class RagService {
  constructor(private readonly prisma: PrismaService) {}

  async uploadPDF(file: any) {
    const fileName = file.originalname;
    const fileBuffer = file.buffer;

    const UploadedFile = await this.prisma.document.create({
      data: {
        user_id: Number(5),
        file_name: fileName,
      }
    })

    const extractedText = await extractTextFromPDF(fileBuffer);
    const chunks = await chunkText(extractedText, 1000, 150,PrismaService, Number(UploadedFile.id));
    const embeddings = await embeddingText(chunks, PrismaService, Number(UploadedFile.id));

    for (let i = 0; i < chunks.length; i++) {
      await this.prisma.$executeRaw`
       INSERT INTO document_chunks (document_id, content, embedding) VALUES (${UploadedFile.id}, ${chunks[i]}, ${embeddings[i]}::vector)`
    }

    return { message: 'File uploaded successfully', data: UploadedFile.file_name, user_id: Number(UploadedFile.user_id), id: Number(UploadedFile.id) };
  }

  async getDocument(user_id: any) {
    const documents = await this.prisma.document.findMany({
      where: {
        user_id : BigInt(user_id),
      },
    });

    const formatDocuments = documents.map((doc) => ({
      id: Number(doc.id),
      name: doc.file_name,
      created_at: doc.created_at,
    }));

    return { message: 'Documents retrieved successfully', data: formatDocuments};
  }

  async askQuestion(document_id: any, prompt: string) {
    const embedPrompt = await embeddingText([prompt], PrismaService, Number(document_id), "RETRIEVAL_QUERY");
    const embed  = `[${embedPrompt.join(',')}]`;

    const ai = new GoogleGenAI({
      apiKey: process.env.GOOGLE_API_KEY
    });

    const chunks = await this.prisma.$queryRaw<{content : string, embedding : any}[]>`
      SELECT content, embedding <=> ${embed}::vector AS distance FROM document_chunks
      WHERE document_id = ${document_id}
      ORDER BY distance ASC
      LIMIT 3`;

    const context = chunks.map((chunk: any) => chunk.content).join('\n\n');
    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          text: `You are a helpful assistant. And Dont answer in 2-3 words, make your answer more descriptive (a complete sentence). And answer any concepts that might be relevant to the questions, for example, if the question is about a specific topic, provide a detailed explanation of that topic. Don't Answer questions beyond the context. \n\nContext:\n${context}\n\nQuestion: ${prompt}`,
        }
      ]
    })

    return { message: 'Question answered successfully', data: response.text};
  }
}
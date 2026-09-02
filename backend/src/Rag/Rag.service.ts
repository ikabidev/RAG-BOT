import { Injectable } from '@nestjs/common';
import { PrismaService } from '../DBConnection/prisma.service.js';
import { extractTextFromPDF } from '../Common/Utils/extractText.helper.js';
import { chunkText } from '../Common/Utils/chunkText.helper.js';
import { embeddingText } from '../Common/Utils/embedText.helper.js';
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
}
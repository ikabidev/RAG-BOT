import { GoogleGenAI } from '@google/genai'
import dotenv from 'dotenv';
dotenv.config();

  export async function embeddingText(text: any, PrismaService: any, documentId: number, taskType = "RETRIEVAL_DOCUMENT"){
    const ai = new GoogleGenAI({
      apiKey: process.env.GOOGLE_API_KEY
    });

    const embeds = [];

    for(const chunk of text){
      const response = await ai.models.embedContent({
        model : "gemini-embedding-001",
        contents : chunk,
        config : {
          taskType,
          outputDimensionality : 1536
        }
      })

      if(!response.embeddings || response.embeddings.length === 0){
        throw new Error("No embeddings returned from the API");
      }

      embeds.push(response.embeddings[0].values);
    }
    return embeds;
  }
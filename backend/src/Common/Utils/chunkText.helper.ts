  export async function chunkText(text: string, chunkSize: number, chunkOverlap: number, PrismaService: any, documentId: number) {
    const cleanedText = text.replace(/\s+/g, ' ').trim();
    const chunks = [];

    for(let i = 0; i < cleanedText.length; i += chunkSize - chunkOverlap){
      const chunk = cleanedText.slice(i, i + chunkSize);
      chunks.push(chunk)
    }
    return chunks;
  }
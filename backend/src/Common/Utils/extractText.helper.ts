import { getDocument } from 'pdfjs-dist';


  export async function extractTextFromPDF(fileBuffer: Buffer) {
    const loadingTask = getDocument({data: new Uint8Array(fileBuffer)});
    const pdfDocument = await loadingTask.promise;
    let extractedText = '';

    for (let pageNum = 1; pageNum <= pdfDocument.numPages; pageNum++) {
      const page = await pdfDocument.getPage(pageNum);
      const textContent = await page.getTextContent();

      const pageText = textContent.items.map(item => ('str' in item ? item.str : '')).join(' ');
      extractedText += pageText + '\n';
    }

    return extractedText;
  }
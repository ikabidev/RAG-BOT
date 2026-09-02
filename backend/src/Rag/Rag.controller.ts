import { Query, Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { RagService } from './Rag.service.js';

@Controller('rag')
export class RagController {
  constructor(private readonly ragService: RagService ) {}

  @Post('upload-pdf')
  @UseInterceptors(FileInterceptor('file'))
  async uploadPDF(@UploadedFile() file: any) {
    return this.ragService.uploadPDF(file);
  }

  @Get('get-document')
  async getDocument(@Query('user_id') user_id: number) {
    return this.ragService.getDocument(user_id);
  }
}
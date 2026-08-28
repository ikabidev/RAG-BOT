import { Controller, Get } from '@nestjs/common';
import { RagService } from './Rag.service.js';

@Controller('rag')
export class RagController {
  constructor(private readonly ragService: RagService ) {}

  @Get('test-db')
  testDatabase() {
    return this.ragService.testDatabase();
  }
}
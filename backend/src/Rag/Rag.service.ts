import { Injectable } from '@nestjs/common';
import { PrismaService } from '../DBConnection/prisma.service.js';

@Injectable()
export class RagService {
  constructor(private readonly prisma: PrismaService) {}

  async testDatabase() {
    const result = await this.prisma.$queryRaw`SELECT * FROM document`;
    return result;
  }
}
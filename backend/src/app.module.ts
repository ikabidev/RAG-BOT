import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { DBModule } from './DBConnection/db.module.js';
import { RagModule } from './Rag/Rag.module.js';
import { UserModule } from './User/User.module.js';

@Module({
  imports: [DBModule, RagModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

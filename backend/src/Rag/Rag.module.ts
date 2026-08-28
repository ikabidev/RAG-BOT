import {Global, Module} from '@nestjs/common';
import {RagService} from './Rag.service.js';
import {RagController} from './Rag.controller.js';

@Global()
@Module({
  providers: [RagService],
  exports: [RagService],
  controllers: [RagController],
})
export class RagModule {}
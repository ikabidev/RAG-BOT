import {Global, Module} from '@nestjs/common';
import {UserService} from './User.service.js';
import {UserController} from './User.controller.js';

@Global()
@Module({
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
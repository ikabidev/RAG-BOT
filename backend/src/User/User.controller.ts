import { Controller, Get, Post } from '@nestjs/common';
import { UserService } from './User.service.js';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register() {
    // Implement your registration logic here
    return this.userService.register('kabi', 'Welcome@123', 'kabi@mail.com');
  }

  @Post('login')
  login() {
    // Implement your login logic here
    return this.userService.login('kabi@mail.com', 'Welcome@123');
  }
}
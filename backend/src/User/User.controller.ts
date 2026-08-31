import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './User.service.js';
import { LoginDto,RegisterDto } from './DTO/User.dto.js';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() body: RegisterDto) {
    return this.userService.register(body.username, body.password, body.email);
  }

  @Post('login')
  async login(@Body() body: LoginDto) {
    return this.userService.login(body.email, body.password);
  }
}
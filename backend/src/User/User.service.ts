import { Injectable } from '@nestjs/common';
import { PrismaService } from '../DBConnection/prisma.service.js';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async register(username: string, password: string, email: string) {
    const user =await this.prisma.users.create({
      data: { user_name: username, password, email },
    });

    return { 
      message: 'User registered successfully', data : {...user, id: Number(user.id )}
    };
  }

  async login(email: string, password: string) {
    const user = await this.prisma.users.findUnique({
      where: { email: email },
    });

    if (!user || user.password !== password) {
      return { status: 401, message: 'Invalid email or password' };
    }

    return { status: 200, message: 'User logged in successfully', data : {email: user.email, user_name: user.user_name, id: Number(user.id )}};
  }
}
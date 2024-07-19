import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    return await this.prisma.user.create({
      data: {
        username: createUserDto.username,
        name: createUserDto.name,
        keyPackage: createUserDto.keyPackage as Prisma.JsonObject,
      },
    });
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(username: string) {
    const user = await this.prisma.user.findUnique({
      where: { username: username },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}

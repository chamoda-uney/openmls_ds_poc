import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserKeyPackageDto } from './dto/update-user-key-package.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':username')
  findOne(@Param('username') username: string) {
    return this.userService.findOne(username);
  }

  @Patch(':username')
  updateKeyPackage(
    @Param('username') username: string,
    @Body() updateUserKeyPackageDto: UpdateUserKeyPackageDto,
  ) {
    return this.userService.updateKeyPackage(username, updateUserKeyPackageDto);
  }
}

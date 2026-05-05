import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { createUserDto } from './create-user-dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  create(@Body() body: createUserDto) {
    return this.userService.create(body);
  }

  @Get()
  findOne(email: string) {
    return this.userService.findOne(email);
  }
}

import { Injectable } from '@nestjs/common';
import { IsEmail, IsString, MinLength } from 'class-validator';

@Injectable()
export class createUserDto {
  @IsString()
  @MinLength(3)
  username!: string;

  @IsEmail()
  @IsString()
  @MinLength(9)
  email!: string;

  @IsString()
  @MinLength(8)
  password!: string;
}

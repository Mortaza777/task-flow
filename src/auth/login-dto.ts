import { Injectable } from '@nestjs/common';
import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

@Injectable()
export class LoginDto {
  @IsEmail()
  @IsString()
  email!: string;

  @IsString()
  @MinLength(8)
  password!: string;

  @IsOptional()
  @IsBoolean()
  rememberMe?: boolean;
}

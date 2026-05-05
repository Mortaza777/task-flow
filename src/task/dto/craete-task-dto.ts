import { Injectable } from '@nestjs/common';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

Injectable();
export class cretaeTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  dueDate: string;

  @IsNotEmpty()
  @IsString()
  dueTime: string;

  @IsOptional()
  @IsString()
  priority: string;
}

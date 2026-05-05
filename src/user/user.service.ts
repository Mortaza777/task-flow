/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user-entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { createUserDto } from './create-user-dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userEntity: Repository<UserEntity>,
  ) {}

  async create(data: createUserDto) {
    const { email, password, username } = data;

    const existingUser = await this.userEntity.findOne({ where: { email } });

    if (existingUser) {
      throw new BadRequestException('email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.userEntity.create({
      username,
      email,
      password: hashedPassword,
    });

    return this.userEntity.save(user);
  }

  async findOne(email: string) {
    return await this.userEntity.findOne({ where: { email } });
  }
}

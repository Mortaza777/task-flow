/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user-entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { forgerPasswordDto } from './dto/forger-password-dto';
import { resetPasswordDto } from './dto/reset-password-dto';
import { MailerService } from '@nestjs-modules/mailer';
import { LoginDto } from './login-dto';
import { TaskEntity } from 'src/task/entities/task-entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private UserRepository: Repository<UserEntity>,
    @InjectRepository(TaskEntity)
    private TaskRepository: Repository<TaskEntity>,
    private JwtService: JwtService,
    private mailerService: MailerService,
  ) {}

  async login(LoginDto: LoginDto) {
    const { email, password, rememberMe } = LoginDto;

    const user = await this.UserRepository.createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email })
      .getOne();

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const IsMatch = await bcrypt.compare(password, user.password);

    if (!IsMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = {
      sub: user.id,
      email: user.email,
    };

    const access_token = this.JwtService.sign(payload, {
      expiresIn: rememberMe ? '30d' : '1d',
    });

    const { password: _, ...userWithuotPassword } = user;

    return {
      message: 'Login successfuly',
      access_token,
      user: userWithuotPassword,
    };
  }

  async ForgetPassword(forgetPasswordDto: forgerPasswordDto) {
    const { email } = forgetPasswordDto;

    const user = await this.UserRepository.findOne({ where: { email } });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const resetToken = this.JwtService.sign(
      {
        email: user.email,
        id: user.id,
      },
      {
        secret: 'ResetPasswordSecret',
        expiresIn: '15m',
      },
    );

    const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;

    return {
      message: 'Rest token create successfully',
      resetToken,
    };

    return {
      message: 'Reset token created successfully',
    };
  }

  async ResetPassword(resetPasswordDto: resetPasswordDto) {
    const { token, newpassword, confirmPassword } = resetPasswordDto;

    if (newpassword !== confirmPassword) {
      throw new BadRequestException('password do not match');
    }

    let payload;

    try {
      payload = this.JwtService.verify(token, {
        secret: 'ResetPasswordSecret',
      });
    } catch (error) {
      throw new BadRequestException('Invalid or expired token');
    }

    const user = await this.UserRepository.findOne({
      where: { email: payload.email },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const hashedPassword = await bcrypt.hash(newpassword, 10);

    user.password = hashedPassword;

    await this.UserRepository.save(user);

    return {
      message: 'Password reset successfully',
    };
  }

  async deleteAccount(userId: number) {
    await this.TaskRepository.delete({
      id: userId,
    });

    await this.UserRepository.delete(userId);

    return {
      message: 'Account delete successfully',
    };
  }
}

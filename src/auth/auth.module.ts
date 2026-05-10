import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user-entity';
import { JwtModule } from '@nestjs/jwt';
import { MailerModule } from '@nestjs-modules/mailer';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './stratigies/jwt-strategy';
import { TaskEntity } from 'src/task/entities/task-entity';

@Module({
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([UserEntity, TaskEntity]),
    JwtModule.register({
      secret: 'mySecretKey',
      signOptions: {
        expiresIn: '1d',
      },
    }),

    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        auth: {
          user: 'yourgmail@gmail.com',
          pass: 'your-app-password',
        },
      },
    }),
  ],
})
export class AuthModule {}

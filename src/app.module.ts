import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { UserEntity } from './user/user-entity';
import { AuthModule } from './auth/auth.module';
import { TaskEntity } from './task/entities/task-entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'MHmortaza9090',
      database: 'tasks-db',
      autoLoadEntities: true,
      synchronize: true,
      entities: [UserEntity, TaskEntity],
    }),
    UserModule,
    TaskModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

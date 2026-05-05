/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Delete,
  Param,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { cretaeTaskDto } from './dto/craete-task-dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth-guard';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  createTask(@Body() createTaskDto: cretaeTaskDto, @Request() req) {
    return this.taskService.createTask(createTaskDto, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('my-task')
  getMyTask(@Request() req) {
    return this.taskService.getMyTask(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: number, @Request() req) {
    return this.taskService.deleteTask(id, req.user.userId);
  }
}

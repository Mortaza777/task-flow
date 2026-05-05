import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './entities/task-entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/user/user-entity';
import { cretaeTaskDto } from './dto/craete-task-dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private taskrepository: Repository<TaskEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async createTask(createTaskdto: cretaeTaskDto, userId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const task = this.taskrepository.create({
      ...createTaskdto,
      user,
    });

    await this.taskrepository.save(task);

    return {
      message: 'Task create successfully',
      task,
    };
  }

  async getMyTask(userId: number) {
    const tasks = await this.taskrepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
      order: { id: 'DESC' },
    });

    return {
      message: 'Tasks fetched successfully',
      tasks: tasks,
    };
  }

  async deleteTask(taskId: number, userId: number) {
    const task = await this.taskrepository.findOne({
      where: { id: taskId, user: { id: userId } },
      relations: ['user'],
    });

    if (!task) {
      throw new BadRequestException('Task not found or access denied');
    }

    await this.taskrepository.remove(task);

    return {
      message: 'Task delete successfully',
    };
  }
}

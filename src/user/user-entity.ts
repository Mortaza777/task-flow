import { TaskEntity } from 'src/task/entities/task-entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column({ select: false })
  password: string;

  @OneToMany(() => TaskEntity, (task) => task.user)
  tasks: TaskEntity[];
}

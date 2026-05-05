import { UserEntity } from 'src/user/user-entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  dueDate: string;

  @Column()
  dueTime: string;

  @Column({ default: 'medium' })
  priority: string;

  @Column({ default: false })
  isComplate: boolean;

  @ManyToOne(() => UserEntity, (user) => user.tasks, { onDelete: 'CASCADE' })
  user: UserEntity;
}

// entities/UserManagement.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user';
import { GroupMember } from './groupMember';

@Entity('user_management')
export class UserManagement {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.userManagements)
  user: User;

  @ManyToOne(() => Group, group => group.userManagements)
  group: Group;

  @Column()
  join_date: Date;

  @Column()
  group_role: string;
}
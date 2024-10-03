import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Sprint } from "./sprint";

@Entity()
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn()
  projectId: number = 0;

  @Column()
  name: string | null = null;

  @Column()
  avatar: string | null = null;

  @Column({ type: "timestamptz" })
  created: Date | null = null;

  @Column({ type: "timestamptz" })
  modified: Date | null = null;

  @OneToMany(() => Sprint, (sprint) => sprint.project)
  sprints: Sprint[] = [];
}

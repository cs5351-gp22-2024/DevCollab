import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Sprint } from "./sprint";

@Entity("Project")
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn()
  projectId: number = 0;

  @Column({ type: "varchar" })
  name: string = "";

  @Column({ type: "varchar", nullable: true })
  description: string | null = null;

  @Column({ type: "varchar", nullable: true })
  avatar: string | null = null;

  @Column({ type: "timestamp" })
  created: Date | null = null;

  @Column({ type: "timestamp" })
  modified: Date | null = null;

  @OneToMany(() => Sprint, (sprint) => sprint.project)
  sprints: Sprint[] | null = null;
}

import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Project } from "./project";

@Entity("Sprint")
export class Sprint extends BaseEntity {
  @PrimaryGeneratedColumn()
  sprintId: number = 0;

  @ManyToOne(() => Project, (project) => project.sprints)
  @JoinColumn({ name: "projectId" })
  project: Project | null = null;

  @Column({ type: "timestamp" })
  startDate: Date | null = null;

  @Column({ type: "timestamp" })
  endDate: Date | null = null;
}

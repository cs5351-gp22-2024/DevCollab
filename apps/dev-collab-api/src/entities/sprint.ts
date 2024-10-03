import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Project } from "./project";

@Entity()
export class Sprint extends BaseEntity {
  @PrimaryGeneratedColumn()
  sprintId: number = 0;

  @ManyToOne(() => Project, (project) => project.sprints)
  project: Project | null = null;

  @Column({ type: "timestamptz" })
  startDate: Date | null = null;

  @Column({ type: "timestamptz" })
  endDate: Date | null = null;
}

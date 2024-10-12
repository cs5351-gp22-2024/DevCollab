// entities/userStory.ts
import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
  } from "typeorm";
  import { Project } from "./project"; // Assuming user stories belong to a project
  import { Sprint } from "./sprint";   // Assuming user stories can belong to a sprint
  
  @Entity("UserStory")
  export class UserStory extends BaseEntity {
    @PrimaryGeneratedColumn()
    userStoryId: number = 0;
  
    @Column({ type: "varchar" })
    title: string = "";
  
    @Column({ type: "varchar" })
    asA: string = "";
  
    @Column({ type: "varchar" })
    iWantTo: string = "";
  
    @Column({ type: "varchar" })
    soThat: string = "";
  
    @Column({ type: "enum", enum: ["Low", "Medium", "High"] })
    priority: "Low" | "Medium" | "High" = "Medium";
  
    @Column({ type: "timestamp" })
    dueDate: Date | null = null;
  
    @ManyToOne(() => Project, (project) => project.sprints) // Relationship with Project
    @JoinColumn({ name: "projectId" })
    project: Project | null = null;
  
    @ManyToOne(() => Sprint, (sprint) => sprint.project) // Optional: if related to a Sprint
    @JoinColumn({ name: "sprintId" })
    sprint: Sprint | null = null;
  }
  
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Project } from "./project";

@Entity("Task")
export class Task extends BaseEntity {
    @PrimaryGeneratedColumn()
    taskId: number = 0;

    @Column({ type: "varchar" })
    name: string = "";

    @Column({ type: "varchar", nullable: true })
    description: string | null = null;

    @Column({ type: "enum", enum: ["Low", "Medium", "High"] })
    priority: "Low" | "Medium" | "High" = "Medium";

    @Column({ type: "varchar", nullable: true })
    assignee: string | null = null;

    @Column({ type: "varchar" })
    status: string | null = null;

    @Column({ type: "timestamp" })
    duedate: Date | null = null;

    @Column({ name: "projectId" })
    projectId: number = 0;

    // @OneToMany(() => Sprint, (sprint) => sprint.project)
    // sprints: Sprint[] = [];
}
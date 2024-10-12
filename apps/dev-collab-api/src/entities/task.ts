import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Task")
export class Task extends BaseEntity {
    @PrimaryGeneratedColumn()
    taskid: number = 0;

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

    @Column({ type: "timestamp" })
    created: Date | null = null;

    @Column({ type: "timestamp" })
    modified: Date | null = null;

    @Column({ type: "integer" })
    projectId: number | null = null;

    // @OneToMany(() => Sprint, (sprint) => sprint.project)
    // sprints: Sprint[] = [];
}
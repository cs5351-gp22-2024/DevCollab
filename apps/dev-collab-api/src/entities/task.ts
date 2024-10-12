import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Task")
export class Task extends BaseEntity {
    @PrimaryGeneratedColumn()
    taskId: number = 0;

    @Column({ type: "varchar" })
    name: string = "";

    @Column({ type: "varchar" })
    status: string | null = null;

    @Column({ type: "varchar", nullable: true })
    assignee: string | null = null;

    @Column({ type: "varchar", nullable: true })
    description: string | null = null;

    @Column({ type: "varchar" })
    priority: string | null = null;

    @Column({ type: "date" })
    duedate: Date | null = null;

    // @OneToMany(() => Sprint, (sprint) => sprint.project)
    // sprints: Sprint[] = [];
}
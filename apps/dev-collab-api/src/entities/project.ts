import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

  // @OneToMany(() => Sprint, (sprint) => sprint.project)
  // sprints: Sprint[] = [];
}

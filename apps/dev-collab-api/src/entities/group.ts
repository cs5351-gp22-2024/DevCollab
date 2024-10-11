import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BaseEntity,
} from "typeorm";

@Entity("group") // Table name in the database
export class Group extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "group_id" })
  userId!: number; // Primary key that starts from 1000

  @Column({ type: "varchar", length: 1000 })
  group_name!: string;

  @Column({ type: "varchar", length: 255 }) // Adjust length as needed
  creator_id!: string;

  @CreateDateColumn({ name: "create_time", type: "timestamp" })
  create_time!: Date;

  constructor(name: string) {
    super();
    this.group_name = name;
  }
}

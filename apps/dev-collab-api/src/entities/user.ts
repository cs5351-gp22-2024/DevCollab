import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity("users") // Table name in the database
export class User {
  @PrimaryGeneratedColumn({ name: "user_id" })
  userId!: number; // Primary key that starts from 1000

  @Column({ type: "varchar", length: 1000 })
  name!: string; 

  @Column({ type: "varchar", length: 1000, unique: true })
  email!: string; //(unique)

  @Column({ type: "varchar", length: 255 }) // Adjust length as needed
  password!: string; // User password (hashed)

  @Column({ name: "email_2fa", type: "boolean", default: false })
  email_2fa!: boolean; // Two-factor authentication status

  @CreateDateColumn({ name: "last_activity_time", type: "timestamp" })
  last_activity_time!: Date ; // Last activity timestamp

  @CreateDateColumn({ name: "last_password_modify", type: "timestamp" })
  last_password_modify!: Date ; 

  @CreateDateColumn({ name: "create_time", type: "timestamp" })
  create_time!: Date;
}

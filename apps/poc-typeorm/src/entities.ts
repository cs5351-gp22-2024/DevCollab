import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("User")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  userId: number = 0;

  @Column({ type: "varchar", nullable: true })
  name: string | null = null;

  @OneToMany(() => Flower, (flower) => flower.user)
  flowers: Flower[] | null = null;

  @Column({ type: "timestamp" })
  updated: Date | null = null;
}

@Entity("Flower")
export class Flower extends BaseEntity {
  @PrimaryGeneratedColumn()
  flowerId: number = 0;

  @Column({ type: "varchar", nullable: true })
  name: string | null = null;

  @ManyToOne(() => User, (user) => user.flowers)
  @JoinColumn({ name: "userId" })
  user: User | null = null;
}

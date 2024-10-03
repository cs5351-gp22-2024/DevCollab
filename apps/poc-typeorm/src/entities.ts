import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  userId: number = 0;

  @Column()
  name: string | null = null;
}

@Entity()
export class Flower extends BaseEntity {
  @PrimaryGeneratedColumn()
  flowerId: number = 0;

  @Column()
  name: string | null = null;
}

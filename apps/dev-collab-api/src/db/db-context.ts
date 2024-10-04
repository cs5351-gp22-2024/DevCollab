import { BaseEntity } from "typeorm";

export interface IDbContext {
  needCreate(entity: BaseEntity): Promise<void>;
  save(): Promise<void>;
}

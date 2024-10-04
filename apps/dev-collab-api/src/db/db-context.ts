import { BaseEntity, EntityManager, Repository } from "typeorm";
import { Project } from "../entities/project";

export interface IDbContext {
  get projects(): Repository<Project>;
  needCreate(entity: BaseEntity): void;
  needUpdate(entity: BaseEntity): void;
  save(): Promise<void>;
}

export class DbContext implements IDbContext {
  private _toCreate: BaseEntity[] = [];

  private _toUpdate: BaseEntity[] = [];

  constructor(private _tx: EntityManager) {}

  get projects() {
    return this._tx.getRepository(Project);
  }

  needCreate(entity: BaseEntity): void {
    this._toCreate.push(entity);
  }

  needUpdate(entity: BaseEntity): void {
    this._toUpdate.push(entity);
  }

  async save(): Promise<void> {
    for (const e of [...this._toCreate, ...this._toUpdate]) {
      await this._tx.save(e);
    }
  }
}

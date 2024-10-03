import { injectable } from "inversify";
import { BaseEntity, EntityManager, Repository } from "typeorm";
import { Project } from "../entities/project";

export interface IDbContext {
  get projects(): Repository<Project>;
  needCreate(entity: BaseEntity): void;
  needUpdate(entity: BaseEntity): void;
  save(): Promise<void>;
  rollback(): void;
}

@injectable()
export class DbContext implements IDbContext {
  private _toCreate: BaseEntity[] = [];

  private _toUpdate: BaseEntity[] = [];

  constructor(private _em: EntityManager) {}

  get projects() {
    return this._em.getRepository(Project);
  }

  needCreate(entity: BaseEntity): void {
    this._toCreate.push(entity);
  }

  needUpdate(entity: BaseEntity): void {
    this._toUpdate.push(entity);
  }

  async save(): Promise<void> {
    await this._em.transaction(async (tx) => {
      const toSaved = [...this._toCreate, ...this._toUpdate];

      for (const e of toSaved) {
        await tx.save(e);
      }
    });

    this.clear();
  }

  rollback(): void {
    this.clear();
  }

  clear() {
    this._toCreate = [];
    this._toUpdate = [];
  }
}

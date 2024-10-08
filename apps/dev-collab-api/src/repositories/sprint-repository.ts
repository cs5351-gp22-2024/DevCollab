import { inject, injectable } from "inversify";
import { TYPES } from "../container/types";
import { IDbContext } from "../db/db-context";
import { Sprint } from "../entities/sprint";

export interface ISprintRepository {
  addSprint(sprint: Sprint): void;
}

@injectable()
export class SprintRepository implements ISprintRepository {
  constructor(@inject(TYPES.IDbContext) private _dbContext: IDbContext) {}

  addSprint(sprint: Sprint): void {
    this._dbContext.needCreate(sprint);
  }
}

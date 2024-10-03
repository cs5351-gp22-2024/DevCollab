import { inject, injectable } from "inversify";
import { TYPES } from "../container/types";
import { IDbContext } from "../db/db-context";
import { Project } from "../entities/project";

export interface IProjectRepository {
  addProject(project: Project): void;
  getLatestProjects(): Promise<Project[]>;
}

@injectable()
export class ProjectRepository implements IProjectRepository {
  constructor(@inject(TYPES.IDbContext) private _dbContext: IDbContext) {}

  addProject(project: Project): void {
    this._dbContext.needCreate(project);
  }

  async getLatestProjects(): Promise<Project[]> {
    return await this._dbContext.projects.find({
      order: {
        created: "desc",
      },
    });
  }
}

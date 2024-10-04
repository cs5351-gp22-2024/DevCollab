import { IDbContext } from "../db/db-context";
import { Project } from "../entities/project";

export interface IProjectRepository {
  addProject(project: Project): void;
  getLatestProjects(): Promise<Project[]>;
}

export class ProjectRepository implements IProjectRepository {
  constructor(private _dbContext: IDbContext) {}

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

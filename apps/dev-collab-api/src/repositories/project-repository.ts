import { IDbContext } from "../db/db-context";
import { Project } from "../entities/project";

export interface IProjectRepository {
  addProject(project: Project): void;
  getLatestProjects(): Project;
}

export class ProjectRepository implements IProjectRepository {
  constructor(private dbContext: IDbContext) {}

  addProject(project: Project): void {
    throw new Error("Method not implemented.");
  }

  getLatestProjects(): Project {
    throw new Error("Method not implemented.");
  }
}

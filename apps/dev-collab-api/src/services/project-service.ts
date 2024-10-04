import { ProjectCreateCommand } from "shared/models/project";
import { IDbContext } from "../db/db-context";
import { Project } from "../entities/project";
import { IProjectRepository } from "../repositories/project-repository";

export interface IProjectService {
  createProject(command: ProjectCreateCommand): Promise<number>;
}

export class ProjectService implements IProjectService {
  constructor(
    private _dbContext: IDbContext,
    private _projectRepository: IProjectRepository
  ) {}

  async createProject(command: ProjectCreateCommand) {
    const newProject = new Project();
    const now = new Date();

    newProject.name = command.name;
    newProject.description = command.description;
    newProject.avatar = command.avatar;
    newProject.created = now;

    this._projectRepository.addProject(newProject);

    await this._dbContext.save();

    return newProject.projectId;
  }
}

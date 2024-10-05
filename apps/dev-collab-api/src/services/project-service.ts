import { inject, injectable } from "inversify";
import { isEmpty } from "lodash";
import { ProjectCreateCommand } from "shared/models/project";
import { TYPES } from "../container/types";
import { IDbContext } from "../db/db-context";
import { Project } from "../entities/project";
import { HttpBadRequestError } from "../errors/http-errors";
import { IProjectRepository } from "../repositories/project-repository";

export interface IProjectService {
  createProject(command: ProjectCreateCommand): Promise<number>;
}

@injectable()
export class ProjectService implements IProjectService {
  constructor(
    @inject(TYPES.IDbContext)
    private _dbContext: IDbContext,
    @inject(TYPES.IProjectRepository)
    private _projectRepository: IProjectRepository
  ) {}

  async createProject(command: ProjectCreateCommand) {
    if (isEmpty(command.name)) {
      throw new HttpBadRequestError("Project name is required");
    }

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

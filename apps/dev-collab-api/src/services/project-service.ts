import { inject, injectable } from "inversify";
import { isEmpty } from "lodash";
import { ProjectCreateCommand, ProjectModel } from "shared/models/project";
import { TYPES } from "../container/types";
import { IDbContext } from "../db/db-context";
import { Project } from "../entities/project";
import { HttpBadRequestError } from "../errors/http-errors";
import { mapProjectToProjectModel } from "../mappers/project";
import { IProjectRepository } from "../repositories/project-repository";

export interface IProjectService {
  getProject(projectId: number): Promise<ProjectModel>;
  getAllProjects(): Promise<ProjectModel[]>;
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
  async getProject(projectId: number): Promise<ProjectModel> {
    const project = await this._projectRepository.getProject(projectId);

    if (!project) {
      throw new HttpBadRequestError("Project does not exist");
    }

    return mapProjectToProjectModel(project);
  }

  async getAllProjects(): Promise<ProjectModel[]> {
    const projects = await this._projectRepository.getAllProjects();

    return projects.map((p) => mapProjectToProjectModel(p));
  }

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

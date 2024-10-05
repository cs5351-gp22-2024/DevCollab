import { Container } from "inversify";
import { DbContext, IDbContext } from "../db/db-context";
import { AppDataSource } from "../db/db-datasrc";
import {
  IProjectRepository,
  ProjectRepository,
} from "../repositories/project-repository";
import { IProjectService, ProjectService } from "../services/project-service";
import { TYPES } from "./types";

export const appContainer = new Container();

appContainer
  .bind<IDbContext>(TYPES.IDbContext)
  .toDynamicValue(() => new DbContext(AppDataSource.manager))
  .inRequestScope();

appContainer
  .bind<IProjectRepository>(TYPES.IProjectRepository)
  .to(ProjectRepository)
  .inRequestScope();

appContainer
  .bind<IProjectService>(TYPES.IProjectService)
  .to(ProjectService)
  .inRequestScope();
// container/container.ts
import { Container } from "inversify";
import { DbContext, IDbContext } from "../db/db-context";
import { AppDataSource } from "../db/db-datasrc";
import {
  IProjectRepository,
  ProjectRepository,
} from "../repositories/project-repository";
import {
  ISprintRepository,
  SprintRepository,
} from "../repositories/sprint-repository";
import {
  ITaskRepository,
  TaskRepository,
} from "../repositories/task-repository";
import { IProjectService, ProjectService } from "../services/project-service";
import { ISprintService, SprintService } from "../services/sprint-service";
import { ITaskService, TaskService } from "../services/Task_service";

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

appContainer
  .bind<ISprintRepository>(TYPES.ISprintRepository)
  .to(SprintRepository)
  .inRequestScope();

appContainer
  .bind<ISprintService>(TYPES.ISprintService)
  .to(SprintService)
  .inRequestScope();

appContainer
  .bind<ITaskService>(TYPES.ITaskService)
  .to(TaskService)
  .inRequestScope();

appContainer
  .bind<ITaskRepository>(TYPES.ITaskRepository)
  .to(TaskRepository)
  .inRequestScope();


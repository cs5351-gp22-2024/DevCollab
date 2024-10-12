import { interfaces } from "inversify";
import { IDbContext } from "../db/db-context";
import { IProjectRepository } from "../repositories/project-repository";
import { ITaskRepository } from "../repositories/task-repository";
import { ITaskService } from "../services/Task_service";
import { IProjectService } from "../services/project-service";
import { ISprintService } from "../services/sprint-service";
import { ISprintRepository } from "../repositories/sprint-repository";

const TYPES = {
  IDbContext: Symbol.for(
    "IDbContext"
  ) as interfaces.ServiceIdentifier<IDbContext>,
  IProjectRepository: Symbol.for(
    "IProjectRepository"
  ) as interfaces.ServiceIdentifier<IProjectRepository>,
  ITaskRepository: Symbol.for(
    "ITaskRepository"
  ) as interfaces.ServiceIdentifier<ITaskRepository>,
  ITaskService: Symbol.for(
    "ITaskService"
  ) as interfaces.ServiceIdentifier<ITaskService>,
  IProjectService: Symbol.for(
    "IProjectService"
  ) as interfaces.ServiceIdentifier<IProjectService>,
  ISprintRepository: Symbol.for(
    "ISprintRepository"
  ) as interfaces.ServiceIdentifier<ISprintRepository>,
  ISprintService: Symbol.for(
    "ISprintService"
  ) as interfaces.ServiceIdentifier<ISprintService>,
};

export { TYPES };

import { interfaces } from "inversify";
import { IDbContext } from "../db/db-context";
import { IProjectRepository } from "../repositories/project-repository";
import { ISprintRepository } from "../repositories/sprint-repository";
import { IProjectService } from "../services/project-service";
import { ISprintService } from "../services/sprint-service";

const TYPES = {
  IDbContext: Symbol.for(
    "IDbContext"
  ) as interfaces.ServiceIdentifier<IDbContext>,
  IProjectRepository: Symbol.for(
    "IProjectRepository"
  ) as interfaces.ServiceIdentifier<IProjectRepository>,
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

import { interfaces } from "inversify";
import { IDbContext } from "../db/db-context";
import { IProjectRepository } from "../repositories/project-repository";
import { IProjectService } from "../services/project-service";

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
};

export { TYPES };

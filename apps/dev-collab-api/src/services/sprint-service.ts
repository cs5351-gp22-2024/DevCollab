import { inject, injectable } from "inversify";
import { sortBy } from "lodash";
import {
  SprintCreateCommand,
  SprintModel,
  SprintUpdateCommand,
} from "shared/models/sprint";
import { TYPES } from "../container/types";
import { IDbContext } from "../db/db-context";
import { Sprint } from "../entities/sprint";
import { HttpBadRequestError } from "../errors/http-errors";
import { mapSprintToSprintModel } from "../mappers/sprint";
import { IProjectRepository } from "../repositories/project-repository";
import { ISprintRepository } from "../repositories/sprint-repository";

export interface ISprintService {
  createSprint(
    projectId: number,
    command: SprintCreateCommand
  ): Promise<number>;
  getProjectSprints(projectId: number): Promise<SprintModel[]>;
  updateSprint(sprintId: number, command: SprintUpdateCommand): Promise<void>;
}

@injectable()
export class SprintService implements ISprintService {
  constructor(
    @inject(TYPES.IDbContext)
    private _dbContext: IDbContext,
    @inject(TYPES.IProjectRepository)
    private _projectRepository: IProjectRepository,
    @inject(TYPES.ISprintRepository)
    private _sprintRepository: ISprintRepository
  ) {}

  async createSprint(
    projectId: number,
    command: SprintCreateCommand
  ): Promise<number> {
    const project = await this._projectRepository.getProject(projectId);
    const curSprints = project?.sprints || [];
    const { startDate, endDate } = command;

    if (!project) {
      throw new HttpBadRequestError("Project does not exist");
    }

    if (!startDate) {
      throw new HttpBadRequestError("Start date is missing");
    }

    if (!endDate) {
      throw new HttpBadRequestError("End date is missing");
    }

    if (startDate > endDate) {
      throw new HttpBadRequestError(
        "Start date should be at or before the end date"
      );
    }

    if (
      curSprints &&
      curSprints.some(
        (s) =>
          s.startDate &&
          s.endDate &&
          s.endDate.toISOString() >= startDate &&
          s.startDate.toISOString() <= endDate
      )
    ) {
      throw new HttpBadRequestError(
        "Start/end date should not overlap with other sprints"
      );
    }

    const newSprint = new Sprint();

    newSprint.project = project;
    newSprint.startDate = new Date(startDate);
    newSprint.endDate = new Date(endDate);

    this._sprintRepository.addSprint(newSprint);

    await this._dbContext.save();

    return newSprint.sprintId;
  }

  async getProjectSprints(projectId: number): Promise<SprintModel[]> {
    const project = await this._projectRepository.getProject(projectId);
    const curSprints = project?.sprints || [];

    return sortBy(curSprints, (s) => s.startDate).map((s, i) =>
      mapSprintToSprintModel(s, i + 1)
    );
  }

  async updateSprint(
    sprintId: number,
    command: SprintUpdateCommand
  ): Promise<void> {
    const sprint = await this._sprintRepository.getSprint(sprintId);
    const curSprints = sprint?.project?.sprints || [];
    const { startDate, endDate } = command;

    if (!sprint) {
      throw new HttpBadRequestError("Sprint does not exist");
    }

    if (!startDate) {
      throw new HttpBadRequestError("Start date is missing");
    }

    if (!endDate) {
      throw new HttpBadRequestError("End date is missing");
    }

    if (startDate > endDate) {
      throw new HttpBadRequestError(
        "Start date should be at or before the end date"
      );
    }

    if (
      curSprints &&
      curSprints.some(
        (s) =>
          s.startDate &&
          s.endDate &&
          s.endDate.toISOString() >= startDate &&
          s.startDate.toISOString() <= endDate
      )
    ) {
      throw new HttpBadRequestError(
        "Start/end date should not overlap with other sprints"
      );
    }

    sprint.startDate = new Date(startDate);
    sprint.endDate = new Date(endDate);

    this._sprintRepository.updateSprint(sprint);

    await this._dbContext.save();
  }
}

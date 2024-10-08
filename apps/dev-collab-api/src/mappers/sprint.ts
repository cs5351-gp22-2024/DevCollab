import { SprintModel } from "shared/models/sprint";
import { Sprint } from "../entities/sprint";

export const mapSprintToSprintModel = (
  sprint: Sprint,
  sprintNo: number
): SprintModel =>
  ({
    sprintId: sprint.sprintId,
    projectId: sprint.project?.projectId || null,
    startDate: sprint.startDate?.toISOString() || null,
    endDate: sprint.endDate?.toISOString() || null,
    sprintNo: sprintNo,
  }) satisfies SprintModel;

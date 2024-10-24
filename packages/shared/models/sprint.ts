export interface SprintModel {
  sprintId: number;
  projectId: number | null;
  startDate: string | null;
  endDate: string | null;
  sprintNo: number | null;
}

export interface SprintCreateCommand {
  startDate: string | null;
  endDate: string | null;
}

export interface SprintUpdateCommand {
  startDate: string | null;
  endDate: string | null;
}

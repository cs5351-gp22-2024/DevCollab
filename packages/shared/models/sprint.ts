export interface SprintModel {
  sprintId: number;
  projectId: number;
  startDate: string | null;
  endDate: string | null;
}

export interface SprintCreateCommand {
  startDate: string | null;
  endDate: string | null;
}

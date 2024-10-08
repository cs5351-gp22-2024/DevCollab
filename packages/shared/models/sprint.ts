export interface SprintModel {
  sprintId: number;
  projectId: number | null;
  startDate: string | null;
  endDate: string | null;
  sprintNo: number;
}

export interface SprintCreateCommand {
  startDate: string | null;
  endDate: string | null;
}

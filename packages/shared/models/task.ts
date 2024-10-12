export interface TaskModel {
    taskid: number,
    name: string;
    description: string | null;
    assignee: string | null;
    status: string | null;
    priority: string | null;
    duedate: string | null;
    projectId: number;
}

export interface TaskCreateCommand {
    name: string;
    description: string | null;
    status: string | null;
    priority: string | null;
    duedate: string | null;
}

export interface TaskUpdateCommand {
    name: string;
    description: string | null;
    status: string | null;
    priority: string | null;
    duedate: string | null;
}
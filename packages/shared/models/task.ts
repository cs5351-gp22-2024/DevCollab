export interface TaskCreateCommand {
    name: string;
    description: string | null;
    assignee: string | null;
    status: string | null;
    priority: string | null;
    duedate: Date | null;
}

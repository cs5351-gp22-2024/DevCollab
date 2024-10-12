import { TaskModel } from "shared/models/task";
import { Task } from "../entities/task";

export const mapTaskModel = (
    task: Task,
    now: string
): TaskModel =>
    ({
        taskid: task.taskid,
        name: task.name,
        description: task.description,
        status: task.status,
        assignee: task.assignee,
        priority: task.priority || null,
        duedate: task.duedate?.toISOString() || null,
        created: task.created?.toISOString() || null,
        modified: task.modified?.toISOString() || null,
        projectId: task.projectId,
    }) satisfies TaskModel;
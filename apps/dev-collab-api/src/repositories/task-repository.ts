import { inject, injectable } from "inversify";
import { TYPES } from "../container/types";
import { IDbContext } from "../db/db-context";
import { Project } from "../entities/project";
import { Task } from "../entities/task";

export interface ITaskepository {
    addTask(task: Task): void;
    getLatestTask(): Promise<Task[]>;
}

@injectable()
export class TaskRepository implements ITaskepository {
    constructor(@inject(TYPES.IDbContext) private _dbContext: IDbContext) { }

    addTask(task: Task): void {
        this._dbContext.needCreate(task);
    }

    async getLatestTask(): Promise<Task[]> {
        return await this._dbContext.projects.find({
            order: {
                created: "desc",
            },
        });
    }
}

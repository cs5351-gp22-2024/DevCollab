import { inject, injectable } from "inversify";
import { isEmpty } from "lodash";
import {
    TaskCreateCommand,
    TaskModel,
    TaskUpdateCommand,
} from "shared/models/task";
import { TYPES } from "../container/types";
import { IDbContext } from "../db/db-context";
import { Task } from "../entities/task";
import { HttpBadRequestError } from "../errors/http-errors";
import { ITaskRepository } from "../repositories/task-repository";


export interface ITaskService {
    createTask(command: TaskCreateCommand): Promise<number>;


}

@injectable()
export class TaskService implements ITaskService {
    constructor(
        @inject(TYPES.IDbContext)
        private _dbContext: IDbContext,
        @inject(TYPES.ITaskRepository)
        private _taskRepository: ITaskRepository
    ) { }

    async createTask(command: TaskCreateCommand) {
        if (isEmpty(command.name)) {
            throw new HttpBadRequestError("Task name is required");
        }

        const newTask = new Task();
        const now = new Date();

        newTask.name = command.name;
        newTask.description = command.description;
        newTask.status = command.status;

        this._taskRepository.addTask(newTask);

        await this._dbContext.save();

        return newTask.taskid;
    }


}
import { inject, injectable } from "inversify";
import { isEmpty } from "lodash";
import { ProjectCreateCommand } from "shared/models/project";
import { TaskCreateCommand } from "shared/models/task";
import { TYPES } from "../container/types";
import { IDbContext } from "../db/db-context";
import { Project } from "../entities/project";
import { Task } from "../entities/task";
import { HttpBadRequestError } from "../errors/http-errors";
import { IProjectRepository } from "../repositories/project-repository";
import { TaskRepository } from "../repositories/task-repository";


export interface ITaskService {
    createTask(command: TaskCreateCommand): Promise<number>;
}

@injectable()
export class TaskService implements ITaskService {
    constructor(
        @inject(TYPES.IDbContext)
        private _dbContext: IDbContext,
        @inject(TYPES.TaskRepository)
        private _taskRepository: TaskRepository
    ) { }

    async createTask(command: TaskCreateCommand) {
        if (isEmpty(command.name)) {
            throw new HttpBadRequestError("Task name is required");
        }

        const newTask = new Task();
        const now = new Date();

        newTask.name = command.name;
        newTask.description = command.description;
        newTask

        this._projectRepository.addProject(newProject);

        await this._dbContext.save();

        return newProject.projectId;
    }
}

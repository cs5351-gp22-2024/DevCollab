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
import { IProjectRepository } from "../repositories/project-repository";
import { ISprintRepository } from "../repositories/sprint-repository";





// The main method of 5 operations : 
// create Task  by  Project ID , Sprint ID ,
// getTask by Project ID , getTask by Project ID and Sprint ID , getTask by Project ID , Sprint ID and Task ID
// updated by roject ID, Sprint ID and Task ID
// remove Task by  Project ID , Sprint ID and Task ID,
export interface ITaskService {
    createTask(projectId: number, sprintId: number, command: TaskCreateCommand): Promise<number>;
    removeTask(projectId: number, sprintId: number, TaskId: number): Promise<void>;
    getTaskbyProIdSprIdTaskId(projectId: number, sprintId: number, taskId: number): Promise<Task | null>;
    getTaskbyProIdSprId(projectId: number, sprintId: number): Promise<Task[] | null>;
    getTaskbyProId(projectId: number): Promise<Task[] | null>;
    updateTask(projectId: number, sprintId: number, taskId: number, command: TaskUpdateCommand): Promise<void>;
}

@injectable()
export class TaskService implements ITaskService {
    constructor(
        @inject(TYPES.IDbContext)
        private _dbContext: IDbContext,
        @inject(TYPES.ITaskRepository)
        private _taskRepository: ITaskRepository,
        @inject(TYPES.IProjectRepository)
        private _projectRepository: IProjectRepository,
        @inject(TYPES.ISprintRepository)
        private _sprintRepository: ISprintRepository
    ) { }

    // create Task  by  Project ID , Sprint ID 
    async createTask(projectId: number, sprintId: number, command: TaskCreateCommand) {
        const project = await this._projectRepository.getProject(projectId);
        const sprint = await this._sprintRepository.getSprint(sprintId);
        const { duedate } = command;
        const now = new Date();

        if (!project) {
            throw new HttpBadRequestError("Project does not exist");
        }

        if (!sprint) {
            throw new HttpBadRequestError("Sprint does not exist");
        }

        if (isEmpty(command.name)) {
            throw new HttpBadRequestError("Task name is required");
        }

        if (!duedate) {
            throw new HttpBadRequestError("The DueDate is required");
        }

        const newTask = new Task();


        newTask.name = command.name;
        newTask.assignee = command.assignee;
        newTask.description = command.description;
        newTask.priority = command.priority;
        newTask.status = command.status;
        newTask.projectId = projectId;
        newTask.sprintId = sprintId;
        newTask.duedate = command.duedate;
        newTask.modified = now;
        newTask.created = now;

        this._taskRepository.addTask(newTask);

        await this._dbContext.save();

        return newTask.taskid;
    }

    // Remove Task by  Project ID , Sprint ID and Task ID
    async removeTask(projectId: number, sprintId: number, TaskId: number): Promise<void> {
        const project = await this._projectRepository.getProject(projectId);
        const sprint = await this._sprintRepository.getSprint(sprintId);
        const Task = await this._taskRepository.getTask(TaskId);

        if (!Task) {
            throw new HttpBadRequestError("Task does not exist");
        }
        if (!project) {
            throw new HttpBadRequestError("Project does not exist");
        }

        if (!sprint) {
            throw new HttpBadRequestError("Sprint does not exist");
        }

        this._taskRepository.removeTask(Task);
        await this._dbContext.save();
    }




    // getTask by Project ID 
    async getTaskbyProId(projectId: number): Promise<Task[] | null> {
        const project = await this._projectRepository.getProject(projectId);
        if (!project) {
            throw new HttpBadRequestError("Project does not exist");
        }
        return await this._dbContext.tasks.find({ where: { project: { projectId: projectId } } });
    }

    // getTask by Project ID , Sprint ID
    async getTaskbyProIdSprId(projectId: number, sprintid: number): Promise<Task[] | null> {
        const project = await this._projectRepository.getProject(projectId);
        const sprint = await this._sprintRepository.getSprint(sprintid);
        if (!project) {
            throw new HttpBadRequestError("Project does not exist");
        }
        if (!sprint) {
            throw new HttpBadRequestError("Sprint does not exist");
        }
        return await this._dbContext.tasks.find({ where: { sprint: { sprintId: sprintid } } });
    }

    //  getTask by Project ID , Sprint ID and Task ID
    async getTaskbyProIdSprIdTaskId(projectId: number, sprintId: number, taskId: number): Promise<Task | null> {
        const project = await this._projectRepository.getProject(projectId);
        const sprint = await this._sprintRepository.getSprint(sprintId);
        const task = await this._taskRepository.getTask(taskId);
        if (!project) {
            throw new HttpBadRequestError("Project does not exist");
        }
        if (!sprint) {
            throw new HttpBadRequestError("Sprint does not exist");
        }
        if (!task) {
            throw new HttpBadRequestError("Task does not exist");
        }
        return await this._dbContext.tasks.findOneBy({ taskid: taskId });
    }

    //  updated by roject ID, Sprint ID and Task ID
    async updateTask(projectId: number, sprintId: number, taskId: number, command: TaskUpdateCommand): Promise<void> {
        const project = await this._projectRepository.getProject(projectId);
        const sprint = await this._sprintRepository.getSprint(sprintId);
        const task = await this._taskRepository.getTask(taskId);
        const now = new Date();
        if (!project) {
            throw new HttpBadRequestError("Project does not exist");
        }
        if (!sprint) {
            throw new HttpBadRequestError("Sprint does not exist");
        }

        if (!task) {
            throw new HttpBadRequestError("Task does not exist");
        }
        task.name = command.name;
        task.assignee = command.assignee;
        task.description = command.description;
        task.priority = command.priority;
        task.status = command.status;
        task.projectId = projectId;
        task.sprintId = sprintId;
        task.duedate = command.duedate;
        task.modified = now;

        this._taskRepository.updateTask(task);

        await this._dbContext.save();

    }




}
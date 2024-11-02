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
import { IContextUser } from "../auth/context-user";
import { UserModel } from "shared/models/user";



// The main method of 8 operations : 
// create Task  by  Project ID , Sprint ID ,
// Cal TotalStatus by Project ID 
// Cal Total Priorty by Project ID
// getTask by Project ID , getTask by Project ID and Sprint ID , getTask by Project ID , Sprint ID and Task ID
// updated by roject ID, Sprint ID and Task ID
// remove Task by  Project ID , Sprint ID and Task ID,
export interface ITaskService {
    createTask(projectId: number, sprintId: number, command: TaskCreateCommand, projectuserlist: UserModel[] | null, Token: string | null): Promise<number>;
    removeTask(projectId: number, sprintId: number, TaskId: number, projectuserlist: UserModel[] | null, Token: string | null): Promise<void>;
    getTaskbyToken(Token: string | null): Promise<Task[] | null>;
    getTaskbyProIdSprIdTaskId(projectId: number, sprintId: number, taskId: number, projectuserlist: UserModel[] | null, Token: string | null): Promise<Task | null>;
    getTaskbyProIdSprId(projectId: number, sprintId: number, projectuserlist: UserModel[] | null, Token: string | null): Promise<Task[] | null>;
    getTaskbyProId(projectId: number, projectuserlist: UserModel[] | null, Token: string | null): Promise<Task[] | null>;
    updateTask(projectId: number, sprintId: number, taskId: number, command: TaskUpdateCommand, projectuserlist: UserModel[] | null, Token: string | null): Promise<void>;
    CheckStatusnum(projectId: number, projectuserlist: UserModel[] | null, Token: string | null): Promise<Record<string, number>>;
    CheckPrioritynum(projectId: number, projectuserlist: UserModel[] | null, Token: string | null): Promise<Record<string, number>>;
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
        private _sprintRepository: ISprintRepository,
        @inject(TYPES.IContextUser)
        private _contextUser: IContextUser
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
        newTask.Author = command.author;

        this._taskRepository.addTask(newTask);

        await this._dbContext.save();

        return newTask.taskid;
    }

    // Remove Task by  Project ID , Sprint ID and Task ID
    async removeTask(projectId: number, sprintId: number, TaskId: number, projectuserlist: UserModel[] | null, Token: string | null): Promise<void> {
        const project = await this._projectRepository.getProject(projectId);
        const sprint = await this._sprintRepository.getSprint(sprintId);
        const Task = await this._taskRepository.getTask(TaskId);
        const groupexistuser = await this.checkprojectlistwithtoken(projectuserlist, Token);
        if (!groupexistuser) {
            throw new HttpBadRequestError("The user are not belong the project ");
        }
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


    // check the  user in the project 
    async checkprojectlistwithtoken(projectuserlist: UserModel[] | null, Token: string | null): Promise<boolean> {
        let projectexistuser = false;
        const projectulist = projectuserlist || [];
        const projectuserlistLength = projectulist.length || 0;
        for (let i = 0; i < projectuserlistLength; i++) {
            if (Token == null) {
                throw new HttpBadRequestError("The token is null !!");
            }
            if (projectulist != undefined && projectulist[i].userId == parseInt(Token)) {
                projectexistuser = true;
            }
        }
        return projectexistuser;
    }

    // getTask by Project ID 
    async getTaskbyProId(projectId: number, projectuserlist: UserModel[] | null, Token: string | null): Promise<Task[] | null> {
        const project = await this._projectRepository.getProject(projectId);
        if (!project) {
            throw new HttpBadRequestError("Project does not exist");
        }
        const groupexistuser = await this.checkprojectlistwithtoken(projectuserlist, Token);
        if (!groupexistuser) {
            throw new HttpBadRequestError("The user are not belong the project ");
        }
        return await this._dbContext.tasks.find({ where: { project: { projectId: projectId } } });
    }

    // getTask by Project ID , Sprint ID
    async getTaskbyProIdSprId(projectId: number, sprintid: number, projectuserlist: UserModel[] | null, Token: string | null): Promise<Task[] | null> {
        const project = await this._projectRepository.getProject(projectId);
        const sprint = await this._sprintRepository.getSprint(sprintid);
        if (!project) {
            throw new HttpBadRequestError("Project does not exist");
        }
        if (!sprint) {
            throw new HttpBadRequestError("Sprint does not exist");
        }
        const groupexistuser = await this.checkprojectlistwithtoken(projectuserlist, Token);
        if (!groupexistuser) {
            throw new HttpBadRequestError("The user are not belong the project ");
        }
        return await this._dbContext.tasks.find({ where: { sprint: { sprintId: sprintid } } });
    }

    //  getTask by Project ID , Sprint ID and Task ID
    async getTaskbyProIdSprIdTaskId(projectId: number, sprintId: number, taskId: number, projectuserlist: UserModel[] | null, Token: string | null): Promise<Task | null> {
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
        const groupexistuser = await this.checkprojectlistwithtoken(projectuserlist, Token);
        if (!groupexistuser) {
            throw new HttpBadRequestError("The user are not belong the project ");
        }
        return await this._dbContext.tasks.findOneBy({ taskid: taskId });
    }

    //  Cal Total Status  by Project ID
    async CheckStatusnum(projectId: number, projectuserlist: UserModel[] | null, Token: string | null): Promise<Record<string, number>> {
        let status = { "To Do": 0, "In Progress": 0, "Done": 0 };
        const tasks: Task[] | null = await this.getTaskbyProId(projectId, projectuserlist, Token);
        const safeTasks = tasks || [];
        const tasksLength = safeTasks.length || 0;

        for (let i = 0; i < tasksLength; i++) {
            if (tasks != undefined && tasks[i].status == "To Do") {
                status["To Do"] += 1;

            } else if (tasks != undefined && tasks[i].status == "In Progress") {
                status["In Progress"] += 1;

            } else if (tasks != undefined && tasks[i].status == "Done") {
                status["Done"] += 1;

            }
        }
        return status;
    }

    //  Cal Total Priority num by Project ID 
    async CheckPrioritynum(projectId: number, projectuserlist: UserModel[] | null, Token: string | null): Promise<Record<string, number>> {
        const priority = { "Low": 0, "Medium": 0, "High": 0 };
        const project = await this._projectRepository.getProject(projectId);
        const tasks: Task[] | null = await this.getTaskbyProId(projectId, projectuserlist, Token);
        const safeTasks = tasks || [];
        const tasksLength = safeTasks.length || 0;

        for (let i = 0; i < tasksLength; i++) {
            if (tasks != undefined && tasks[i].priority == "Low") {
                priority["Low"] += 1;

            } else if (tasks != undefined && tasks[i].priority == "Medium") {
                priority["Medium"] += 1;

            } else if (tasks != undefined && tasks[i].priority == "High") {
                priority["High"] += 1;

            }
        }
        return priority;
    }

    //  updated by roject ID, Sprint ID and Task ID
    async updateTask(projectId: number, sprintId: number, taskId: number, command: TaskUpdateCommand, projectuserlist: UserModel[] | null, Token: string | null): Promise<void> {
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

        const groupexistuser = await this.checkprojectlistwithtoken(projectuserlist, Token);
        if (!groupexistuser) {
            throw new HttpBadRequestError("The user are not belong the project ");
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

    async getTaskbyToken(Token: string | null): Promise<Task[] | null> {
        const userid = Token;
        if (!userid) {
            throw new HttpBadRequestError("The user does not exist");
        }
        const task = await this._taskRepository.getAllTasks();
        const taskuserlist: Task[] = [];
        for (let i = 0; i < task.length; i++) {
            if (task[i].Author == parseInt(userid)) {
                taskuserlist.push(task[i]);
            }
        }
        return taskuserlist;
    }

}
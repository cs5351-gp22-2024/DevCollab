import express from "express";
import { TaskCreateCommand, TaskUpdateCommand } from "shared/models/task";
import { appContainer } from "../container/container";
import { TYPES } from "../container/types";


export const taskRouter = express.Router();


// * All get ,post medit , delete method need to verify the token (userid) is in the project user table . 

// Aim : get the task by userID
// The router for the get task by UserID
// api url eg :  /api/task/user/{userID}
// Method : GET
taskRouter.get("/api/task/user", async (req, res) => {
    const token = req.headers["authorization"] ?? null;
    const service = appContainer.get(TYPES.ITaskService);
    const result = await service.getTaskbyToken(token);
    res.send(result)
});



// Aim : get the Total Staus Number
// The router for the get task by ProjectID 
// api url eg :  /api/task/status/{projectId}
// Method : GET
taskRouter.get("/api/task/status/:projectId", async (req, res) => {
    const token = req.headers["authorization"] ?? null;
    const service = appContainer.get(TYPES.ITaskService);
    const projectId = parseInt(req.params.projectId);
    const projectuserservice = appContainer.get(TYPES.IProjectUserService);
    const projectuserlist = await projectuserservice.getProjectUsers(projectId);
    const result = await service.CheckStatusnum(projectId, projectuserlist, token);
    res.send(result)
});


// Aim : get the Total Priority Number
// The router for the get task by ProjectID 
// api url eg :  /api/task/priority/{projectId}
// Method : GET
taskRouter.get("/api/task/priority/:projectId", async (req, res) => {
    const token = req.headers["authorization"] ?? null;
    const service = appContainer.get(TYPES.ITaskService);
    const projectId = parseInt(req.params.projectId);
    const projectuserservice = appContainer.get(TYPES.IProjectUserService);
    const projectuserlist = await projectuserservice.getProjectUsers(projectId);
    const result = await service.CheckPrioritynum(projectId, projectuserlist, token);
    res.send(result);
});


// Aim : get the colum from DB
// The router for the get task by ProjectID
// api url eg :  /api/task/{projectId}/
// Method : GET
taskRouter.get("/api/task/:projectId/", async (req, res) => {
    const token = req.headers["authorization"] ?? null;
    const service = appContainer.get(TYPES.ITaskService);
    const projectId = parseInt(req.params.projectId);
    const projectuserservice = appContainer.get(TYPES.IProjectUserService);
    const projectuserlist = await projectuserservice.getProjectUsers(projectId);
    const result = await service.getTaskbyProId(projectId, projectuserlist, token);
    res.send(result);
});


// Aim : get the colum from DB
// The router for the get task by ProjectID ,SprintID
// api url eg :  /api/task/{projectId}/{sprintId}/{taskId}
// Metohd : GET
taskRouter.get("/api/task/:projectId/:sprintId", async (req, res) => {
    const token = req.headers["authorization"] ?? null;
    const service = appContainer.get(TYPES.ITaskService);
    const projectId = parseInt(req.params.projectId);
    const sprintId = parseInt(req.params.sprintId);
    const projectuserservice = appContainer.get(TYPES.IProjectUserService);
    const projectuserlist = await projectuserservice.getProjectUsers(projectId);
    const result = await service.getTaskbyProIdSprId(projectId, sprintId, projectuserlist, token);
    res.send(result);
});


// Aim : get the colum from DB
// The router for the get task by ProjectID ,SprintID,taskID
// api url eg :  /api/task/{projectId}/{sprintId}/{taskId}
// Method : GET
taskRouter.get("/api/task/:projectId/:sprintId/:taskId", async (req, res) => {
    const token = req.headers["authorization"] ?? null;
    const service = appContainer.get(TYPES.ITaskService);
    const projectId = parseInt(req.params.projectId);
    const sprintId = parseInt(req.params.sprintId);
    const taskId = parseInt(req.params.taskId);
    const projectuserservice = appContainer.get(TYPES.IProjectUserService);
    const projectuserlist = await projectuserservice.getProjectUsers(projectId);
    const result = await service.getTaskbyProIdSprIdTaskId(projectId, sprintId, taskId, projectuserlist, token);
    res.send(result);
});


// Aim : Create the task 
// The router for the post task by ProjectID ,SprintID
// api url eg :  /api/task/{projectId}/{sprintId}
// Method : POST
taskRouter.post("/api/task/:projectId/:sprintId", async (req, res) => {
    const token = req.headers["authorization"] ?? null;
    const command = req.body as TaskCreateCommand;
    const service = appContainer.get(TYPES.ITaskService);
    const projectId = parseInt(req.params.projectId);
    const sprintId = parseInt(req.params.sprintId);
    const projectuserservice = appContainer.get(TYPES.IProjectUserService);
    const projectuserlist = await projectuserservice.getProjectUsers(projectId);
    const result = await service.createTask(projectId, sprintId, command, projectuserlist, token);
    res.send(result.toString());
});

// Aim : Update the task or Edit the task 
// The router for the update task by ProjectID ,SprintID , TaskID
// api url eg :  /api/task/{projectId}/{sprintId}/{tasjId}
// Method : PATCH

taskRouter.patch("/api/task/:projectId/:sprintId/:taskId", async (req, res) => {
    const token = req.headers["authorization"] ?? null;
    const taskId = parseInt(req.params.taskId);
    const projectId = parseInt(req.params.projectId);
    const sprintId = parseInt(req.params.sprintId);
    const colum = req.body;
    const service = appContainer.get(TYPES.ITaskService);
    const projectuserservice = appContainer.get(TYPES.IProjectUserService);
    const projectuserlist = await projectuserservice.getProjectUsers(projectId);
    await service.updateTask(projectId, sprintId, taskId, colum, projectuserlist, token);
    res.send(200);
});


// Aim : Delete the task 
// The router for the delete task by ProjectID ,SprintID , TaskID
// api url eg :  /api/task/{projectId}/{sprintId}/{tasjId}
// Method : Delete

taskRouter.delete("/api/task/:projectId/:sprintId/:taskId", async (req, res) => {
    const token = req.headers["authorization"] ?? null;
    const taskId = parseInt(req.params.taskId);
    const projectId = parseInt(req.params.projectId);
    const sprintId = parseInt(req.params.sprintId);
    const service = appContainer.get(TYPES.ITaskService);
    const projectuserservice = appContainer.get(TYPES.IProjectUserService);
    const projectuserlist = await projectuserservice.getProjectUsers(projectId);
    await service.removeTask(projectId, sprintId, taskId, projectuserlist, token);
    res.send(200);
});

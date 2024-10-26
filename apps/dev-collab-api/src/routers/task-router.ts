import express from "express";
import { TaskCreateCommand, TaskUpdateCommand } from "shared/models/task";
import { appContainer } from "../container/container";
import { TYPES } from "../container/types";

export const taskRouter = express.Router();


// Aim : get the colum from DB
// The router for the get task by ProjectID
// api url eg :  /api/task/{projectId}/
// Method : GET
taskRouter.get("/api/task/:projectId/", async (req, res) => {
    const service = appContainer.get(TYPES.ITaskService);
    const projectId = parseInt(req.params.projectId);
    const result = await service.getTaskbyProId(projectId);
    res.send(result);
});


// Aim : get the colum from DB
// The router for the get task by ProjectID ,SprintID
// api url eg :  /api/task/{projectId}/{sprintId}/{taskId}
// Metohd : GET
taskRouter.get("/api/task/:projectId/:sprintId", async (req, res) => {
    const service = appContainer.get(TYPES.ITaskService);
    const projectId = parseInt(req.params.projectId);
    const sprintId = parseInt(req.params.sprintId);
    const result = await service.getTaskbyProIdSprId(projectId, sprintId);
    res.send(result);
});


// Aim : get the colum from DB
// The router for the get task by ProjectID ,SprintID,taskID
// api url eg :  /api/task/{projectId}/{sprintId}/{taskId}
// Method : GET
taskRouter.get("/api/task/:projectId/:sprintId/:taskId", async (req, res) => {
    const service = appContainer.get(TYPES.ITaskService);
    const projectId = parseInt(req.params.projectId);
    const sprintId = parseInt(req.params.sprintId);
    const taskId = parseInt(req.params.taskId);
    const result = await service.getTaskbyProIdSprIdTaskId(projectId, sprintId, taskId);
    res.send(result);
});

// Aim : Create the task 
// The router for the post task by ProjectID ,SprintID
// api url eg :  /api/task/{projectId}/{sprintId}
// Method : POST
taskRouter.post("/api/task/:projectId/:sprintId", async (req, res) => {
    const command = req.body as TaskCreateCommand;
    const service = appContainer.get(TYPES.ITaskService);
    const projectId = parseInt(req.params.projectId);
    const sprintId = parseInt(req.params.sprintId);
    const result = await service.createTask(projectId, sprintId, command);
    res.send(result.toString());
});

// Aim : Update the task or Edit the task 
// The router for the update task by ProjectID ,SprintID , TaskID
// api url eg :  /api/task/{projectId}/{sprintId}/{tasjId}
// Method : PATCH

taskRouter.patch("/api/task/:projectId/:sprintId/:taskId", async (req, res) => {
    const taskId = parseInt(req.params.taskId);
    const projectId = parseInt(req.params.projectId);
    const sprintId = parseInt(req.params.sprintId);
    const colum = req.body;
    const service = appContainer.get(TYPES.ITaskService);
    await service.updateTask(projectId, sprintId, taskId, colum);
    res.send(200);
});


// Aim : Delete the task 
// The router for the delete task by ProjectID ,SprintID , TaskID
// api url eg :  /api/task/{projectId}/{sprintId}/{tasjId}
// Method : Delete

taskRouter.delete("/api/task/:projectId/:sprintId/:taskId", async (req, res) => {
    const taskId = parseInt(req.params.taskId);
    const projectId = parseInt(req.params.projectId);
    const sprintId = parseInt(req.params.sprintId);
    const service = appContainer.get(TYPES.ITaskService);
    await service.removeTask(projectId, sprintId, taskId);
    res.send(200);
});

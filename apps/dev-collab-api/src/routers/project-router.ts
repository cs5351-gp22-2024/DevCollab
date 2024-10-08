import express from "express";
import { ProjectCreateCommand } from "shared/models/project";
import { appContainer } from "../container/container";
import { TYPES } from "../container/types";

export const projectRouter = express.Router();

projectRouter.get("/api/projects/:projectId", async (req, res) => {
  const service = appContainer.get(TYPES.IProjectService);
  const projectId = parseInt(req.params.projectId);
  const result = await service.getProject(projectId);

  res.send(result);
});

projectRouter.get("/api/projects", async (req, res) => {
  const service = appContainer.get(TYPES.IProjectService);
  const result = await service.getAllProjects();

  res.send(result);
});

projectRouter.post("/api/projects", async (req, res) => {
  const command = req.body as ProjectCreateCommand;
  const service = appContainer.get(TYPES.IProjectService);

  const result = await service.createProject(command);

  res.send(result.toString());
});

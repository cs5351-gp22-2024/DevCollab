import express from "express";
import { ProjectCreateCommand } from "shared/models/project";
import { appContainer } from "../container/container";
import { TYPES } from "../container/types";

export const projectRouter = express.Router();

projectRouter.post("/api/projects", async (req, res) => {
  const command = req.body as ProjectCreateCommand;
  const service = appContainer.get(TYPES.IProjectService);

  const result = await service.createProject(command);

  res.send(result.toString());
});

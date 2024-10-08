import express from "express";
import { SprintCreateCommand } from "shared/models/sprint";
import { appContainer } from "../container/container";
import { TYPES } from "../container/types";

export const sprintRouter = express.Router();

sprintRouter.post("/api/projects/:projectId/sprints", async (req, res) => {
  const command = req.body as SprintCreateCommand;
  const service = appContainer.get(TYPES.ISprintService);
  const projectId = parseInt(req.params.projectId);

  const result = await service.createSprint(projectId, command);

  res.send(result.toString());
});

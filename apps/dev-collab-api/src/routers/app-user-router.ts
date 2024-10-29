import express from "express";
import { appContainer } from "../container/container";
import { TYPES } from "../container/types";

export const appUserRouter = express.Router();

appUserRouter.get("/api/users", async (req, res) => {
  const service = appContainer.get(TYPES.IUserService);
  const result = await service.getAllUsers();

  res.send(result);
});

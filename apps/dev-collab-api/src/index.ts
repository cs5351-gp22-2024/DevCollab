import "reflect-metadata";
import bodyParser from "body-parser";
import express from "express";
import "express-async-errors";
import { HomeMessageModel } from "shared/models/home";
import { AppDataSource } from "./db/db-datasrc";
import { createHttpErrorHandler } from "./errors/http-error-handler";
import { projectRouter } from "./routers/project-router";

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get("/api/home/messages", (req, res) => {
  res.send(["Hello World!", "Test from Home"] satisfies HomeMessageModel);
});

app.use("/", projectRouter);

app.use(createHttpErrorHandler());

AppDataSource.initialize().then(() => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});

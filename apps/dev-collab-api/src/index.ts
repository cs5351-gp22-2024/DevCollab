import "reflect-metadata";
import bodyParser from "body-parser";
import express from "express";
import "express-async-errors";
import { HomeMessageModel } from "shared/models/home";
import { AppDataSource } from "./db/db-datasrc";
import { createHttpErrorHandler } from "./errors/http-error-handler";
import { projectRouter } from "./routers/project-router";
import http from "http"; // For Automation Github
import { createServer } from "http"; // For Automation Github
import { Server as WebSocketServer } from "ws"; // For Automation Github
import { userRouter } from "./routers/user-router";

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get("/api/home/messages", (req, res) => {
  res.send(["Hello World!", "Test from Home"] satisfies HomeMessageModel);
});

app.use("/", projectRouter);
app.use("/", userRouter);
app.use(createHttpErrorHandler());

// For Automation Github
const server = http.createServer(app);
const wss = new WebSocketServer({ server });
wss.on("connection", (ws) => {
  console.log("WebSocket connection established");
  ws.on("message", (message) => {
    console.log(`Received message: ${message}`);
  });
  ws.on("close", () => {
    console.log("WebSocket connection closed");
  });
});
//

AppDataSource.initialize().then(() => {
  server.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});
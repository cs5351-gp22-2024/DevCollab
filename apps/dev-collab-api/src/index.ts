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
import { webhookRouter } from './routers/webhook-router'; // For Automation Github
const cors = require('cors'); // For Automation Github
const setupChatbot = require('./function/chatbot'); // For Chatbot
import { userRouter } from "./routers/user-router";

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors()); // For Automation Github - Allow requests from all origins

app.get("/api/home/messages", (req, res) => {
  res.send(["Hello World!", "Test from Home"] satisfies HomeMessageModel);
});

app.use("/", projectRouter);
app.use("/", userRouter);
app.use("/", webhookRouter); // For Automation Github
app.use(createHttpErrorHandler());


const server = http.createServer(app);

// Initialize Chatbot
const wss = setupChatbot(server);

AppDataSource.initialize().then(() => {
  server.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});
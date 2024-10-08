import "reflect-metadata"; // Required for TypeORM and decorators
import bodyParser from "body-parser"; // Middleware for parsing incoming JSON requests
import express from "express"; // Express framework for handling HTTP routes
import "express-async-errors"; // Middleware for handling async errors
import { HomeMessageModel } from "shared/models/home"; // Your shared model for Home message response
import { AppDataSource } from "./db/db-datasrc"; // TypeORM DataSource instance for connecting to MySQL
import { createHttpErrorHandler } from "./errors/http-error-handler"; // Custom error handler middleware
import { projectRouter } from "./routers/project-router"; // Project router
import { userRouter } from "./routers/user-router"; // User router
import { sprintRouter } from "./routers/sprint-router"; // Sprint router
import { UserStoryRouter } from "./routers/userStory-router"; // Import UserStoryRouter
import { UserStoryService } from "./services/userStory-service"; // Import UserStoryService
import { DbContext } from "./db/db-context"; // Import DbContext

// For Automation with GitHub WebSocket setup
import http from "http"; // HTTP server from Node.js
import { Server as WebSocketServer } from "ws"; // WebSocket server implementation from 'ws' library

const app = express(); // Create Express app instance
const port = 3000; // Set port number for the server

// Middleware
app.use(bodyParser.json()); // Middleware to parse incoming JSON requests

// Simple Home route for test
app.get("/api/home/messages", (req, res) => {
  res.send(["Hello World!", "Test from Home"] satisfies HomeMessageModel); // Home message model (ensure that `HomeMessageModel` is defined in your project)
});

// Initialize DbContext with TypeORM manager
const dbContext = new DbContext(AppDataSource.manager);

// Instantiate UserStoryService with DbContext
const userStoryService = new UserStoryService(dbContext); // Pass dbContext to UserStoryService

// Register Routers (APIs)
app.use("/", projectRouter); // Project-related routes
app.use("/", userRouter); // User-related routes
app.use("/", sprintRouter); // Sprint-related routes

// Initialize UserStoryRouter with userStoryService
const userStoryRouter = new UserStoryRouter(userStoryService).initializeRoutes();
app.use("/api/userstories", userStoryRouter); // Register the user stories routes

// Register error handling middleware for HTTP errors
app.use(createHttpErrorHandler());

// WebSocket setup for real-time communications (For Automation GitHub)
const server = http.createServer(app); // Create HTTP server from Express app
const wss = new WebSocketServer({ server }); // Create WebSocket server

// WebSocket event listeners
wss.on("connection", (ws) => {
  console.log("WebSocket connection established");

  // Handle incoming messages from clients
  ws.on("message", (message) => {
    console.log(`Received message: ${message}`);
  });

  // Handle WebSocket disconnection
  ws.on("close", () => {
    console.log("WebSocket connection closed");
  });
});

// Initialize TypeORM DataSource (Database Connection)
AppDataSource.initialize()
  .then(() => {
    // Once the database connection is successful, start the server
    server.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  })
  .catch((error) => {
    // Handle any errors during DataSource initialization
    console.error("Error during Data Source initialization", error);
  });

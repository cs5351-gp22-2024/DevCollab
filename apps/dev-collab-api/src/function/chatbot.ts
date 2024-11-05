import bodyParser from "body-parser";
import mysql, { Connection } from "mysql2/promise";
import { checkConnectionStatus } from "../db/db";
import pool from "../db/db";
import { ContextUser } from "../auth/context-user"; // For User-ID

const WebSocket = require("ws");
const fs = require("fs");
const path = require("path");
const contextUser = new ContextUser(); // For User-ID
const port = 3000;

// Load Q&A pairs
const qaPairs = JSON.parse(
  fs.readFileSync(path.join(__dirname, "chatbot-qa.json"), "utf-8")
);

const setupChatbot = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws, req) => {
    const urlParams = new URLSearchParams(req.url.split("?")[1]);
    const authToken = urlParams.get("auth_token");
    // console.log("Received auth token:", authToken);
    ws.on("message", async (message) => {
      const question = message.toString();
      console.log("Message:", question);
      let answer =
        qaPairs[question] ||
        "Sorry, I don't know the answer. Try 'What is DevCollab?' or 'tasks'.";
      const query =
        "SELECT COUNT(*) AS taskCount, MIN(duedate) AS upcomingDeadline FROM Task WHERE assignee = ? AND status != ?";
      const query_task = "SELECT taskid FROM Task WHERE duedate = ?";

      if (question.toLowerCase().includes("task") && answer.includes("Sorry")) {
        try {
          const userId = await contextUser.getUserId(authToken);
          console.log("userId", userId);
          if (userId == undefined) {
            ws.send("Please login first to view your tasks.");
            return wss;
          }
          const connection: Connection = await pool.getConnection();
          const results = await connection.query(query, [userId, "Done"]);

          console.log(query, [userId, "Done"]);
          console.log(results);
          connection.release();
          if (results.length > 0) {
            const taskCount = results[0][0].taskCount;
            console.log(taskCount);
            const upcomingDeadline = results[0][0].upcomingDeadline;
            const result_task = await connection.query(query_task, [
              upcomingDeadline,
            ]);
            if (taskCount > 0 && !result_task[0].length == 0) {
              answer = `You have ${taskCount} tasks remaining, the upcoming deadline is ${upcomingDeadline} for task ${result_task[0][0].taskid}.`;
            } else {
              answer = "You have no remaining tasks, great job!";
            }
          }
          ws.send(answer);
        } catch (err) {
          console.error("Error getting answers for Chatbot", err);
          ws.send(
            "Sorry, cannot fetch task status now. Please check connection."
          );
        }
      } else {
        ws.send(answer);
      }
    });
  });

  return wss;
};

module.exports = setupChatbot;

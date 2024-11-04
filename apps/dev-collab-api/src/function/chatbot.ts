import bodyParser from 'body-parser';
import mysql, { Connection } from 'mysql2/promise';
import { checkConnectionStatus } from '../db/db';
import pool from '../db/db';
import { ContextUser } from '../auth/context-user'; // For User-ID

const WebSocket = require('ws');
const fs = require('fs');
const path = require('path');
const contextUser = new ContextUser(); // For User-ID
const port = 3000;

// Load Q&A pairs
const qaPairs = JSON.parse(fs.readFileSync(path.join(__dirname, 'chatbot-qa.json'), 'utf-8'));

const setupChatbot = (server) => {
    const wss = new WebSocket.Server({ server });

     wss.on('connection', (ws, req) => {
    const authHeader = req.headers.auth_header;
        ws.on('message', (message) => {
  const question = message.toString();
  let answer = qaPairs[question] || "Sorry, I don't know the answer to that. Please try 'tasks' or other questions.";
  const query = 'SELECT COUNT(*) AS taskCount, MIN(duedate) AS upcomingDeadline FROM Task WHERE assignee = ? AND status != ?';

    if (question.toLowerCase().includes('task') && !answer.includes('Sorry')) {

    try {
        const userId = await contextUser.getUserId(authHeader);
        if (userId == null) {
            ws.send("Please login first to view your tasks.");
            return wss;
        }
        const connection = await pool.getConnection();
        const results = await connection.query(query, [userId, 'Done']);
        console.log(results);
        connection.release();
        if (results.length > 0) {
          const taskCount = results[0].taskCount;
          const upcomingDeadline = results[0].upcomingDeadline;

          if (taskCount > 0) {
            answer = `You have ${taskCount} tasks remaining, the upcoming deadline is ${upcomingDeadline} for taskid: ${results[0].taskid}.`;
          } else {
            answer = "You have no remaining tasks, great job!";
          }
        }
        ws.send(answer);
    } catch (err) {
        console.error('Error getting answers for Chatbot', err);
        ws.send(answer);
    }
  } else {
    ws.send(answer);
  }
});
    });

    return wss;
};

module.exports = setupChatbot;

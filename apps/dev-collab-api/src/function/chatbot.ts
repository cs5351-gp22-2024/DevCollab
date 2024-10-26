const WebSocket = require('ws');
const fs = require('fs');
const path = require('path');

// Load Q&A pairs
const qaPairs = JSON.parse(fs.readFileSync(path.join(__dirname, 'chatbot-qa.json'), 'utf-8'));

const setupChatbot = (server) => {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', (ws) => {
        ws.on('message', (message) => {
            const question = message.toString();
            const answer = qaPairs[question] || "I don't know the answer to that.";
            ws.send(answer);
        });
    });

    return wss;
};

module.exports = setupChatbot;

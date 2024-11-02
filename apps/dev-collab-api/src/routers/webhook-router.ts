// The errors below are false alarm, just ignore

import express from 'express';
import bodyParser from 'body-parser';
import mysql, { Connection } from 'mysql2/promise';
import { checkConnectionStatus } from '../db/db';
import pool from '../db/db';

export const webhookRouter = express.Router();

webhookRouter.use(bodyParser.json());
const port = 3000;

// Test : curl -X GET http://localhost:3000/webhook/db-status
webhookRouter.get('/webhook/db-status', async (req, res) => {
    const isConnected = await checkConnectionStatus();
    if (isConnected) {
        res.status(200).send('Database connection is operational');
    } else {
        res.status(500).send('Database connection is down');
    }
});

// Test : curl -X POST http://localhost:3000/webhook/save-url -H "Content-Type: application/json" -d "{\"url\": \"TEST_URL\",\"name\": \"TEST_URL_NAME\"}"
webhookRouter.post('/webhook/save-url', async (req, res) => {
    const { url, name } = req.body;

    const query = 'INSERT INTO webhook_urls (url, name) VALUES (?, ?)';
    try {
        const connection = await pool.getConnection();
        await connection.query(query, [url, name]);
        connection.release();
        console.log('URL saved to database');
        res.status(200).send('URL saved successfully');
    } catch (err) {
        console.error('Error inserting URL into the database:', err);
        res.status(500).send('Error saving URL');
    }
});

// Test : curl -X POST http://localhost:3000/webhook/test -H "Content-Type: application/json" -d "{\"message\": \"Hello, World!\"}"
webhookRouter.post('/webhook/:randomNumber', async (req, res) => {
    const payload = req.body;
    console.log(payload);
    const randomNumber = req.params.randomNumber;
    console.log(randomNumber);

    const getUrlIdQuery = 'SELECT id FROM webhook_urls WHERE url = ?';
    try {
        const connection: Connection = await pool.getConnection();
        const results = await connection.query(getUrlIdQuery, [`/webhook/${randomNumber}`]);
        console.log(results);
        const webhookUrlId = results[0][0].id;
        console.log(webhookUrlId);
        const insertQuery = 'INSERT INTO webhook_events (webhook_url_id, payload) VALUES (?, ?)';
        await connection.query(insertQuery, [webhookUrlId, JSON.stringify(payload)]);
        connection.release();
        console.log('Data saved to database');
        res.status(200).send('Webhook received');
    } catch (err) {
        console.error('Error inserting data into the database:', err);
        res.status(500).send('Error saving data');
    }
});

// Test : curl -X GET http://localhost:3000/webhook/api/webhook-events
webhookRouter.get('/webhook/api/webhook-events', async (req, res) => {
    const query = `
        SELECT we.id, wu.name, we.payload, we.created_at 
        FROM webhook_events we 
        JOIN webhook_urls wu ON we.webhook_url_id = wu.id`;
    try {
        const connection: Connection = await pool.getConnection();
        const [results] = await connection.query(query);
        connection.release();
        res.status(200).json(results);
    } catch (err) {
        console.error('Error fetching events from the database:', err);
        res.status(500).send('Error fetching events');
    }
});

// Test : curl -X GET http://localhost:3000/webhook/api/webhooks
webhookRouter.get('/webhook/api/webhooks', async (req, res) => {
    const query = `
        SELECT id, url, name, created_at 
        FROM webhook_urls`;
    try {
        const connection: Connection = await pool.getConnection();
        const [results] = await connection.query(query);
        connection.release();
        res.status(200).json(results);
    } catch (err) {
        console.error('Error fetching events from the database:', err);
        res.status(500).send('Error fetching events');
    }
});

// ? Test : curl -X GET http://localhost:3000/webhook/api/webhooks
webhookRouter.post('/webhook/api/webhook-delete/:idnum', async (req, res) => {
    const idnum = req.params.idnum;
    console.log(idnum);

    // Get URL first for delete in Event
    // Delete from both Event and URL
    const queryEventID = `
        SELECT we.id
        FROM webhook_events we 
        JOIN webhook_urls wu ON we.webhook_url_id = wu.id WHERE wu.id = ?`;
    const queryURL = `
        SELECT url
        FROM webhook_urls WHERE id = ?`;
    const DeleteFromURL = 'DELETE FROM webhook_urls WHERE url = ?';
    const DeleteFromEVENT = 'DELETE FROM webhook_events WHERE id = ?';
    try {
        const connection: Connection = await pool.getConnection();
        const resultsEventTable = await connection.query(queryEventID, [`${idnum}`]);
        const resultsURLTable = await connection.query(queryURL, [`${idnum}`]);
        // console.log(results);
        if (resultsEventTable[0].length === 0) { console.log("Event table founds no ID.") }
        else{
            resultsEventTable[0].forEach((elem) => {
                const results3 = connection.query(DeleteFromEVENT, [`${elem.id}`]);
                // console.log(results3);
              });
        }
        if (resultsURLTable[0].length === 0) { console.log("URL table founds no ID.") }
        else{
            resultsURLTable[0].forEach((elem) => {
                const results2 = connection.query(DeleteFromURL, [`${elem.url}`]);
                // console.log(results2);
                });
        }
        res.status(200);

    } catch (err) {
        console.error('Error fetching events from the database:', err);
        res.status(500).send('Error fetching events');
    }
});

// import { config } from "dotenv";
import express from "express";
import pkg from 'colyseus';
// import { Server } from "colyseus";
import cors from "cors";
import { config } from "dotenv";
// import{ createServer } from "https";
import { WebSocketTransport } from "@colyseus/ws-transport";
import { MyRoom } from "./rooms/MyRoom.js";
import { createServer } from "https";
import * as fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import path from "path";

const { Server } = pkg;
// const { createServer }= fg;
// import express from "express";
config();
// const express = require('express');
// const cors = require('cors');

const app = express();
app.use(cors());
// app.use(express.json());

// const port = process.env.PORT || 3000;

const portString = process.env.PORT || "3000";
const port = parseInt(portString, 10);

function corsMiddleware(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
}

app.use(corsMiddleware);

app.get('/', (req, res) => {
    res.send({ title: "Welcome" })
})
app.get('/data', (req, res) => {
    res.send({ data: "dhananjay" })
})

app.get("/matchmake/joinOrCreate", (req, res) => {
    // Your logic for handling the GET request goes here
    res.status(200).send("Handling GET request for /matchmake/joinOrCreate");
});
app.get("/matchmake/joinOrCreate/", (req, res) => {
    // Your logic for handling the GET request goes here
    res.status(200).send("Handling GET request for /matchmake/joinOrCreate/");
});
app.get("/matchmake/joinOrCreate/GameRoom", (req, res) => {
    // Your logic for handling the GET request goes here
    console.log("Game Room request")
    res.status(200).send("Handling GET request for /matchmake/joinOrCreate/GameRoom");
});
app.get("/matchmake/joinOrCreate/GameRoom/", (req, res) => {
    // Your logic for handling the GET request goes here
    res.status(200).send("Handling GET request for /matchmake/joinOrCreate/GameRoom/");
});

// Use regular HTTP in development

const certPath = process.env.SSL_CERT_PATH;
const keyPath = process.env.SSL_KEY_PATH

// const options = {
//     // key: fs.readFileSync('path/to/private-key.pem'),
//     key: fs.readFileSync(path.join(__dirname, '../cert', 'key.pem')),
//     cert: fs.readFileSync(path.join(__dirname, '../cert', 'cert.pem'))

console.log("Using SSL : ", certPath, keyPath);
// };
const options = {
    // key: fs.readFileSync('path/to/private-key.pem'),
    key: fs.readFileSync(keyPath),
    cert: fs.readFileSync(certPath)
};

console.log("Using options : ", options);

// Create the HTTPS server
const server = createServer(options, app);

// const server = createServer(app,options);

let gameServer = new Server({
    transport: new WebSocketTransport({
        server,
        verifyClient: (info: any, next: any) => {
            next(true);
        },
    }),
});

gameServer.define('GameRoom', MyRoom);
gameServer.listen(port).then(() => {
    console.info("Game started and listening on port", port);
})
    .catch((err: any) => {
        console.error("Failed to listen on port" + err)
    })
console.info(`Server running on port ${port}`);


// app.listen(port, () => {
//     console.log(`app listening on port ${port}`);
// })

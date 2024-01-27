// import { config } from "dotenv";
import express from "express";
import pkg from 'colyseus';
// import { Server } from "colyseus";
import cors from "cors";
import { config } from "dotenv";
import { createServer } from "https";
import { WebSocketTransport } from "@colyseus/ws-transport";
import { MyRoom } from "./rooms/MyRoom.js";
const { Server } = pkg;
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
const server = createServer(app);

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

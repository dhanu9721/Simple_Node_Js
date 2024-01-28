// import express from "express";
// import pkg from 'colyseus';
// import cors from "cors";
// import { config } from "dotenv";
// import { WebSocketTransport } from "@colyseus/ws-transport";
// import { MyRoom } from "./rooms/MyRoom.js";
// // import { createServer } from "https";
// import { createServer } from "http";
// import * as fs from 'fs';
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// import path from "path";
// const { Server } = pkg;

// config();

// const app = express();
// app.use(cors());

// const portString = process.env.PORT || "3005";
// const port = parseInt(portString, 10);

// function corsMiddleware(req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     next();
// }

// app.use(corsMiddleware);

// app.get('/', (req, res) => {
//     res.send({ title: "Welcome" })
// })

// app.get("/matchmake/joinOrCreate/GameRoom", (req, res) => {
//     // Your logic for handling the GET request goes here
//     console.log("Game Room request")
//     res.status(200).send("Handling GET request for /matchmake/joinOrCreate/GameRoom");
// });

// // const region = process.env.MY_REGION;
// // const certPath = process.env.MY_AWS_ACCESS_KEY_ID;
// // const certPath = process.env.SSL_CERT_PATH;
// // const keyPath = process.env.SSL_KEY_PATH
// // const keyPath = process.env.MY_AWS_SECRET_ACCESS_KEY

// // console.log("my paths region : ", region, " cert : ", certPath, " key : ", keyPath)


// console.log("process env : ", process.env)

// const options = {
//     // key: fs.readFileSync(keyPath),
//     // cert: fs.readFileSync(certPath)
// };

// // console.log("Using options : ", options);

// // const server = createServer(options, app);
// const server = createServer(app);

// let gameServer = new Server({
//     transport: new WebSocketTransport({
//         server,
//         verifyClient: (info: any, next: any) => {
//             next(true);
//         },
//     }),
// });

// gameServer.define('GameRoom', MyRoom);
// gameServer.listen(port).then(() => {
//     console.info("Game started and listening on port", port);
// })
//     .catch((err: any) => {
//         console.error("Failed to listen on port" + err)
//     })
// console.info(`Server running on port ${port}`);


/**
 * IMPORTANT:
 * ---------
 * Do not manually edit this file if you'd like to host your server on Colyseus Cloud
 *
 * If you're self-hosting (without Colyseus Cloud), you can manually
 * instantiate a Colyseus Server as documented here:
 *
 * See: https://docs.colyseus.io/server/api/#constructor-options
 */
import { listen } from "@colyseus/tools";

// Import Colyseus config
import app from "./app.config";

// Create and listen on 2567 (or PORT environment variable.)
listen(app);

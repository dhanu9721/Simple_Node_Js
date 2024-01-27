// import { config } from "dotenv";
import express from "express";
import cors from "cors";
import { config } from "dotenv";
// import express from "express";

config();
// const express = require('express');
// const cors = require('cors');

const app = express();
app.use(cors());
// app.use(express.json());

const port = process.env.PORT || 3000;

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


app.listen(port, () => {
    console.log(`app listening on port ${port}`);
})

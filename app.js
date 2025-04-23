import express from "express";
import { PrismaClient } from "@prisma/client";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import participantRouter from "./router/participant.js";
import rootRouter from "./router/index.js"; // Importer le routeur principal



const app = express();

app.use(bodyParser.json());
dotenv.config();

const prisma = new PrismaClient();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use("/api", rootRouter);
app.use("/api/participant", participantRouter);

export default app;
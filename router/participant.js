
import express from 'express'
import { fetch, create, update, deleteParticipant, fetchOne } from '../controllers/participant.js';
const router = express.Router();
const rootRouter = express.Router();
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();



router.post("/create", create);
router.get( "/getAllparticipant",fetch );
router.get("/participant/:id", fetchOne); // Route pour récupérer un participant par son ID
router.put("/update/:id", update);
router.delete("/delete/:id", deleteParticipant); // Route pour supprimer un participant



export default router; //exporter le routeur
export { rootRouter }; // Exporter le routeur principal
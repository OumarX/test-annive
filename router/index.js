import { Router } from 'express';
import authRouter from './auth.js'; // Importez authRouter depuis auth.js

const rootRouter = Router();

// Ajoutez le routeur d'authentification
rootRouter.use("/auth", authRouter);

export default rootRouter;
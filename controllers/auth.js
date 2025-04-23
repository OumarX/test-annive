import express from 'express';
import { PrismaClient } from '@prisma/client';
import { hashSync, compareSync } from 'bcrypt';
import jwt from 'jsonwebtoken';
import {v4 as uuidv4} from 'uuid';
import { sendEmail } from '../email.service.js';
import { body, validationResult } from 'express-validator';


const userId = uuidv4();
console.log('Generated UUID:', userId);
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_key'; // Assurez-vous que JWT_SECRET est défini dans votre .env

// Fonction de création de compte (signup)
export const signup = async (req, res) => {
    const { email, password, name } = req.body;

    try {
        // Vérifiez si l'utilisateur existe déjà
        let participant = await prisma.participant.findFirst({ where: { email } });
        if (participant) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Créez un nouvel utilisateur
        participant = await prisma.participant.create({
            data: {
                id: uuidv4(), // Générer un nouvel ID unique
                email,
                password: hashSync(password, 10), // Hachez le mot de passe
                name,
            },
        });


        res.status(201).json({ message: 'User created successfully', participant });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// Fonction de connexion (login)
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Vérifiez si l'utilisateur existe
        const participant = await prisma.participant.findFirst({ where: { email } });
        if (!participant) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Vérifiez le mot de passe
        if (!compareSync(password, participant.password)) {
            return res.status(400).json({ message: 'Incorrect password' });
        }

        // Générez un token JWT
        const token = jwt.sign({ participantId: participant.id }, JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: 'Login successful', participant, token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
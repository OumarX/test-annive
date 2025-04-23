import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config(); // Charge les variables d'environnement depuis le fichier .env

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
        
    },
    
});

// Fonction pour envoyer un email
export const sendEmail = async (to, subject, text) => {
    try {
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            throw new Error("EMAIL_USER and EMAIL_PASS must be defined in the .env file");
        }

        const mailOptions = {
            from: process.env.EMAIL_USER, // Adresse email de l'expéditeur
            to: "dudreburke@gufum.com", // Destinataire
            subject:"inscription reussi", // Sujet de l'email
            text:"soyez les bienvenue a la fete", // Contenu en texte brut
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent:", info.response);
        return info;
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
};

export default sendEmail;
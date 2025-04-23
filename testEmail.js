import sendEmail from './email.service.js';

(async () => {
    try {
        const info = await sendEmail(
            "recipient@example.com", // Destinataire
            "Test Email", // Sujet
            "Ceci est un email de test envoyé avec Nodemailer." // Contenu
        );
        console.log("Email envoyé avec succès :", info.response);
    } catch (error) {
        console.error("Erreur lors de l'envoi de l'email :", error);
    }
})();
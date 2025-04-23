
import app from "./app.js"; // Importez l'application Express depuis app.js

const PORT = process.env.PORT || 3000;

app.set("port", PORT); // Configurez le port

app.listen(PORT, () => {
    console.log(`Le serveur est en cours d'exécution sur le port ${PORT}`);
});
// Vous pouvez également ajouter d'autres configurations ou middlewares ici si nécessairel

export default app;
const express = require("express");
const app = express();
const router = require("./routeur");
const { notFoundHandler, errorHandler } = require("./middleware");

const PORT = 3000;

app.use(express.json());

// router
app.use(router);

// middleware pour gérer les routes non trouvées
app.use(notFoundHandler);

// middleware pour gérer les erreurs
app.use(errorHandler);

// démarrage du serveur
app.listen(PORT, () => {
    console.log(`Le serveur est démarré sur http://localhost:${PORT}`);
});

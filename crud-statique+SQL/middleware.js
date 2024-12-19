const validateUserData = (name, age) => {
    if (!name || typeof name !== 'string' || name.trim() === '') {
        return { valid: false, error: "Le champ 'name' est requis et doit être une chaîne non vide." };
    }

    if (!age || typeof age !== 'number' || age <= 0 || !Number.isInteger(age)) {
        return { valid: false, error: "Le champ 'age' est requis et doit être un entier positif." };
    }

    return { valid: true };
};

const notFoundHandler = (req, res, next) => {
    res.status(404).json({ error: "Route non trouvée" });
};

const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Une erreur serveur est survenue" });
};

module.exports = { validateUserData, notFoundHandler, errorHandler };
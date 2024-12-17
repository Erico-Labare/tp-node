const express = require("express")

const app = express()

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Le serveur est démarré sur http://localhost:${PORT}`);
});


app.use(express.json());

const Users = [
    { id: 1, name: "Jean", age: 28 },
    { id: 2, name: "Emma", age: 34 },
    { id: 3, name: "Noah", age: 26 },
    { id: 4, name: "Olivia", age: 31 },
    { id: 5, name: "Ava", age: 22 },
    { id: 6, name: "James", age: 40 },
    { id: 7, name: "Sophia", age: 29 },
    { id: 8, name: "Jackson", age: 36 },
    { id: 9, name: "Isabella", age: 25 },
    { id: 10, name: "Mason", age: 33 }
];

// Ex1
app.get('/users', (req, res) => {
    res.json(Users);
});

// Ex2
app.get('/users/id/:id', (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const user = Users.find(u => u.id === userId);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ error: `Utilisateur avec l'ID ${userId} non trouvé.` });
    }
});

// Ex3
app.get('/users/search', (req, res) => {
    const name = req.query.name;
    if (!name) {
        return res.json([]);
    }
    const matchingUsers = Users.filter(user =>
        user.name.toLowerCase().includes(name.toLowerCase())
    );
    res.json(matchingUsers);
});

// Ex4 + 6
app.post('/users', (req, res) => {
    const { name, age } = req.body;
    const validation = validateUserData(name, age);
    if (!validation.valid) {
        return res.status(400).json({ error: validation.error });
    }
    const newId = Users.length > 0 ? Math.max(...Users.map(user => user.id)) + 1 : 1;
    const newUser = { id: newId, name, age };
    Users.push(newUser);
    res.status(201).json(newUser);
});

// Ex5 + 6
app.put('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const { name, age } = req.body;
    if (isNaN(userId)) {
        return res.status(400).json({ error: "L'ID doit être un nombre valide." });
    }
    const userIndex = Users.findIndex(user => user.id === userId);
    if (userIndex === -1) {
        return res.status(404).json({ error: `Utilisateur avec l'ID ${userId} non trouvé.` });
    }
    const validation = validateUserData(name, age);
    if (!validation.valid) {
        return res.status(400).json({ error: validation.error });
    }
    Users[userIndex] = { ...Users[userIndex], name, age };
    res.json(Users[userIndex]);
});

// Ex6
function validateUserData(name, age) {
    if (!name || typeof name !== 'string' || name.trim() === '') {
        return { valid: false, error: "Le champ 'name' est requis et doit être une chaîne non vide." };
    }

    if (!age || typeof age !== 'number' || age <= 0 || !Number.isInteger(age)) {
        return { valid: false, error: "Le champ 'age' est requis et doit être un entier positif." };
    }

    return { valid: true };
}

// Ex7
app.get('/users/page', (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    if (isNaN(pageNum) || pageNum <= 0 || isNaN(limitNum) || limitNum <= 0) {
        return res.status(400).json({ error: "Les paramètres 'page' et 'limit' doivent être des entiers positifs." });
    }
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;
    const paginatedUsers = Users.slice(startIndex, endIndex);
    const totalUsers = Users.length;
    const totalPages = Math.ceil(totalUsers / limitNum);
    const response = {
        currentPage: pageNum,
        totalPages: totalPages,
        limit: limitNum,
        totalUsers: totalUsers,
        users: paginatedUsers,
    };

    res.json(response);
});

app.use((req, res, next) => {
    res.status(404).json({ error: "Route non trouvée" });
});


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Une erreur serveur est survenue" });
});
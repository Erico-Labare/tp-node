const Users = require("./userModel");
const { validateUserData } = require("./middleware");


// GET recherche all
const getAllUsers = (req, res) => {
    res.json(Users.getAll());
};

// GET recherche par id
const getUserById = (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const user = Users.getById(userId);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ error: `Utilisateur avec l'ID ${userId} non trouvé.` });
    }
};

// GET recherche par nom
const searchUsers = (req, res) => {
    const name = req.query.name;
    if (!name) {
        return res.json([]);
    }
    const matchingUsers = Users.searchByName(name);
    res.json(matchingUsers);
};

// GET Page
const paginateUsers = (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);

    if (isNaN(pageNum) || pageNum <= 0 || isNaN(limitNum) || limitNum <= 0) {
        return res.status(400).json({ error: "Les paramètres 'page' et 'limit' doivent être des entiers positifs." });
    }

    const paginatedResult = Users.paginate(pageNum, limitNum);
    res.json(paginatedResult);
};

// POST
const addUser = (req, res) => {
    const { name, age } = req.body;
    const validation = validateUserData(name, age);
    if (!validation.valid) {
        return res.status(400).json({ error: validation.error });
    }
    const newUser = Users.add(name, age);
    res.status(201).json(newUser);
};

// PUT
const updateUser = (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const { name, age } = req.body;

    if (isNaN(userId)) {
        return res.status(400).json({ error: "L'ID doit être un nombre valide." });
    }

    const validation = validateUserData(name, age);
    if (!validation.valid) {
        return res.status(400).json({ error: validation.error });
    }

    const updatedUser = Users.update(userId, name, age);
    if (updatedUser) {
        res.json(updatedUser);
    } else {
        res.status(404).json({ error: `Utilisateur avec l'ID ${userId} non trouvé.` });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    searchUsers,
    paginateUsers,
    addUser,
    updateUser,
};
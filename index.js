const express = require("express")

const app = express()

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Le serveur est démarré sur http://localhost:${PORT}`);
});

app.get('/hello', (req, res) => {
    res.send('Bonjour, bienvenue dans notre API!');
});

app.get('/user/:name', (req, res) => {
    const userName = req.params.name;
    res.send(`Bonjour, ${userName}!`);
});

app.get('/search', (req, res) => {
    const query = req.query.query;
    if (query) {
        res.send(`Vous avez recherché : ${query}`);
    } else {
        res.send('Aucune recherche effectuée.');
    }
});

app.get('/product/:category/:id', (req, res) => {
    const category = req.params.category;
    const id = req.params.id;
    res.send(`Produit ID ${id} dans la catégorie ${category}`);
});

app.get('/api/info', (req, res) => {
    const response = {
        message: "Bienvenue sur notre API",
        status: "success"
    };
    res.json(response);
});

app.get('/welcome', (req, res) => {
    const htmlContent = `
      <h1>Bienvenue sur notre site</h1>
      <p>Explorez nos fonctionnalités !</p>
    `;

    res.send(htmlContent);
});

app.get('/profile/:username', (req, res) => {
    const username = req.params.username;
    const age = req.query.age;
    const message = age
        ? `Profil de ${username}, âge : ${age}`
        : `Profil de ${username}, âge non spécifié.`;
    res.send(message);
});

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
  
  app.get('/api/users', (req, res) => {
    const name = req.query.name;
      if (name) {
      const user = Users.find(user => user.name.toLowerCase() === name.toLowerCase());
        if (user) {
        return res.json(user);
      } else {
        return res.status(404).json({ error: `Aucun utilisateur trouvé avec le nom : ${name}` });
      }
    }
      res.json(Users);
  });
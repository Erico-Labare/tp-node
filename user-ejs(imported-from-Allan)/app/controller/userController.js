const { Users } = require("../model/User");
const sequelize = require("sequelize");
const controller = {};

// Afficher la liste des utilisateurs
controller.index = (req, res) => {
  Users.findAll().then((users) => {
    res.render("index", { users });
  });
};

// Afficher les détails d'un utilisateur
controller.show = (req, res) => {
  Users.findByPk(parseInt(req.params.id)).then((user) => {
    res.render("show", { user });
  }).catch((err) => {
    res.status(404).json({ message: "Utilisateur introuvable !" });
  });
};

// Formulaire pour créer un nouvel utilisateur
controller.create = (req, res) => {
  res.render("create");
};

// Ajouter un utilisateur (action POST)
controller.store = (req, res) => {
  const { name, age } = req.body;
  Users.create({ name, age }).then((user) => {
    res.redirect("/users");
  }).catch((err) => {
    res.status(400).json({ message: "Erreur lors de la création de l'utilisateur !" });
  });
};

// Formulaire pour modifier un utilisateur
controller.edit = (req, res) => {
  const id = parseInt(req.params.id);
  Users.findByPk(id).then((user) => {
    res.render("edit", { user });
  }).catch((err) => {
    res.status(404).json({ message: "Utilisateur introuvable !" });
  });
};

// Mettre à jour un utilisateur
controller.update = (req, res) => {
  const { name, age } = req.body;
  const id = parseInt(req.params.id);

  Users.update({ name, age }, { where: { id } }).then(() => {
    res.redirect("/users");
  }).catch((err) => {
    res.status(400).json({ message: "Erreur lors de la mise à jour de l'utilisateur !" });
  });
};

// Supprimer un utilisateur
controller.destroy = (req, res) => {
  const id = parseInt(req.params.id);
  Users.destroy({ where: { id } }).then(() => {
    res.redirect("/users");
  }).catch((err) => {
    res.status(400).json({ message: "Erreur lors de la suppression de l'utilisateur !" });
  });
};

module.exports = controller;
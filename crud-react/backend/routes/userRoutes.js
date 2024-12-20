const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Get all users
router.get("/", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

// Get one user
router.get("/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// Create a new user
router.post("/", async (req, res) => {
  const { name, age } = req.body;
  const user = await User.create({ name, age });
  res.status(201).json(user);
});

// Update a user
router.put("/:id", async (req, res) => {
  const { name, age } = req.body;
  const user = await User.findByPk(req.params.id);
  if (user) {
    await user.update({ name, age });
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// Delete a user
router.delete("/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (user) {
    await user.destroy();
    res.json({ message: "User deleted" });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

module.exports = router;
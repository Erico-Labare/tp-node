const express = require("express");
const router = express.Router();
const controller = require("./controleur");

router.get("/users", controller.getAllUsers);
router.get("/users/id/:id", controller.getUserById);
router.get("/users/search", controller.searchUsers);
router.get("/users/page", controller.paginateUsers);

router.post("/users", controller.addUser);

router.put("/users/:id", controller.updateUser);

module.exports = router;
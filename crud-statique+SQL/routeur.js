const express = require("express");
const router = express.Router();
const userController = require("./userController");
const productController = require("./productController.js");

router.get("/users", userController.getAllUsers);
router.get("/users/id/:id", userController.getUserById);
router.get("/users/search", userController.searchUsers);
router.get("/users/page", userController.paginateUsers);

router.post("/users", userController.addUser);

router.put("/users/:id", userController.updateUser);


router.get("/products", productController.getAllProducts);
router.get("/products/id/:id", productController.getProductById);
router.post("/products", productController.addProduct);
router.put("/products/:id", productController.updateProduct);
router.delete("/products/:id", productController.deleteProduct);
router.get("/products/search", productController.searchProducts);

module.exports = router;
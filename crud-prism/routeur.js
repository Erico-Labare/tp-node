const express = require("express");
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  searchProducts,
} = require("./controller");

const router = express.Router();

// POST
router.post("/", createProduct);

// GET
router.get("/", getAllProducts);

// GET by ID
router.get("/:id", getProductById);

// PUT
router.put("/:id", updateProduct);

// DELETE
router.delete("/:id", deleteProduct);

// SEARCH
router.get("/search", searchProducts);

module.exports = router;
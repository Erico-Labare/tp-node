const prisma = require("./model");

// POST
const createProduct = async (req, res) => {
  try {
    const { name, description, quantity, price } = req.body;
    const newProduct = await prisma.product.create({
      data: { name, description, quantity, price },
    });
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: "Erreur lors de la création", err });
  }
};

// GET
const getAllProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la récupération", err });
  }
};

// GET by ID
const getProductById = async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(req.params.id, 10) },
    });
    if (!product) {
      return res.status(404).json({ message: "Produit non trouvé" });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la récupération", err });
  }
};

// PUT
const updateProduct = async (req, res) => {
  try {
    const { name, description, quantity, price } = req.body;
    const updatedProduct = await prisma.product.update({
      where: { id: parseInt(req.params.id, 10) },
      data: { name, description, quantity, price },
    });
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: "Erreur lors de la mise à jour", err });
  }
};

// DELETE
const deleteProduct = async (req, res) => {
  try {
    await prisma.product.delete({
      where: { id: parseInt(req.params.id, 10) },
    });
    res.status(200).json({ message: "Produit supprimé avec succès" });
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la suppression", err });
  }
};

// SEARCH
const searchProducts = async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) {
      return res.status(400).json({ message: "Nom de produit requis pour la recherche" });
    }
    const matchingProducts = await prisma.product.findMany({
      where: { name: { contains: name, mode: "insensitive" } },
    });
    res.status(200).json(matchingProducts);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la recherche", err });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  searchProducts,
};
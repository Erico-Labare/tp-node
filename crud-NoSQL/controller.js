const Product = require("./model");

// POST
const createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: "Erreur lors de la création", err });
  }
};

// GET
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la récupération", err });
  }
};

// GET by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
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
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Produit non trouvé" });
    }
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: "Erreur lors de la mise à jour", err });
  }
};

// DELETE
const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Produit non trouvé" });
    }
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
    const matchingProducts = await Product.find({
      name: { $regex: name, $options: "i" },
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
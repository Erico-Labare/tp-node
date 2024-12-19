const Product = require("./productModel");

// GET all products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: "Une erreur est survenue lors de la récupération des produits." });
    }
};

// GET product by ID
const getProductById = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ error: `Produit avec l'ID ${req.params.id} non trouvé.` });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: "Une erreur est survenue lors de la récupération du produit." });
    }
};

// POST add a product
const addProduct = async (req, res) => {
    const { name, price, quantity, description } = req.body;
    if (!name || price == null || quantity == null || !description) {
        return res.status(400).json({ error: "Tous les champs sont obligatoires : name, price, quantity, description." });
    }

    try {
        const newProduct = await Product.create({ name, price, quantity, description });
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: "Une erreur est survenue lors de l'ajout du produit." });
    }
};

// PUT update a product
const updateProduct = async (req, res) => {
    const { name, price, quantity, description } = req.body;

    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ error: `Produit avec l'ID ${req.params.id} non trouvé.` });
        }

        await product.update({ name, price, quantity, description });
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: "Une erreur est survenue lors de la mise à jour du produit." });
    }
};

// DELETE a product
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ error: `Produit avec l'ID ${req.params.id} non trouvé.` });
        }

        await product.destroy();
        res.json({ message: `Produit avec l'ID ${req.params.id} supprimé avec succès.` });
    } catch (error) {
        res.status(500).json({ error: "Une erreur est survenue lors de la suppression du produit." });
    }
};

// Search products by Name
const searchProducts = async (req, res) => {
    const { name } = req.query;

    try {
        const products = await Product.findAll({
            where: {
                name: {
                    [require("sequelize").Op.like]: `%${name}%`,
                },
            },
        });

        res.json(products);
    } catch (error) {
        res.status(500).json({ error: "Une erreur est survenue lors de la recherche des produits." });
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
    searchProducts,
};
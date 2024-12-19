const prisma = require("./model");

const renderAllProducts = async (req, res) => {
  const products = await prisma.product.findMany();
  res.render("products/index", { title: "Produits", products });
};

const renderProductDetails = async (req, res) => {
  const product = await prisma.product.findUnique({ where: { id: parseInt(req.params.id) } });
  res.render("products/show", { title: "Détails du produit", product });
};

const renderCreateProduct = (req, res) => {
  res.render("products/create", { title: "Créer un produit" });
};

const renderEditProduct = async (req, res) => {
  const product = await prisma.product.findUnique({ where: { id: parseInt(req.params.id) } });
  res.render("products/edit", { title: "Modifier un produit", product });
};

const createProduct = async (req, res) => {
  const { name, description, price, quantity } = req.body;
  const product = await prisma.product.create({
    data: { name, description, price: parseFloat(price), quantity: parseInt(quantity) },
  });
  res.redirect("/products");
};

const updateProduct = async (req, res) => {
  const { name, description, price, quantity } = req.body;
  const productId = parseInt(req.params.id);
  await prisma.product.update({
    where: { id: productId },
    data: { name, description, price: parseFloat(price), quantity: parseInt(quantity) },
  });
  res.redirect(`/products/${productId}`);
};

const deleteProduct = async (req, res) => {
  const productId = parseInt(req.params.id);
  await prisma.product.delete({
    where: { id: productId },
  });
  res.redirect("/products");
};


module.exports = {
  renderAllProducts,
  renderProductDetails,
  renderCreateProduct,
  renderEditProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
const express = require("express");
const router = express.Router();
const controller = require("./controller");
console.log(controller);

router.get("/", controller.renderAllProducts);

router.get("/create", controller.renderCreateProduct);

router.post("/", controller.createProduct);

router.get("/:id", controller.renderProductDetails);

router.get("/:id/edit", controller.renderEditProduct);

router.put("/:id", controller.updateProduct);

router.delete("/:id", controller.deleteProduct);

module.exports = router;
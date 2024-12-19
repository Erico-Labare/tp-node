const express = require("express");
const router = require("./routeur");
const { notFoundHandler, errorHandler } = require("./middleware");

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/products", router);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
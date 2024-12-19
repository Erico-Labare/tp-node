const express = require("express");
const mongoose = require("mongoose");
const router = require("./routeur");
const { notFoundHandler, errorHandler } = require("./middleware");

const app = express();
const PORT = 3000;

app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/localDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connecté à MongoDB locale"))
  .catch((err) => console.error("Erreur de connexion :", err));

app.use("/products", router);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
const { DataTypes } = require("sequelize");
const db = require("../config/database");

const User = db.define("User", {
  name: { type: DataTypes.STRING, allowNull: false },
  age: { type: DataTypes.INTEGER, allowNull: false },
});

module.exports = User;
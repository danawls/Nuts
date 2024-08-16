// models/research.js
const { Model, DataTypes } = require("sequelize");
const sequelize = require("./index").sequelize;

class Research extends Model {}

Research.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Research",
  }
);

module.exports = Research;

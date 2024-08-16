const { Model, DataTypes } = require("sequelize");
const sequelize = require("./index").sequelize;

console.log("Sequelize instance in Research model:", sequelize); // 디버깅 로그 추가

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
    sequelize: sequelize, // Sequelize 인스턴스를 전달
    modelName: "Research",
  }
);

module.exports = Research;

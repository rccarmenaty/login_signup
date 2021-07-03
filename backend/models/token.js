"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Token extends Model {}
  Token.init(
    {
      token: { type: DataTypes.STRING, allowNull: false },
      uuid: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "Token",
      tableName: "token",
    }
  );
  return Token;
};

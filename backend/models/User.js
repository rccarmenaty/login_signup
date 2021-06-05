"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    toJSON() {
      return { ...this.get(), id: undefined };
    }

    matchPasswords = async function (password) {
      return await bcrypt.compare(password, this.user_password);
    };

    getSignedToken = function () {
      console.log("Signing token");
      return jwt.sign({ id: this.uuid }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
      });
    };
  }
  User.init(
    {
      uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
      user_full_name: { type: DataTypes.STRING, allowNull: false },
      user_name: { type: DataTypes.STRING, allowNull: false },
      user_email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: { msg: "Invalid email, please provide a valid email" },
        },
      },
      user_password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [6, 100],
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
    }
  );
  return User;
};

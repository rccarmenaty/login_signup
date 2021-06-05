"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Proveedor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Insumo }) {
      // define association here
      this.belongsToMany(Insumo, {
        through: "insumo_proveedor",
        as: "proveedorId",
      });
    }
    toJSON() {
      return { ...this.get(), id: undefined };
    }
  }
  Proveedor.init(
    {
      uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
      ruc: { type: DataTypes.STRING, allowNull: false },
      nombre: { type: DataTypes.STRING, allowNull: false },
      correo: { type: DataTypes.STRING, allowNull: false, unique: true },
      activo: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "Proveedor",
      tableName: "proveedor",
    }
  );
  return Proveedor;
};

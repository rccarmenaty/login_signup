"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Insumo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Proveedor, Cosecha, InsumoAplicado }) {
      // define association here
      this.belongsToMany(Proveedor, {
        through: "insumo_proveedor",
        as: "proveedor",
      });

      this.belongsToMany(Cosecha, {
        through: InsumoAplicado,
        as: "cosecha",
      });
    }
  }
  Insumo.init(
    {
      uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
      nombre: { type: DataTypes.STRING, allowNull: false },
      fuente_organica: { type: DataTypes.STRING, allowNull: false },
      ingrediente_activo: { type: DataTypes.STRING, allowNull: false },
      activo: { type: DataTypes.BOOLEAN, allowNull: false },
      tipo_insumo: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "Insumo",
      tableName: "insumo",
    }
  );
  return Insumo;
};

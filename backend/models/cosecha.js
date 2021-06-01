"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cosecha extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Insumo, InsumoAplicado }) {
      // define association here
      this.belongsToMany(Insumo, { through: InsumoAplicado, as: "cosecha_id" });
    }
  }
  Cosecha.init(
    {
      uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
      novedades: { type: DataTypes.STRING, allowNull: false },
      produccion: { type: DataTypes.STRING, allowNull: false },
      fecha_cosecha: { type: DataTypes.DATE, allowNull: false },
      fecha_molienda: { type: DataTypes.DATE, allowNull: false },
      fecha_caducidad: { type: DataTypes.DATE, allowNull: false },
      fecha_preparacion: { type: DataTypes.DATE, allowNull: false },
      fuente: { type: DataTypes.STRING, allowNull: false },
      cantidad_semillas: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: "Cosecha",
      tableName: "cosecha",
    }
  );
  return Cosecha;
};

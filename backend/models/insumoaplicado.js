"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class InsumoAplicado extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Insumo, Cosecha }) {
      // define association here
      this.belongsTo(Cosecha);
      this.belongsTo(Insumo);
    }
  }
  InsumoAplicado.init(
    {
      uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
      fecha_aplicacion: { type: DataTypes.DATE, allowNull: false },
      // insumo_id: {
      //   type: DataTypes.INTEGER,
      //   references: { model: Insumo, key: "id" },
      // },
      // cosecha_id: {
      //   type: DataTypes.INTEGER,
      //   references: { model: Cosecha, key: "id" },
      // },
    },
    {
      sequelize,
      modelName: "InsumoAplicado",
      tableName: "insumo_aplicado",
    }
  );
  return InsumoAplicado;
};

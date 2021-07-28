"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class InsumoAplicado extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Insumo, Cosecha, Proveedor }) {
      // define association here
      // this.belongsTo(Cosecha);
      // this.belongsTo(Insumo);
      this.belongsTo(Proveedor);
    }
  }
  InsumoAplicado.init(
    {
      uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
      fecha_aplicacion: { type: DataTypes.DATE, allowNull: false },
    },
    {
      sequelize,
      modelName: "InsumoAplicado",
      tableName: "insumo_aplicado",
    }
  );
  return InsumoAplicado;
};

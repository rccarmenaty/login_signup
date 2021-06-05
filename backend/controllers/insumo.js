const { Insumo } = require("../models");
const ErrorResponse = require("../utils/errorResponse");

exports.create = async (req, res, next) => {
  const { nombre, fuente_organica, ingrediente_activo, tipo_insumo, activo } =
    req.body;

  try {
    const insumo_exists = await Insumo.findOne({ where: { nombre } });

    if (insumo_exists) {
      return next(new ErrorResponse("Insumo existente"));
    }

    const insumo = await Insumo.create({
      nombre,
      fuente_organica,
      ingrediente_activo,
      tipo_insumo,
      activo,
    });
    return res.status(200).json(insumo);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.list = async (req, res, next) => {
  try {
    const insumos = await Insumo.findAll();

    return res.status(200).json(insumos);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.edit = async (req, res, next) => {
  const {
    uuid,
    nombre,
    fuente_organica,
    ingrediente_activo,
    tipo_insumo,
    activo,
  } = req.body;

  try {
    const insumo = await Insumo.findOne({ where: { uuid } });

    if (!insumo) {
      return next(new ErrorResponse("Error, insumo no encontrado"));
    }

    const insumo_modified = await Insumo.update(
      { nombre, fuente_organica, ingrediente_activo, tipo_insumo, activo },
      { where: { uuid } }
    );

    return res.status(200).json(insumo_modified);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.remove = async (req, res, next) => {
  const { uuid } = req.body;

  try {
    const proveedor_exists = await Proveedor.findOne({ where: { uuid } });
    if (!proveedor_exists) {
      return next(new ErrorResponse("Proveedor no encontrado"));
    }

    const deleted = await Proveedor.destroy({ where: { uuid } });

    res.status(200).json(deleted);
  } catch (error) {
    res.status(500).json(error);
  }
};

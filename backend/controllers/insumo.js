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
    const insumos = await Insumo.findAll({ include: ["proveedor", "cosecha"] });

    return res.status(200).json(insumos);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.edit = async (req, res, next) => {
  const uuid = req.params.uuid;

  const { nombre, fuente_organica, ingrediente_activo, tipo_insumo, activo } =
    req.body;

  try {
    const insumo = await Insumo.findOne({ where: { uuid } });

    if (!insumo) {
      return next(new ErrorResponse("Error, insumo no encontrado"));
    }

    const insumo_exists = await Insumo.findOne({ where: { nombre } });

    if (insumo_exists) {
      if (insumo_exists.uuid !== uuid)
        return next(new ErrorResponse("Insumo existente"));
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

exports.getInfo = async (req, res, next) => {
  try {
    const uuid = req.params.uuid;

    const insumo = await Insumo.findOne({
      where: { uuid },
      include: ["proveedor", "cosecha"],
    });

    return res.status(200).json(insumo);
  } catch (error) {
    next(new ErrorResponse("Error buscando Informacion de Insumo"));
  }
};

exports.remove = async (req, res, next) => {
  const uuid = req.params.uuid;

  try {
    const insumo_exists = await Insumo.findOne({ where: { uuid } });
    if (!insumo_exists) {
      return next(new ErrorResponse("Insumo no encontrado"));
    }

    const deleted = await Insumo.destroy({ where: { uuid } });

    res.status(200).json(deleted);
  } catch (error) {
    res.status(500).json(error);
  }
};

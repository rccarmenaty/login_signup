const { Lote, Cosecha } = require("../models");
const ErrorResponse = require("../utils/errorResponse");

exports.create = async (req, res, next) => {
  const { numero, activo } = req.body;

  try {
    const lote_exists = await Lote.findOne({ where: { numero } });

    if (lote_exists) {
      return next(new ErrorResponse("Lote existente"));
    }

    const lote = await Lote.create({
      numero,
      activo,
    });
    return res.status(200).json(lote);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.list = async (req, res, next) => {
  try {
    const lotes = await Lote.findAll();

    return res.status(200).json(lotes);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.edit = async (req, res, next) => {
  const { uuid, numero, activo } = req.body;

  try {
    const insumo = await Lote.findOne({ where: { uuid } });

    if (!insumo) {
      return next(new ErrorResponse("Error, lote no encontrado"));
    }

    const lote_modified = await Lote.update(
      { numero, activo },
      { where: { uuid } }
    );

    return res.status(200).json(lote_modified);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getInfo = async (req, res, next) => {
  try {
    const uuid = req.params.uuid;

    const lote = await Lote.findOne({
      where: { uuid },
      include: "cosecha",
    });

    return res.status(200).json(lote);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.remove = async (req, res, next) => {
  const { uuid } = req.body;

  try {
    const lote_exists = await Lote.findOne({ where: { uuid } });
    if (!lote_exists) {
      return next(new ErrorResponse("Lote no encontrado"));
    }

    const deleted = await Lote.destroy({ where: { uuid } });

    res.status(200).json(deleted);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.add_cosecha = async (req, res, next) => {
  const { cosecha_id, lote_id } = req.body;

  try {
    const cosecha = await Cosecha.findOne({ where: { uuid: cosecha_id } });
    if (!cosecha) return next(new ErrorResponse("Cosecha no encontrada"));

    const lote = await Lote.findOne({ where: { uuid: lote_id } });
    if (!lote) return next(new ErrorResponse("Lote no encontrado"));

    lote.addCosecha(cosecha);

    return res.status(200).json("success");
  } catch (error) {
    return res.status(500).json(error);
  }
};

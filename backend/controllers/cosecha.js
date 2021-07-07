const { Cosecha, Insumo, Proveedor, InsumoAplicado } = require("../models");
const ErrorResponse = require("../utils/errorResponse");

exports.create = async (req, res, next) => {
  const {
    novedades,
    produccion,
    fecha_cosecha,
    fecha_molienda,
    fecha_caducidad,
    fecha_preparacion,
    fuente,
    cantidad_semillas,
  } = req.body;

  try {
    const cosecha = await Cosecha.create({
      novedades,
      produccion,
      fecha_cosecha,
      fecha_molienda,
      fecha_caducidad,
      fecha_preparacion,
      fuente,
      cantidad_semillas,
    });
    return res.status(200).json(cosecha);
  } catch (error) {
    return next(new ErrorResponse("Error al crear un insumo"));
  }
};

exports.list = async (req, res, next) => {
  try {
    const cosechas = await Cosecha.findAll();

    return res.status(200).json(cosechas);
  } catch (error) {
    return next(new ErrorResponse("Error al obtener las cosechas"));
  }
};

exports.edit = async (req, res, next) => {
  const {
    uuid,
    novedades,
    produccion,
    fecha_cosecha,
    fecha_molienda,
    fecha_caducidad,
    fecha_preparacion,
    fuente,
    cantidad_semillas,
  } = req.body;

  try {
    const cosecha = await Cosecha.findOne({ where: { uuid } });

    if (!cosecha) {
      return next(new ErrorResponse("Error, cosecha no encontrado"));
    }

    const cosecha_modified = await Cosecha.update(
      {
        novedades,
        produccion,
        fecha_cosecha,
        fecha_molienda,
        fecha_caducidad,
        fecha_preparacion,
        fuente,
        cantidad_semillas,
      },
      { where: { uuid } }
    );

    return res.status(200).json(cosecha_modified);
  } catch (error) {
    return next(new ErrorResponse("Error al editar un insumo"));
  }
};

exports.remove = async (req, res, next) => {
  const { uuid } = req.body;

  try {
    const cosecha_exists = await Cosecha.findOne({ where: { uuid } });
    if (!cosecha_exists) {
      return next(new ErrorResponse("cosecha no encontrado"));
    }

    const deleted = await Cosecha.destroy({ where: { uuid } });

    res.status(200).json(deleted);
  } catch (error) {
    return next(new ErrorResponse("Error al eliminar un insumo"));
  }
};

exports.add_insumo = async (req, res, next) => {
  const { insumo_id, proveedor_id, cosecha_id, fecha_aplicacion } = req.body;

  try {
    const insumo = await Insumo.findOne({ where: { uuid: insumo_id } });
    if (!insumo) return next(new ErrorResponse("Insumo no encontrado"));

    const proveedor = await Proveedor.findOne({
      where: { uuid: proveedor_id },
    });
    if (!proveedor) return next(new ErrorResponse("Proveedor no encontrado"));

    const cosecha = await Cosecha.findOne({ where: { uuid: cosecha_id } });
    if (!cosecha) return next(new ErrorResponse("Cosecha no encontrada"));

    await cosecha.addInsumo(insumo, {
      through: { fecha_aplicacion, ProveedorId: proveedor.id },
    });

    const insumo_aplicado = await InsumoAplicado.findOne({
      where: {
        ProveedorId: proveedor.id,
        CosechaId: cosecha.id,
        InsumoId: insumo.id,
      },
    });

    return res.status(200).json(insumo_aplicado);
  } catch (error) {
    return next(new ErrorResponse("Error al agregar un insumo"));
  }
};

exports.getInfo = async (req, res, next) => {
  const uuid = req.params.uuid;

  try {
    const cosecha = await Cosecha.findOne({
      where: { uuid },
      include: ["insumo", "lote"],
    });

    return res.status(200).json(cosecha);
  } catch (error) {
    return next(new ErrorResponse("Error al obtener un insumo"));
  }
};

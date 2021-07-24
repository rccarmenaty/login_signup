const { Cosecha, Insumo, Proveedor, InsumoAplicado } = require("../models");
const ErrorResponse = require("../utils/errorResponse");

const process_insumos = async (
  cosecha,
  insumo_id,
  proveedor_id,
  fecha_aplicacion
) => {
  console.log("process", insumo_id);
  console.log("process", proveedor_id);

  try {
    const insumo = await Insumo.findOne({ where: { uuid: insumo_id } });
    const proveedor = await Proveedor.findOne({
      where: { uuid: proveedor_id },
    });

    await cosecha.addInsumo(insumo, {
      through: { fecha_aplicacion, ProveedorId: proveedor.id },
    });

    return cosecha;
  } catch (error) {
    console.log(error);
    return null;
  }
};

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
    insumo_aplicado,
  } = req.body;

  // console.log("Insumo Aplicado", insumo_aplicado);

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

    await addInsumo(cosecha.uuid, insumo_aplicado);

    return res.status(200).json(cosecha);
  } catch (error) {
    return next(new ErrorResponse("Error al crear una cosecha"));
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
  const uuid = req.params.uuid;

  try {
    const cosecha_exists = await Cosecha.findOne({ where: { uuid } });
    if (!cosecha_exists) {
      return next(new ErrorResponse("cosecha no encontrado"));
    }

    const deleted = await Cosecha.destroy({ where: { uuid } });

    res.status(200).json(deleted);
  } catch (error) {
    console.log(error);
    return next(new ErrorResponse("Error al eliminar cosecha"));
  }
};

const addInsumo = async (cosecha_id, insumos) => {
  const cosecha = await Cosecha.findOne({ where: { uuid: cosecha_id } });
  if (!cosecha) return next(new ErrorResponse("Cosecha no encontrada"));

  // console.log("addInsumo", insumos);

  try {
    const arr_insumos = [];

    insumos.forEach((obj) => {
      arr_insumos.push(
        process_insumos(
          cosecha,
          obj.insumo.uuid,
          obj.proveedores.uuid,
          obj.fecha_aplicacion
        )
      );
      // console.log(obj);
    });

    const cosecha_result = await Promise.all(arr_insumos);

    if (!cosecha_result) return next(new ErrorResponse("Error adding insumo"));

    console.log("suceces", cosecha_result);
  } catch (error) {
    console.log(error);
  }

  // try {
  //   const insumo = await Insumo.findOne({ where: { uuid: insumo_id } });
  //   if (!insumo) return next(new ErrorResponse("Insumo no encontrado"));

  //   const proveedor = await Proveedor.findOne({
  //     where: { uuid: proveedor_id },
  //   });
  //   if (!proveedor) return next(new ErrorResponse("Proveedor no encontrado"));

  //   const cosecha = await Cosecha.findOne({ where: { uuid: cosecha_id } });
  //   if (!cosecha) return next(new ErrorResponse("Cosecha no encontrada"));

  //   await cosecha.addInsumo(insumo, {
  //     through: { fecha_aplicacion, ProveedorId: proveedor.id },
  //   });

  //   const insumo_aplicado = await InsumoAplicado.findOne({
  //     where: {
  //       ProveedorId: proveedor.id,
  //       CosechaId: cosecha.id,
  //       InsumoId: insumo.id,
  //     },
  //   });

  // return res.status(200).json("testing");
  // } catch (error) {
  //   return next(new ErrorResponse("Error al agregar un insumo"));
  // }
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

const { Proveedor, Insumo } = require("../models");
const ErrorResponse = require("../utils/errorResponse");

exports.create = async (req, res, next) => {
  const { ruc, nombre, correo, activo } = req.body;

  try {
    const proveedor_exists = await Proveedor.findOne({ where: { correo } });

    if (proveedor_exists) {
      return next(new ErrorResponse("Correo electronico en uso"));
    }

    const proveedor = await Proveedor.create({
      ruc,
      nombre,
      correo,
      activo,
    });
    return res.status(200).json(proveedor);
  } catch (error) {
    console.log(error);
    return next(
      new ErrorResponse("Error accessing database, Create Proveedor")
    );
  }
};

exports.list = async (req, res, next) => {
  try {
    const proveedores = await Proveedor.findAll();

    return res.status(200).json(proveedores);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.edit = async (req, res, next) => {
  const { uuid, correo, ruc, nombre, activo } = req.body;

  try {
    const proveedor = await Proveedor.findOne({ where: { uuid } });

    if (!proveedor) {
      return next(new ErrorResponse("Error, usuario no encontrado"));
    }

    const proveedor_modified = await Proveedor.update(
      { ruc, nombre, activo },
      { where: { uuid } }
    );

    return res.status(200).json(proveedor_modified);
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

exports.add_insumo = async (req, res, next) => {
  const { uuid, insumos_id } = req.body;

  try {
    const proveedor = await Proveedor.findOne({ where: { uuid } });
    if (!proveedor) return next(new ErrorResponse("Proveedor no encontrado"));

    for (insumo_id in insumos_id) {
      const retrieved = await Insumo.findOne({ where: { uuid: insumo_id } });

      if (!retrieved) {
        return next(new ErrorResponse("Insumo no encontrado"));
      }
      // await proveedor.addInsumo(retrieved);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

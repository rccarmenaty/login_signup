const { Proveedor, Insumo } = require("../models");
const _ = require("lodash");
const ErrorResponse = require("../utils/errorResponse");

const get_insumo = async (insumo_id) => {
  try {
    const insumo = await Insumo.findOne({ where: { uuid: insumo_id } });

    return insumo;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const add_Insumo = async (uuid, insumos_id) => {
  try {
    const proveedor = await Proveedor.findOne({ where: { uuid } });
    if (!proveedor) return next(new ErrorResponse("Proveedor no encontrado"));

    const arr = [];

    const ids = _.values(insumos_id);

    ids.forEach((id) => {
      arr.push(get_insumo(id));
    });

    const result = await Promise.all(arr);

    if (!result) return next(new ErrorResponse("Error adding insumo"));
    await proveedor.addInsumo(result);
  } catch (error) {
    return next(new ErrorResponse("Error adding insumo"));
  }
};

const removeInsumo = async (uuid, insumos_id) => {
  try {
    const proveedor = await Proveedor.findOne({ where: { uuid } });
    if (!proveedor) return next(new ErrorResponse("Proveedor no encontrado"));

    const arr = [];

    const ids = _.values(insumos_id);

    ids.forEach((id) => {
      arr.push(get_insumo(id));
    });

    const result = await Promise.all(arr);

    await proveedor.removeInsumo(result);
    return true;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.create = async (req, res, next) => {
  const { ruc, nombre, correo, activo, insumos_id } = req.body;

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

    if (insumos_id) await add_Insumo(proveedor.uuid, insumos_id);

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
  const { ruc, nombre, correo, activo, insumos_id } = req.body;
  const uuid = req.params.uuid;

  try {
    let proveedor = await Proveedor.findOne({
      where: { uuid },
      include: "insumo",
    });

    if (!proveedor) {
      return next(new ErrorResponse("Error, usuario no encontrado"));
    }

    const proveedor_exists = await Proveedor.findOne({ where: { correo } });

    if (proveedor_exists) {
      if (proveedor_exists.uuid !== uuid)
        return next(new ErrorResponse("Correo electronico en uso"));
    }

    await removeInsumo(
      uuid,
      proveedor.insumo.map((ins) => ins.uuid)
    );

    const proveedor_modified = await Proveedor.update(
      { ruc, nombre, activo, correo },
      { where: { uuid } }
    );

    if (insumos_id) await add_Insumo(uuid, insumos_id);

    return res.status(200).json(proveedor_modified);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.remove = async (req, res, next) => {
  const uuid = req.params.uuid;

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
    await add_Insumo(uuid, insumos_id);

    res.status(200).json("success");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.remove_insumo = async (req, res, next) => {
  const { uuid, insumos_id } = req.body;

  try {
    await removeInsumo(uuid, insumos_id);

    res.status(200).json("success");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.getInfo = async (req, res, next) => {
  try {
    const uuid = req.params.uuid;

    const proveedor = await Proveedor.findOne({
      where: { uuid },
      include: "insumo",
    });

    res.status(200).json(proveedor);
  } catch (error) {
    console.log("ERRORR", JSON.stringify(error.message));
    return next(
      new ErrorResponse("error obteniendo informacion desde la base de datos")
    );
  }
};

const { Proveedor } = require("../models");
const ErrorResponse = require("../utils/errorResponse");

exports.createProveedor = async (req, res, next) => {
  const { ruc, nombre, correo, activo } = req.body;

  try {
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
    return next(new ErrorResponse("Error accessing database, List Proveedor"));
  }
};

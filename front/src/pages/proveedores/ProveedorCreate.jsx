import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router";
import TransferList from "../../components/transferlist/TransferList";
import "./proveedorCreate.css";
import axios from "axios";
import { ProveedorContext } from "../../context/ProveedorContext";
import { InsumoContext } from "../../context/InsumoContext";

export default function ProveedorCreate() {
  const history = useHistory();
  const { addOne } = useContext(ProveedorContext);
  const { prov } = useContext(InsumoContext);
  const [ruc, setRuc] = useState("");
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [activo, setActivo] = useState(false);
  const [insumos_id, setInsumosIds] = useState([]);
  const [error, setError] = useState("");

  const getIds = (array) => {
    return array.map((ins) => ins.uuid);
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      const newProv = await addOne({
        ruc,
        nombre,
        correo,
        activo,
        insumos_id: right.map((ins) => ins.uuid),
      });
      if (newProv) history.push("/proveedor");
    } catch (error) {
      console.log(error);
    }
  };

  const selectHandler = (left, right) => {
    console.log("left", left);
    console.log("right", right);
  };

  useEffect(() => {
    console.log("left", left);
    console.log("right", getIds(right));
  });

  const [left, setLeft] = useState(prov.list);
  const [right, setRight] = useState([]);

  return (
    <div className="page">
      <div className="wrapper">
        <div className="right">
          <div>
            <div className="seccionHeader">
              <h2>Crear Proveedor</h2>
            </div>
            <form onSubmit={handleCreate}>
              <div>
                <label className="form-label" htmlFor="ruc">
                  RUC
                </label>
                <input
                  type="text"
                  required
                  id="ruc"
                  placeholder="Escriba el RUC"
                  value={ruc}
                  onChange={(e) => setRuc(e.target.value)}
                />
              </div>
              <div className="input-container">
                <label className="form-label" htmlFor="nombre">
                  Nombre
                </label>
                <input
                  type="text"
                  required
                  id="nombre"
                  placeholder="Escriba el nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>
              <div className="input-container email">
                <label className="form-label" htmlFor="correo">
                  Correo
                </label>
                <input
                  type="email"
                  required
                  id="correo"
                  placeholder="Escriba el correo"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                />
              </div>
              <div className="input-container">
                <label className="form-label" htmlFor="activo">
                  Activo
                </label>
                <input
                  type="checkbox"
                  id="activo"
                  value={activo}
                  onChange={(e) => setActivo(e.target.checked)}
                />
              </div>
              <div className="buttonWrapperCenter">
                <button
                  className="signup-btn buttonMarginVertical"
                  type="submit"
                >
                  Crear
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="right">
          <div>
            <div className="seccionHeader">
              <h3>Seleccione Insumos</h3>
            </div>
            <TransferList
              left={left}
              setLeft={setLeft}
              right={right}
              setRight={setRight}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router";
import TransferList from "../../components/transferlist/TransferList";
import "./proveedorCreate.css";
import { ProveedorContext } from "../../context/ProveedorContext";
import { InsumoContext } from "../../context/InsumoContext";
import useForm from "../../components/useForm/useForm";
import validate from "../../components/useForm/validate";

export default function ProveedorCreate() {
  const history = useHistory();
  const { addOne } = useContext(ProveedorContext);
  const { ins } = useContext(InsumoContext);
  const [activo, setActivo] = useState(false);
  const [left, setLeft] = useState(ins.list);
  const [right, setRight] = useState([]);

  const params = {
    ruc: { value: "", type: "text", title: "RUC" },
    nombre: { value: "", type: "text", title: "Nombre" },
    correo: { value: "", type: "email", title: "Correo electrónico" },
  };

  const {
    handleChange,
    form,
    handleSubmit,
    errors,
    setError,
    submitting,
    setSubmitting,
  } = useForm(params, validate);

  const createProveedor = async () => {
    // console.log(right); return;
    try {
      const newProv = await addOne({
        ruc: form.ruc.value,
        nombre: form.nombre.value,
        correo: form.correo.value,
        activo,
        insumos_id: right.map((ins) => ins.uuid),
      });
      if (newProv) history.push("/proveedor");
    } catch (error) {
      setError({ serverError: error.message });
    }
  };

  useEffect(() => {
    if (submitting) {
      setSubmitting(false);
      if (Object.keys(errors).length > 0) return;
      createProveedor();
    }
  }, [submitting]);

  const handleCreate = async (e) => {
    e.preventDefault();
    handleSubmit(e);
  };

  return (
    <div className="page">
      <div className="wrapper">
        <div className="right">
          <div>
            <div className="seccionHeader">
              <h2>Crear Proveedor</h2>
            </div>
            <form onSubmit={handleCreate}>
              <div className="input-container">
                <label className="form-label" htmlFor="ruc">
                  RUC
                </label>
                <input
                  type="text"
                  name="ruc"
                  id="ruc"
                  placeholder="Escriba el RUC"
                  value={form.ruc.value}
                  onChange={(e) => handleChange(e)}
                />
                <div className="error">{errors.ruc}</div>
              </div>
              <div className="input-container">
                <label className="form-label" htmlFor="nombre">
                  Nombre
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  placeholder="Escriba el nombre"
                  value={form.nombre.value}
                  onChange={(e) => handleChange(e)}
                />
                <div className="error">{errors.nombre}</div>
              </div>
              <div className="input-container email">
                <label className="form-label" htmlFor="correo">
                  Correo
                </label>
                <input
                  type="text"
                  id="correo"
                  name="correo"
                  placeholder="Escriba el correo"
                  value={form.correo.value}
                  onChange={(e) => handleChange(e)}
                />
                <div className="error">{errors.correo}</div>
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
              <div className="error">{errors.serverError}</div>

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

import React, { useState, useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { InsumoContext } from "../../context/InsumoContext";

import useForm from "../../components/useForm/useForm";
import validate from "../../components/useForm/validate";
import SimpleSelect from "../../components/select/SimpleSelect";

export default function InsumoEdit() {
  let history = useHistory();
  const { editInsumo, ins, getInsumo } = useContext(InsumoContext);
  const [tipo_insumo, setTipoInsumo] = useState("");
  const [activo, setActivo] = useState(false);
  let { uuid } = useParams();

  const tipoInsumoOptions = ["tipo 1", "tipo 2", "tipo 4", "tipo 5"];

  const params = {
    nombre: { value: "", type: "text", title: "Nombre" },
    fuente_organica: { value: "", type: "text", title: "Fuente Orgánica" },
    ingrediente_activo: {
      value: "",
      type: "text",
      title: "Ingrediente Activo",
    },
  };

  const {
    handleChange,
    form,
    handleSubmit,
    errors,
    setError,
    submitting,
    setSubmitting,
    setValues,
  } = useForm(params, validate);

  const performEdit = async () => {
    try {
      const newIns = await editInsumo(uuid, {
        nombre: form.nombre.value,
        fuente_organica: form.fuente_organica.value,
        ingrediente_activo: form.ingrediente_activo.value,
        tipo_insumo,
        activo,
      });
      if (newIns) history.push("/insumo");
    } catch (error) {
      setError({ serverError: error.message });
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    handleSubmit(e);
  };

  useEffect(() => {
    if (submitting) {
      console.log("Submiting");
      setSubmitting(false);
      if (Object.keys(errors).length > 0) {
        console.log(errors);
        return;
      }
      performEdit();
    }
  }, [submitting]);

  useEffect(() => {
    getInsumo(uuid);
  }, []);

  useEffect(() => {
    if (!ins.current || Object.keys(ins.current).length === 0) return;
    let values = {
      nombre: { value: ins.current.nombre, type: "text", title: "RUC" },
      fuente_organica: {
        value: ins.current.fuente_organica,
        type: "text",
        title: "Fuente Orgánica",
      },
      ingrediente_activo: {
        value: ins.current.ingrediente_activo,
        type: "text",
        title: "Ingrediente Activo",
      },
      activo: { value: ins.current.activo, type: "text", title: "Nombre" },
    };

    setValues(values);
    setActivo(ins.current.activo);
    setTipoInsumo(ins.current.tipo_insumo);
  }, [ins]);

  return (
    <div className="page">
      <div className="wrapper">
        <div className="right">
          <div>
            <div className="seccionHeader">
              <h2>Modificar Insumo</h2>
            </div>
            <form onSubmit={handleCreate}>
              <div className="input-container ">
                <label className="form-label" htmlFor="nombre">
                  Nombre
                </label>
                <input
                  type="text"
                  name="nombre"
                  id="nombre"
                  value={form.nombre.value}
                  onChange={(e) => handleChange(e)}
                />
                <div className="error">{errors.nombre}</div>
              </div>
              <div>
                <label className="form-label" htmlFor="fuente_organica">
                  Fuente Orgánica
                </label>
                <input
                  type="text"
                  name="fuente_organica"
                  id="fuente_organica"
                  value={form.fuente_organica.value}
                  onChange={(e) => handleChange(e)}
                />
                <div className="error">{errors.fuente_organica}</div>
              </div>
              <div className="input-container ">
                <label className="form-label" htmlFor="ingrediente_activo">
                  Ingrediente Activo
                </label>
                <input
                  type="text"
                  id="ingrediente_activo"
                  name="ingrediente_activo"
                  value={form.ingrediente_activo.value}
                  onChange={(e) => handleChange(e)}
                />
                <div className="error">{errors.ingrediente_activo}</div>
              </div>
              <div className="input-container ">
                {/* <div>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">
                      Tipo de Insumo
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={tipo_insumo}
                      onChange={(e) => setTipoInsumo(e.target.value)}
                    >
                      <MenuItem key="tipo1" value={"tipo1"}>
                        Tipo 1
                      </MenuItem>
                      <MenuItem key="tipo2" value={"tipo2"}>
                        Tipo 2
                      </MenuItem>
                      <MenuItem key="tipo3" value={"tipo3"}>
                        Tipo 3
                      </MenuItem>
                    </Select>
                  </FormControl>
                </div> */}
                <SimpleSelect
                  title="Tipo de Insumo"
                  value={tipo_insumo}
                  setValue={setTipoInsumo}
                  values={tipoInsumoOptions}
                />
              </div>
              <div className="input-container">
                <label className="form-label" htmlFor="activo">
                  Activo
                </label>
                <input
                  type="checkbox"
                  id="activo"
                  checked={activo}
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
                  Modificar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

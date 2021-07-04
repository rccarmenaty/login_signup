import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router";
import "./insumoCreate.css";
import { InsumoContext } from "../../context/InsumoContext";

import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import useForm from "../../components/useForm/useForm";
import validate from "../../components/useForm/validate";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function InsumoCreate() {
  const classes = useStyles();
  const history = useHistory();
  const { addOne } = useContext(InsumoContext);
  const [tipo_insumo, setTipoInsumo] = useState("");
  const [activo, setActivo] = useState(false);

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
  } = useForm(params, validate);

  const createInsumo = async () => {
    try {
      const newIns = await addOne({
        nombre: form.nombre.value,
        fuente_organica: form.fuente_organica.value,
        ingrediente_activo: form.ingrediente_activo.value,
        tipo_insumo,
        activo,
      });
      if (newIns) history.push("/insumo");
    } catch (error) {
      setError({ serverError: error.message });
      console.log(error.message);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    handleSubmit(e);

    // try {
    //   const newProv = await addOne({
    //     nombre,
    //     fuente_organica,
    //     ingrediente_activo,
    //     tipo_insumo,
    //     activo,
    //   });
    //   if (newProv) history.push("/insumo");
    // } catch (error) {
    //   setError(error.response.data.error);
    // }
  };

  useEffect(() => {
    if (submitting) {
      setSubmitting(false);
      if (Object.keys(errors).length > 0) return;
      createInsumo();
    }
  }, [submitting]);

  return (
    <div className="page">
      <div className="wrapper">
        <div className="right">
          <div>
            <div className="seccionHeader">
              <h2>Crear Insumo</h2>
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
                <div>
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
                      <MenuItem value={"tipo1"}>Tipo 1</MenuItem>
                      <MenuItem value={"tipo2"}>Tipo 2</MenuItem>
                      <MenuItem value={"tipo3"}>Tipo 3</MenuItem>
                    </Select>
                  </FormControl>
                </div>
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
      </div>
    </div>
  );
}

import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router";
import TransferList from "../../components/transferlist/TransferList";
import "./insumoCreate.css";
import { InsumoContext } from "../../context/InsumoContext";

import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

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
  const [nombre, setNombre] = useState("");
  const [fuente_organica, setFuenteOrganica] = useState("");
  const [ingrediente_activo, setIngredienteActivo] = useState("");
  const [tipo_insumo, setTipoInsumo] = useState("");
  const [activo, setActivo] = useState(false);

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      const newProv = await addOne({
        nombre,
        fuente_organica,
        ingrediente_activo,
        tipo_insumo,
        activo,
      });
      if (newProv) history.push("/insumo");
    } catch (error) {}
  };

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
                  required
                  id="nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>
              <div>
                <label className="form-label" htmlFor="fuente_organica">
                  Fuente Orgánica
                </label>
                <input
                  type="text"
                  required
                  id="fuente_organica"
                  value={fuente_organica}
                  onChange={(e) => setFuenteOrganica(e.target.value)}
                />
              </div>
              <div className="input-container ">
                <label className="form-label" htmlFor="ingrediente_activo">
                  Ingrediente Activo
                </label>
                <input
                  type="text"
                  required
                  id="ingrediente_activo"
                  value={ingrediente_activo}
                  onChange={(e) => setIngredienteActivo(e.target.value)}
                />
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
                      required
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

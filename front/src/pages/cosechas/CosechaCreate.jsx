import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { CosechaContext } from "../../context/CosechaContext";
import { InsumoContext } from "../../context/InsumoContext";
import "./cosechaCreate.css";
import MultipleSelect from "../../components/select/MultipleSelect";
import useForm from "../../components/useForm/useForm";
import validate from "../../components/useForm/validate";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import InsumoProveedorLine from "./InsumoProveedorLine";

export default function CosechaCreate() {
  const history = useHistory();
  const { addOne } = useContext(CosechaContext);
  const { ins, getOne } = useContext(InsumoContext);
  const [fecha_cosecha, setFecha_cosecha] = useState(new Date());
  const [fecha_molienda, setFecha_molienda] = useState(new Date());
  const [fecha_caducidad, setFecha_caducidad] = useState(new Date());
  const [fecha_preparacion, setFecha_preparacion] = useState(new Date());

  const [insumoValue, setInsumoValue] = useState("");
  const [proveedoresValue, setProveedoresValue] = useState([]);
  const [insumoList, setInsumoList] = useState([]);

  const [insumo_proveedor, setInsumo_proveedor] = useState([]);

  const [insumort, setInsumort] = useState("");
  const [proveedoresrt, setProveedoresrt] = useState([]);

  useEffect(() => {
    setInsumort(insumoValue);
    setProveedoresrt([]);
    setProveedoresValue([]);
  }, [insumoValue]);

  useEffect(() => {
    // setInsumort(insumoValue);
    setProveedoresrt(proveedoresValue);
  }, [proveedoresValue]);

  useEffect(() => {
    setInsumoList(ins.list);
  });

  useEffect(() => {
    if (insumoList) {
      let found = insumoList.find((el) => el.nombre === insumoValue.nombre);
      console.log(found);
      if (found) getOne(found.uuid);
    }
  }, [insumoValue]);

  const params = {
    novedades: { value: "", type: "text", title: "Novedades" },
    produccion: { value: "", type: "text", title: "Producción" },

    fuente: { value: "", type: "text", title: "Fuente" },
    cantidad_semillas: {
      value: "",
      type: "number",
      title: "Cantidad de semillas",
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

  // const createCosecha = async () => {
  //   try {
  //     const newIns = await addOne({
  //       nombre: form.nombre.value,
  //       fuente_organica: form.fuente_organica.value,
  //       ingrediente_activo: form.ingrediente_activo.value,
  //       tipo_insumo,
  //       activo,
  //     });
  //     if (newIns) history.push("/insumo");
  //   } catch (error) {
  //     setError({ serverError: error.message });
  //     console.log(error.message);
  //   }
  // };

  const handleCreate = async (e) => {
    e.preventDefault();

    handleSubmit(e);
  };

  useEffect(() => {
    if (submitting) {
      setSubmitting(false);
      if (Object.keys(errors).length > 0) return;
      // createCosecha();
    }
  }, [submitting]);

  const handleAddInsumo = (e) => {
    setInsumo_proveedor([
      ...insumo_proveedor,
      { insumo: insumoValue, proveedores: proveedoresValue },
    ]);
  };

  return (
    <div className="page">
      <div className="wrapper">
        <div className="right">
          <div>
            <div className="seccionHeader">
              <h2>Crear Cosecha</h2>
            </div>
            <form onSubmit={handleCreate}>
              <div className="input-container ">
                <label className="form-label" htmlFor="novedades">
                  Novedades
                </label>
                <input
                  type="text"
                  multiple
                  name="novedades"
                  id="novedades"
                  value={form.novedades.value}
                  onChange={(e) => handleChange(e)}
                />
                <div className="error">{errors.novedades}</div>
              </div>
              <div>
                <label className="form-label" htmlFor="produccion">
                  Producción
                </label>
                <input
                  type="text"
                  name="produccion"
                  id="produccion"
                  value={form.produccion.value}
                  onChange={(e) => handleChange(e)}
                />
                <div className="error">{errors.produccion}</div>
              </div>
              <div className="input-container ">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    disableFuture
                    margin="normal"
                    id="date-picker-dialog"
                    label="Fecha de cosecha"
                    format="MM/dd/yyyy"
                    value={fecha_cosecha}
                    onChange={setFecha_cosecha}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                  <KeyboardDatePicker
                    disableToolbar
                    disableFuture
                    margin="normal"
                    id="date-picker-dialog"
                    label="Fecha de molienda"
                    format="MM/dd/yyyy"
                    value={fecha_molienda}
                    onChange={setFecha_molienda}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                  <KeyboardDatePicker
                    disableToolbar
                    lang="spanish"
                    margin="normal"
                    id="date-picker-dialog"
                    label="Fecha de caducidad"
                    format="MM/dd/yyyy"
                    value={fecha_caducidad}
                    onChange={setFecha_caducidad}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                  <KeyboardDatePicker
                    disableToolbar
                    disableFuture
                    margin="normal"
                    id="date-picker-dialog"
                    label="Fecha de preparacion"
                    format="MM/dd/yyyy"
                    value={fecha_preparacion}
                    onChange={setFecha_preparacion}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>
                <div className="error">{errors.fecha_cosecha}</div>
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
        <div className="right-info-section">
          <div className="margin-top-40">
            <div className="seccionHeader">
              <h3>Seleccione Insumos</h3>
            </div>
            {ins && ins.list && (
              <div className="margin-top-40">
                <div className="selectWrapper">
                  <MultipleSelect
                    insumos={insumoList}
                    insumoValue={insumoValue}
                    setInsumoValue={setInsumoValue}
                    proveedores={ins.current.proveedor}
                    proveedoresValue={proveedoresValue}
                    setProveedoresValue={setProveedoresValue}
                  />
                </div>
                {insumort && (
                  <InsumoProveedorLine
                    insumo={insumort.nombre}
                    proveedores={proveedoresrt}
                    action={handleAddInsumo}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { CosechaContext } from "../../context/CosechaContext";
import { InsumoContext } from "../../context/InsumoContext";
import "./cosechaCreate.css";
import MultipleSelect from "../../components/select/MultipleSelect";
import useForm from "../../components/useForm/useForm";
import validate from "../../components/useForm/validate";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import InsumoProveedorLine from "./InsumoProveedorLine";
import InsumoProveedorLineSelected from "./InsumoProveedorLineSelected";

export default function CosechaCreate() {
  const history = useHistory();
  const { addCosecha } = useContext(CosechaContext);
  const { ins, getInsumo, resetCurrent, list } = useContext(InsumoContext);
  const [fecha_cosecha, setFecha_cosecha] = useState(new Date());
  const [fecha_molienda, setFecha_molienda] = useState(new Date());
  const [fecha_caducidad, setFecha_caducidad] = useState(new Date());
  const [fecha_preparacion, setFecha_preparacion] = useState(new Date());
  const [fecha_aplicacion, setFecha_aplicacion] = useState(new Date());

  const [infoLines, setInfoLines] = useState([]);

  const [insumoValue, setInsumoValue] = useState("");
  const [proveedoresValue, setProveedoresValue] = useState("");
  const [insumoList, setInsumoList] = useState([]);
  const [proveedoresList, setProveedoresList] = useState([]);
  const [insumoSelected, setInsumoSelected] = useState([]);

  const [insumort, setInsumort] = useState("");
  const [proveedoresrt, setProveedoresrt] = useState("");

  useEffect(() => {
    try {
      list();
    } catch (error) {
      //console.log(error);
    }
  }, []);

  useEffect(() => {
    setInsumort(insumoValue);
    setProveedoresrt("");
    setProveedoresValue("");
  }, [insumoValue]);

  useEffect(() => {
    setProveedoresrt(proveedoresValue);
  }, [proveedoresValue]);

  useEffect(() => {
    let arr = ins.list.filter((el) => el.proveedor && el.proveedor.length > 0);
    setInsumoList(arr.sort((el1, el2) => el1.nombre > el2.nombre));
  }, [ins.list]);

  useEffect(() => {
    setProveedoresList(ins.current.proveedor);
  }, [ins.current]);

  useEffect(() => {
    if (insumoList) {
      let found = insumoList.find((el) => el.nombre === insumoValue.nombre);
      if (found) getInsumo(found.uuid);
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

  const createCosecha = async () => {
    //console.log(infoLines);
    try {
      const cosecha = await addCosecha({
        novedades: form.novedades.value,
        produccion: form.produccion.value,
        fecha_cosecha,
        fecha_molienda,
        fecha_caducidad,
        fecha_preparacion,
        fuente: form.fuente.value,
        cantidad_semillas: form.cantidad_semillas.value,
        insumo_aplicado: infoLines,
      });
      if (cosecha) history.push("/cosecha");
    } catch (error) {
      setError({ serverError: error.message });
      //console.log(error.message);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    //console.log(infoLines);
    handleSubmit(e);
  };

  useEffect(() => {
    if (submitting) {
      setSubmitting(false);
      if (Object.keys(errors).length > 0) return;
      createCosecha();
    }
  }, [submitting]);

  const handleAddInsumo = (nombre) => {
    if (proveedoresValue.length === 0) return;
    setInfoLines([
      ...infoLines,
      { insumo: insumort, proveedores: proveedoresrt, fecha_aplicacion },
    ]);
    setInsumort(false);
    const insumo = insumoList.find((obj) => obj.nombre === nombre);
    setInsumoList(
      insumoList
        .filter((el) => el.nombre !== nombre)
        .sort((el1, el2) => el1.nombre > el2.nombre)
    );
    setInsumoSelected([...insumoSelected, insumo]);
    setProveedoresList([]);
    setInsumoValue("");
  };

  const handleDelInsumo = (nombre) => {
    setInfoLines(infoLines.filter((el) => el.insumo.nombre !== nombre));
    const insumo = insumoSelected.find((obj) => obj.nombre === nombre);
    setInsumoSelected(insumoSelected.filter((el) => el.nombre !== nombre));
    setInsumoList(
      [...insumoList, insumo].sort((el1, el2) => el1.nombre > el2.nombre)
    );
    resetCurrent();
    setInsumoValue("");
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
              <div className="input-container ">
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
                  <DatePicker
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
                  <DatePicker
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
                  <DatePicker
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
                  <DatePicker
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
          <div className="seccionHeader">
            <h2 className="hidden">.</h2>
          </div>
          <div>
            <div className="input-container">
              <label className="form-label" htmlFor="fuente">
                Fuente
              </label>
              <input
                type="text"
                multiple
                name="fuente"
                id="fuente"
                value={form.fuente.value}
                onChange={(e) => handleChange(e)}
              />
              <div className="error">{errors.fuente}</div>
            </div>
            <div className="input-container ">
              <label className="form-label" htmlFor="cantidad_semillas">
                Cantidad de Semillas
              </label>
              <input
                type="text"
                name="cantidad_semillas"
                id="cantidad_semillas"
                value={form.cantidad_semillas.value}
                onChange={(e) => handleChange(e)}
              />
              <div className="error">{errors.cantidad_semillas}</div>
            </div>
            <div className="seccionHeader">
              <h3>Seleccione Insumos</h3>
            </div>
            {ins && ins.list && (
              <div>
                <div className="selectWrapper">
                  <MultipleSelect
                    insumos={insumoList}
                    insumoValue={insumoValue}
                    setInsumoValue={setInsumoValue}
                    proveedores={proveedoresList}
                    proveedoresValue={proveedoresValue}
                    setProveedoresValue={setProveedoresValue}
                  />
                </div>
                {infoLines.map((el) => {
                  return (
                    <InsumoProveedorLineSelected
                      insumo={el.insumo.nombre}
                      proveedores={el.proveedores}
                      fecha={el.fecha_aplicacion}
                      action={handleDelInsumo}
                    />
                  );
                })}
                {insumort && (
                  <InsumoProveedorLine
                    insumo={insumort.nombre}
                    proveedores={proveedoresrt}
                    fecha_aplicacion={fecha_aplicacion}
                    setFecha_aplicacion={setFecha_aplicacion}
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

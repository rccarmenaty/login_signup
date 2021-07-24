import { useEffect, useState } from "react";
import "./insumoProveedorLine.css";
import AddCircle from "@material-ui/icons/AddCircle";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";

const defaultMaterialTheme = createMuiTheme({
  spacing: 2,
});

export default function InsumoProveedorLine({
  insumo,
  proveedores,
  action,
  fecha_aplicacion,
  setFecha_aplicacion,
}) {
  const [ins, setIns] = useState("");
  const [provList, setProvList] = useState(null);

  useEffect(() => {
    setProvList(proveedores);
  }, [proveedores]);

  useEffect(() => {
    setIns(insumo);
  }, [insumo]);

  const handleClick = (e) => {
    action(ins);
  };

  return (
    <div className="lineContainer">
      <div className="lineInsumo">
        <span>{ins}</span>
      </div>
      <div className="lineProveedores">
        {provList && <span>{provList.nombre}</span>}
      </div>
      <div className="lineDate edit">
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <ThemeProvider theme={defaultMaterialTheme}>
            <DatePicker
              disableFuture
              margin="dense"
              id="date-picker-dialog"
              label="Fecha"
              format="MM/dd/yyyy"
              value={fecha_aplicacion}
              onChange={setFecha_aplicacion}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </ThemeProvider>
        </MuiPickersUtilsProvider>
      </div>
      <div className="lineAdd">
        <AddCircle className="add" fontSize="large" onClick={handleClick} />
      </div>
    </div>
  );
}

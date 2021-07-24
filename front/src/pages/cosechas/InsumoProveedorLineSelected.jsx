import { useEffect, useState } from "react";
import "./insumoProveedorLine.css";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";

export default function InsumoProveedorLine({
  insumo,
  proveedores,
  action,
  fecha,
}) {
  const [ins, setIns] = useState("");
  const [provList, setProvList] = useState([]);

  useEffect(() => {
    setIns(insumo);
    setProvList(proveedores);
  }, [insumo, proveedores]);

  const handleClick = (e) => {
    action(ins);
  };

  return (
    <div className="lineContainer shadow selected">
      <div className="lineInsumo">
        <span>{ins}</span>
      </div>
      <div className="lineProveedores">
        <span>{provList.nombre}</span>
      </div>
      <div className="lineDate">
        <span>{new Date(fecha).toLocaleDateString()}</span>
      </div>
      <div className="lineAdd">
        {" "}
        <RemoveCircleIcon
          className="add"
          fontSize="large"
          onClick={handleClick}
        />
      </div>
    </div>
  );
}

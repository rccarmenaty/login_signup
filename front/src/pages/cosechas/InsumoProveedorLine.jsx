import { useEffect, useState } from "react";
import "./insumoProveedorLine.css";
import AddCircle from "@material-ui/icons/AddCircle";

export default function InsumoProveedorLine({ insumo, proveedores, action }) {
  const [ins, setIns] = useState("");
  const [provList, setProvList] = useState([]);

  useEffect(() => {
    setIns(insumo);
    setProvList(proveedores);
  }, [insumo, proveedores]);

  return (
    <div className="lineContainer">
      <div className="lineInsumo">
        <span>{ins}</span>
      </div>
      <div className="lineProveedores">
        {provList.map((el) => (
          <span>{el.nombre}</span>
        ))}
      </div>
      <div className="lineAdd">
        {" "}
        <AddCircle className="add" fontSize="large" onClick={action} />
      </div>
    </div>
  );
}

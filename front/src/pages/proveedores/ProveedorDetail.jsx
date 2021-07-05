import "./proveedorDetail.css";
import { useEffect, useState, useContext } from "react";
import { ProveedorContext } from "../../context/ProveedorContext";
import { useParams, Link } from "react-router-dom";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";

export default function ProveedorDetail() {
  const [proveedor, setProveedor] = useState(null);
  const [error, setError] = useState("");
  let { uuid } = useParams();
  const { getOne, prov } = useContext(ProveedorContext);

  useEffect(() => {
    getOne(uuid);
  }, []);

  useEffect(() => {
    setProveedor(prov.current);
    console.log(prov.current)
  }, [prov]);

  return (
    <div className="detail">
      {proveedor && (
        <div className="infoDisplay">
          <div className="infoLeft shadow">
            <div className="infoTitle">
              <h2>Detalles</h2>
            </div>
            <div className="infoWrapper">
              <div className="infoItem">
                <label htmlFor="ruc" className="infoLabel">
                  RUC
                </label>
                <span id="ruc" className="infoValue">
                  {proveedor.ruc}
                </span>
              </div>
              <div className="infoItem">
                <label htmlFor="nombre" className="infoLabel">
                  Nombre
                </label>
                <span id="nombre" className="infoValue">
                  {proveedor.nombre}
                </span>
              </div>
              <div className="infoItem">
                <label htmlFor="correo" className="infoLabel">
                  Correo Electrónico
                </label>
                <span id="correo" className="infoValue">
                  {proveedor.correo}
                </span>
              </div>
              <div className="infoItem">
                <label htmlFor="activo" className="infoLabel">
                  Activo
                </label>
                <span id="activo" className="infoValue">
                  {proveedor.activo ? (
                    <CheckIcon style={{ color: "green" }} />
                  ) : (
                    <CloseIcon style={{ color: "red" }} />
                  )}
                </span>
              </div>
            </div>
          </div>
          <div className="infoRight shadow">
            <div className="infoTitle">
              <h3>Insumos</h3>
            </div>
            <div className="infoWrapper">
              <ul>
                {proveedor.insumo &&
                  proveedor.insumo.map((insumo) => (
                    <li key={proveedor.insumo.uuid}>
                      <Link to={`/insumo/detail/${insumo.uuid}`}>
                        {insumo.nombre}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

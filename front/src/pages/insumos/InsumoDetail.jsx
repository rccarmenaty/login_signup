import { useEffect, useState, useContext } from "react";
import { InsumoContext } from "../../context/InsumoContext";
import { useParams, Link, useHistory } from "react-router-dom";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import ErrorIcon from "@material-ui/icons/Error";

export default function InsumoDetail() {
  const [insumo, setInsumo] = useState(null);
  const [error, setError] = useState("");
  let { uuid } = useParams();
  const { getOne, ins } = useContext(InsumoContext);

  useEffect(() => {
    try {
      getOne(uuid);
    } catch (error) {
      setError(error.message);
    }
  }, []);

  useEffect(() => {
    setInsumo(ins.current);
    console.log(insumo);
  });

  return (
    <div className="detail">
      {insumo && (
        <div className="infoDisplay">
          <div className="infoLeft shadow">
            <div className="infoTitle">
              <h2>Detalles</h2>
            </div>
            <div className="infoItem">
              <label htmlFor="nombre" className="infoLabel">
                Nombre
              </label>
              <span id="nombre" className="infoValue">
                {insumo.nombre}
              </span>
            </div>
            <div className="infoWrapper">
              <div className="infoItem">
                <label htmlFor="ruc" className="infoLabel">
                  Fuente Orgánica
                </label>
                <span id="fuente_organica" className="infoValue">
                  {insumo.fuente_organica}
                </span>
              </div>
              <div className="infoItem">
                <label htmlFor="ingrediente_activo" className="infoLabel">
                  Ingrediente Activo
                </label>
                <span id="ingrediente_activo" className="infoValue">
                  {insumo.ingrediente_activo}
                </span>
              </div>
              <div className="infoItem">
                <label htmlFor="tipo_insumo" className="infoLabel">
                  Tipo de Insumo
                </label>
                <span id="tipo_insumo" className="infoValue">
                  {insumo.tipo_insumo}
                </span>
              </div>
              <div className="infoItem">
                <label htmlFor="activo" className="infoLabel">
                  Activo
                </label>
                <span id="activo" className="infoValue">
                  {insumo.activo ? (
                    <CheckIcon style={{ color: "green" }} />
                  ) : (
                    <CloseIcon style={{ color: "red" }} />
                  )}
                </span>
              </div>
            </div>
          </div>
          <div className="infoRight">
            <div className="infoRightSection shadow">
              <div className="infoTitle">
                <h3>Proveedores</h3>
              </div>

              <div className="infoWrapper">
                <ul className="list-info">
                  {insumo.proveedor &&
                    insumo.proveedor.map((proveedor) => (
                      <li key={proveedor.uuid}>
                        <Link to={`/proveedor/detail/${proveedor.uuid}`}>
                          {proveedor.nombre}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            </div>

            <div className="infoRightSection shadow">
              <div className="infoTitle">
                <h3>Cosechas</h3>
              </div>
              {/* <span>{insumo.cosecha}</span> */}
              <div className="infoWrapper">
                <ul className="list-info">
                  {insumo.cosecha &&
                    insumo.cosecha.length > 0 &&
                    insumo.cosecha.map((cosecha) => (
                      <li key={cosecha.uuid}>
                        <Link to={`/cosecha/detail/${cosecha.uuid}`}>
                          {cosecha.produccion}
                        </Link>
                      </li>
                    ))}
                </ul>
                {insumo.cosecha && insumo.cosecha.length === 0 && (
                  <div className="info-message">
                    <ErrorIcon style={{ color: "red", marginRight: "10px" }} />{" "}
                    <p>No empleado en ninguna cosecha</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

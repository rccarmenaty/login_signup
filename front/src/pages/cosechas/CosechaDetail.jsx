// import "./insumoDetail.css";
import { useEffect, useState, useContext } from "react";
import { CosechaContext } from "../../context/CosechaContext";
import { useParams, Link, useHistory } from "react-router-dom";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import ErrorIcon from "@material-ui/icons/Error";

export default function Cosecha() {
  const [harvest, setHarvest] = useState(null);
  let history = useHistory();
  const [error, setError] = useState("");
  let { uuid } = useParams();
  const { getCosecha, cosecha } = useContext(CosechaContext);

  useEffect(() => {
    try {
      getCosecha(uuid);
    } catch (error) {
      setError(error.message);
    }
  }, []);

  useEffect(() => {
    setHarvest(cosecha.current.cosecha);
    console.log("harvest", harvest);
  }, [cosecha]);

  return (
    <div className="detail">
      {harvest && (
        <div className="infoDisplay">
          <div className="infoLeft shadow">
            <div className="infoTitle">
              <h2>Detalles</h2>
            </div>
            <div className="infoItem">
              <label htmlFor="novedades" className="infoLabel">
                Novedades
              </label>
              <span id="novedades" className="infoValue">
                {harvest.novedades}
              </span>
            </div>
            <div className="infoWrapper">
              <div className="infoItem">
                <label htmlFor="produccion" className="infoLabel">
                  Producción
                </label>
                <span id="produccion" className="infoValue">
                  {harvest.produccion}
                </span>
              </div>
              <div className="infoItem">
                <label htmlFor="fecha_cosecha" className="infoLabel">
                  Fecha de Cosecha
                </label>
                <span id="fecha_cosecha" className="infoValue">
                  {new Date(harvest.fecha_cosecha).toLocaleDateString()}
                </span>
              </div>
              <div className="infoItem">
                <label htmlFor="fecha_cosecha" className="infoLabel">
                  Fecha de Molienda
                </label>
                <span id="fecha_cosecha" className="infoValue">
                  {new Date(harvest.fecha_cosecha).toLocaleDateString()}
                </span>
              </div>
              <div className="infoItem">
                <label htmlFor="fecha_caducidad" className="infoLabel">
                  Fecha de Caducidad
                </label>
                <span id="fecha_caducidad" className="infoValue">
                  {new Date(harvest.fecha_caducidad).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
          <div className="infoRight">
            <div className="infoRightSection shadow">
              <div className="infoItem">
                <label htmlFor="fecha_preparacion" className="infoLabel">
                  Fecha de Preparación
                </label>
                <span id="fecha_preparacion" className="infoValue">
                  {new Date(harvest.fecha_preparacion).toLocaleDateString()}
                </span>
              </div>
              <div className="infoItem">
                <label htmlFor="fuente" className="infoLabel">
                  Fuente
                </label>
                <span id="fuente" className="infoValue">
                  {harvest.fuente}
                </span>
              </div>
              <div className="infoItem">
                <label htmlFor="cantidad_semillas" className="infoLabel">
                  Cantidad de Semillas
                </label>
                <span id="cantidad_semillas" className="infoValue">
                  {harvest.cantidad_semillas}
                </span>
              </div>
            </div>
            <div className="infoRightSection shadow">
              <div className="infoTitle">
                <h3>Insumos</h3>
              </div>
              <div className="infoWrapper">
                <ul className="list-info">
                  {harvest.insumo &&
                    harvest.insumo.map((el) => (
                      <li>
                        <Link to={`/insumo/detail/${el.uuid}`}>
                          {el.nombre}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

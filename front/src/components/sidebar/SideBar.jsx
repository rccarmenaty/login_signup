import "./sidebar.css";
import { LineStyle } from "@material-ui/icons";
import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function SideBar() {
  const [basePath, setBasePath] = useState("/");
  const history = useHistory();
  let location = useLocation();
  const [proveedor, setProveedor] = useState("");
  const [insumo, setInsumo] = useState("");
  const [cosecha, setCosecha] = useState("");

  useEffect(() => {
    const base = location.pathname.split("/")[1];
    if (base !== basePath) setBasePath(base);
  }, [location]);

  useEffect(() => {
    switch (basePath) {
      case "proveedor":
        handleProveedor();
        break;
      case "insumo":
        handleInsumo();
        break;
      case "cosecha":
        handleCosecha();
        break;
      default:
        handleProveedor();
    }
  }, [basePath]);

  const handleProveedor = () => {
    setInsumo("");
    setCosecha("");
    setProveedor("active");
  };

  const handleInsumo = () => {
    setInsumo("active");
    setCosecha("");
    setProveedor("");
  };

  const handleCosecha = () => {
    setInsumo("");
    setCosecha("active");
    setProveedor("");
  };

  return (
    <div className="sidebar">
      <div className="sideBarWrapper">
        <div className="sideBarMenu">
          <h3 className="sideBarTitle">Dashboard</h3>
          <ul className="sideBarList">
            <li
              className={`sideBarListItem ${proveedor}`}
              onClick={() => {
                history.push("/proveedor");
              }}
            >
              <LineStyle className="sideBarIcon " />
              Proveedores
            </li>
            <li
              className={`sideBarListItem ${insumo}`}
              onClick={() => {
                history.push("/insumo");
              }}
            >
              <LineStyle className="sideBarIcon" />
              Insumos
            </li>
            <li
              className={`sideBarListItem ${cosecha}`}
              onClick={() => {
                history.push("/cosecha");
              }}
            >
              <LineStyle className="sideBarIcon" />
              Cosechas
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

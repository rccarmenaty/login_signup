import "./proveedorList.css";
import { DataGrid } from "@material-ui/data-grid";
import { useHistory } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { useContext, useState, useEffect } from "react";
import { ProveedorContext } from "../../context/ProveedorContext";

export default function ProveedorList() {
  const history = useHistory();
  const { prov, delProveedor, list } = useContext(ProveedorContext);
  const [rows, setRows] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    setRows(prov.list);
  });

  const columns = [
    { field: "ruc", headerName: "RUC", width: 150, headerAlign: "center" },
    {
      field: "nombre",
      headerName: "Nombre",
      width: 150,
      editable: false,
      headerAlign: "center",
    },
    {
      field: "correo",
      headerName: "Correo",
      width: 220,
      headerAlign: "center",
    },
    {
      field: "activo",
      headerName: "Activo",
      type: "boolean",
      width: 150,
      headerAlign: "center",
    },
    {
      field: "actions",
      headerAlign: "center",
      headerName: "Acciones",
      width: 180,
      renderCell: (params) => {
        return (
          <div className="actionsCell">
            <EditIcon
              color="action"
              className="actionItem"
              onClick={() => {
                history.push(`/proveedor/edit/${params.row.uuid}`);
              }}
            />
            <VisibilityIcon
              color="action"
              className="actionItem"
              onClick={() => {
                history.push(`/proveedor/detail/${params.row.uuid}`);
              }}
            />
            <DeleteIcon
              color="action"
              className="actionItem"
              onClick={() => {
                delProveedor(params.row.uuid);
              }}
            />
          </div>
        );
      },
    },
  ];

  return (
    <div className="page">
      <div className="wrapper">
        <div style={{ height: 600, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            // checkboxSelection
            disableSelectionOnClick
          />
          <button
            className="signup-btn createButton buttonMarginVertical"
            type="submit"
            onClick={() => {
              history.push("/proveedor/create");
            }}
          >
            Añadir
          </button>
        </div>
        )
      </div>
    </div>
  );
}

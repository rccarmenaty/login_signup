import "./insumoList.css";
import { DataGrid } from "@material-ui/data-grid";
import { useHistory } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { useContext, useState, useEffect } from "react";
import { InsumoContext } from "../../context/InsumoContext";

export default function InsumoList() {
  const history = useHistory();
  const { ins, delOne } = useContext(InsumoContext);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (ins) setRows(ins.list);
  }, [ins]);

  const columns = [
    {
      field: "nombre",
      headerName: "Nombre",
      width: 150,
      headerAlign: "center",
    },
    {
      field: "fuente_organica",
      headerName: "Fuente Orgánica",
      width: 180,
      editable: false,
      headerAlign: "center",
    },
    {
      field: "ingrediente_activo",
      headerName: "Ingrediente Activo",
      width: 180,
      headerAlign: "center",
    },
    {
      field: "tipo_insumo",
      headerName: "Tipo de Insumo",
      width: 180,
      headerAlign: "center",
    },
    {
      field: "activo",
      headerName: "Activo",
      type: "boolean",
      width: 120,
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
                history.push(`/insumo/edit/${params.row.uuid}`);
              }}
            />
            <VisibilityIcon
              color="action"
              className="actionItem"
              onClick={() => {
                history.push(`/insumo/detail/${params.row.uuid}`);
              }}
            />
            <DeleteIcon
              color="action"
              className="actionItem"
              onClick={() => {
                delOne(params.row.uuid);
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
              history.push("/insumo/create");
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

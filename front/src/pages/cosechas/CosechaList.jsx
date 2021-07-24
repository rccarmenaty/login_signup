import { DataGrid } from "@material-ui/data-grid";
import { useHistory } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { useContext, useState, useEffect } from "react";
import { CosechaContext } from "../../context/CosechaContext";

export default function CosechaList() {
  const history = useHistory();
  const { cosecha, delOne } = useContext(CosechaContext);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setRows(
      cosecha.list.map((el) => ({
        ...el,
        fecha_cosecha: new Date(el.fecha_cosecha).toDateString(),
        fecha_molienda: new Date(el.fecha_molienda).toDateString(),
        fecha_caducidad: new Date(el.fecha_caducidad).toDateString(),
        fecha_preparacion: new Date(el.fecha_preparacion).toDateString(),
      }))
    );
  });

  const columns = [
    {
      field: "produccion",
      headerName: "Producción",
      width: 150,
      headerAlign: "center",
    },
    {
      field: "fecha_cosecha",
      headerName: "Fecha Cosecha",
      width: 180,
      editable: false,
      headerAlign: "center",
    },
    {
      field: "fecha_molienda",
      headerName: "Fecha Molienda",
      width: 180,
      headerAlign: "center",
    },
    {
      field: "fecha_caducidad",
      headerName: "Fecha Caducidad",
      width: 200,
      headerAlign: "center",
    },
    {
      field: "fecha_preparacion",
      headerName: "Fecha Preparación",
      width: 200,
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
                history.push(`/cosecha/edit/${params.row.uuid}`);
              }}
            />
            <VisibilityIcon
              color="action"
              className="actionItem"
              onClick={() => {
                history.push(`/cosecha/detail/${params.row.uuid}`);
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
              history.push("/cosecha/create");
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

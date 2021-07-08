import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

// const insumo = [
//   "Oliver Hansen",
//   "Van Henry",
//   "April Tucker",
//   "Ralph Hubbard",
//   "Omar Alexander",
//   "Carlos Abbott",
//   "Miriam Wagner",
//   "Bradley Wilkerson",
//   "Virginia Andrews",
//   "Kelly Snyder",
// ];

function getStyles(theme) {
  return {
    fontWeight: theme.typography.fontWeightRegular,
  };
}

export default function MultipleSelect({
  insumos,
  insumoValue,
  setInsumoValue,
  proveedores,
  proveedoresValue,
  setProveedoresValue,
}) {
  const classes = useStyles();
  const theme = useTheme();

  const handleChangeInsumo = (event) => {
    setInsumoValue(event.target.value);
  };

  const handleChangeProveedor = (event) => {
    setProveedoresValue(event.target.value);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-name-label">Insumos</InputLabel>
        <Select
          labelId="demo-mutiple-name-label"
          id="demo-mutiple-name"
          value={insumoValue}
          onChange={handleChangeInsumo}
          input={<Input />}
          MenuProps={MenuProps}
        >
          {insumos.map((insumo) => (
            <MenuItem key={insumo.uuid} value={insumo} style={getStyles(theme)}>
              {insumo.nombre}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-name-label">Proveedores</InputLabel>
        <Select
          labelId="demo-mutiple-name-label"
          id="demo-mutiple-name"
          multiple
          disabled={insumoValue.length === 0}
          value={proveedoresValue}
          onChange={handleChangeProveedor}
          input={<Input />}
          MenuProps={MenuProps}
        >
          {proveedores &&
            proveedores.map((proveedor) => (
              <MenuItem
                key={proveedor.uuid}
                value={proveedor.nombre}
                style={getStyles(theme)}
              >
                {proveedor.nombre}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </div>
  );
}

import "./topbar.css";
import React from "react";
import { Avatar } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import SimpleDialog from "./SimpleDialog";

export default function TopBar({ user }) {
  const options = ["Salir"];

  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(options[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">admin</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <AccountCircle fontSize="large" onClick={handleClickOpen} />
            <SimpleDialog
              selectedValue={selectedValue}
              open={open}
              onClose={handleClose}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function AppDialog({
  children,
  title,
  header,
  actions,
  open,
  acept,
}) {
  return (
    <div>
      <Dialog open={open} onClose={acept}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{header}</DialogContentText>
          {children}
        </DialogContent>
        <DialogActions>{actions}</DialogActions>
      </Dialog>
    </div>
  );
}

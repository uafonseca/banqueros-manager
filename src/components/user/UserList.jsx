import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Layout from "../Layout";
import {
  Avatar,
  Box,
  Button,
  Collapse,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import LockIcon from "@mui/icons-material/Lock";
import AppDialog from "../AppDialog";
import useFetch from "../../Hoocks/useFetch";
import { parseDate } from "../../services/utils";

export default function UserList() {
  const [users, setUsers] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  const { response, error, loading } = useFetch({
    method: "get",
    url: "/users",
  });

  React.useEffect(() => {
    if (response != null) setUsers(response);
  }, [response]);

  const handleAddCode = (id) => {
    setOpen(true);
  };

  function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
      <React.Fragment>
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell align="center">
            <Avatar src={row.picture} />
          </TableCell>
          <TableCell component="th" scope="row">
            {row.name}
          </TableCell>
          <TableCell align="right">{row.email}</TableCell>
          <TableCell align="right">{parseDate(row.createdAt)}</TableCell>
          <TableCell align="right">
            <Tooltip title="Adicionar código">
              <IconButton
                onClick={() => {
                  handleAddCode(row._id);
                }}
              >
                <AddCircleOutlineIcon color="primary" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Bloquear">
              <IconButton>
                <LockIcon color="primary" />
              </IconButton>
            </Tooltip>
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Listeros asociados
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Listero</TableCell>
                      <TableCell>Código</TableCell>
                      <TableCell align="right">Creado</TableCell>
                      <TableCell align="right">Modificado</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.codes.map((code) => (
                      <TableRow key={code._id}>
                        <TableCell component="th" scope="row">
                          {code.name}
                        </TableCell>
                        <TableCell>{code.code}</TableCell>
                        <TableCell align="right">
                          {parseDate(code.createdAt)}
                        </TableCell>
                        <TableCell align="right">
                          {parseDate(code.updatedAt)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  const Actions = () => {
    return (
      <>
        <Button variant="contained" color="success">
          Aceptar
        </Button>
        <Button
          variant="contained"
          color="warning"
          onClick={() => {
            setOpen(false);
          }}
        >
          Cancelar
        </Button>
      </>
    );
  };

  return (
    <Layout title="Users">
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Avatar</TableCell>
              <TableCell>Nombre y apellidos</TableCell>
              <TableCell align="right">Correo electrónico</TableCell>
              <TableCell align="right">Fecha de regístro</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.map((user) => (
              <Row key={user._id} row={user} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AppDialog
        open={open}
        title="Adicionar código"
        header="Datos del código"
        actions={<Actions />}
      >
        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        <TextField id="filled-basic" label="Filled" variant="filled" />
        <TextField id="standard-basic" label="Standard" variant="standard" />
      </AppDialog>
    </Layout>
  );
}

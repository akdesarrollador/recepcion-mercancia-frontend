import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import styled from "styled-components";
import useGlobalStore from "../../store/useGlobalStore";
import { Trash2 } from "lucide-react";
import theme from "../../theme/theme";
import IconButton from "@mui/material/IconButton";
import ConfirmationModal from "../modals/confirmationModal";
import { useState } from "react";

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#FFF",
    color: theme.palette.primary.main,
    fontWeight: "bold",
    fontSize: 12,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 10,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#e6e6e682",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const ItemsEnteredTable = () => {
  const { productsReceived, deleteProductReceived } = useGlobalStore();
  const [openModal, setOpenModal] = useState(false);

  return (
    <TableContainer
      sx={{ width: "99%", borderRadius: "10px", border: "1px solid #e1e1e1" }}
      component={Paper}
    >
      <Table sx={{}} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Código</StyledTableCell>
            <StyledTableCell>Descripción</StyledTableCell>
            <StyledTableCell>Cantidad</StyledTableCell>
            <StyledTableCell>Acción</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productsReceived.map((row) => (
            <StyledTableRow key={row.code}>
              <StyledTableCell component="th" scope="row">
                {row.code}
              </StyledTableCell>
              <StyledTableCell align="center">
                {row.description}
              </StyledTableCell>
              <StyledTableCell align="center">
                {row.unitsPerPackage && row.unitsPerPackage > 0
                  ? row.units * row.unitsPerPackage
                  : row.units}
              </StyledTableCell>
              <StyledTableCell align="center">
                <IconButton>
                  <Trash2
                    size={16}
                    color="#d33333"
                    onClick={() => setOpenModal(true)}
                  />
                </IconButton>
              </StyledTableCell>

              <ConfirmationModal
              open={openModal}
                label="¿Desea eliminar este producto?"
                onAccept={() => {
                  deleteProductReceived(row.code);
                  setOpenModal(false);
                }}
                onClose={() => setOpenModal(false)}
                textCancelButton="Cancelar"
                textAcceptButton="Eliminar"
                colorAcceptButton="#c03c3c"
              />
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>

    </TableContainer>
  );
};

export default ItemsEnteredTable;

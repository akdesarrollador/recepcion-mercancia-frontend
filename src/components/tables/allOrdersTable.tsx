import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import styled from "styled-components";
import useGlobalStore from "../../store/useGlobalStore";
import theme from '../../theme/theme';
import { Trash2 } from 'lucide-react';
import IconButton from "@mui/material/IconButton";

interface AllOrdersTableProps {
    allowDelete?: boolean;
}

const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#FFF",
        color: theme.palette.primary.main,
        fontWeight: "bold",
        fontSize: 12,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 10,
        padding: "8px 16px",

    },
}));

const StyledTableRow = styled(TableRow)(() => ({
    "&:nth-of-type(odd)": {
        backgroundColor: "#cbcbcb38",
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

const AllOrdersTable = ({ allowDelete = false }: AllOrdersTableProps) => {
    const { ordenesCompraData } = useGlobalStore();
    return (
        <TableContainer
            sx={{ width: "99%", borderRadius: "10px", border: "1px solid #e1e1e1" }}
            component={Paper}
        >
            <Table sx={{}} aria-label="customized table">
                <TableBody>
                    {ordenesCompraData?.ordenes_compra.map((orden, index) => (
                        <StyledTableRow key={orden.id} sx={{ alignContent: "center" }}>
                            <StyledTableCell align="center">{index + 1}</StyledTableCell>
                            <StyledTableCell align="center" sx={{ color: theme.palette.primary.main }}>{orden.numero_orden}</StyledTableCell>
                            {allowDelete && (
                                <StyledTableCell align="center">
                                    <IconButton>
                                        <Trash2
                                            size={16}
                                            color="#d33333"
                                        // onClick={() => setOpenModal(true)}
                                        />
                                    </IconButton>
                                </StyledTableCell>
                            )
                            }
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default AllOrdersTable;
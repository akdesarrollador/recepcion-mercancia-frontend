import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import useGlobalStore from "../../store/useGlobalStore";

export default function OrdersArrayChips() {
  const { multiplePurchaseOrderData, removePurchaseOrderData } =
    useGlobalStore();

  const ListItem = styled("li")(({ theme }) => ({
    margin: theme.spacing(0.5),
  }));

  return (
    <Paper
      sx={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        listStyle: "none",
        p: 0.5,
        m: 0,
        maxHeight: 150, // altura máxima prudente
        overflowY: "auto", // scroll vertical si se excede
      }}
      component="ul"
    >
      {multiplePurchaseOrderData?.ordenesCompra?.map((data) => {
        return (
          <ListItem key={data?.numeroOrden}>
            <Chip
              sx={{
                maxWidth: 250,
                ".MuiChip-label": {
                  fontSize: "0.675rem",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  display: "block",
                  width: "100%",
                  paddingRight: "8px",
                },
              }}
              label={`${data?.numeroOrden} ${data?.proveedor?.nombre}`}
              onDelete={() => removePurchaseOrderData(data?.numeroOrden)}
            />
          </ListItem>
        );
      })}
    </Paper>
  );
}

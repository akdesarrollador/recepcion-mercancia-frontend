import OrdenesCompraInterface from "./ordenes-compra.interfaces";
import { ProductoRecibidoInterface } from "./productos.interfaces";
import { OrdenCompraDetectadaInterface } from "./ordenes-compra.interfaces";

export interface SnackbarState {
  open: boolean;
  message: string;
  severity: string;
  autoHide?: boolean;
}

export default interface GlobalStoreInterface {
  snackbar: SnackbarState;
  openSnackbar: (message: string, severity: string, autoHide?: boolean) => void;
  closeSnackbar: () => void;

  ordenesCompraData: null | OrdenesCompraInterface;
  addOrdenCompra: (
    ordenCompraDetectada: OrdenCompraDetectadaInterface
  ) => void;
  removerOrdenCompra: (numeroOrden: string) => void;
  limpiarOrdenesCompraData: () => void;   

  productosRecibidos: Array<ProductoRecibidoInterface>;
  setProductosRecibidos: (products: ProductoRecibidoInterface[]) => void;
  addProductoRecibido: (product: ProductoRecibidoInterface) => void;
  eliminarProductoRecibido: (codigo: string) => void;
  limpiarProductosRecibidos: () => void;

  resetStore: () => void;
  billImage: File | null;
  setBillImage: (image: File | null) => void;
  jointReception: boolean;
  setJointReception: (joint: boolean) => void;
  receptionCreationState: string;
  setReceptionCreationState: (state: string) => void;
  receptionTimer: number;
  setReceptionTimer: (time: number) => void;
}

import { PurchaseOrderData } from "./purchaseOrderInterface";
import { ProductReceivedInterface } from "./productReceivedInterface";

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
  purchaseOrderData: null | PurchaseOrderData;
  setPurchaseOrderData: (data: PurchaseOrderData | null) => void;
  productsReceived: Array<ProductReceivedInterface>;
  addProductReceived: (product: ProductReceivedInterface) => void;
  cleanProductsReceived: () => void;
  deleteProductReceived: (productNumber: string) => void;
  resetStore: () => void;
  billImage: File | null;
  setBillImage: (image: File | null) => void;
  jointReception: boolean;
  setJointReception: (joint: boolean) => void;
}

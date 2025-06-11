import { PurchaseOrderData } from "./purchaseOrderInterface";
import { ProductReceivedInterface } from "./productReceivedInterface";

export interface SnackbarState {
  open: boolean;
  message: string;
  severity: string;
}

export default interface GlobalStoreInterface {
  snackbar: SnackbarState;
  openSnackbar: (message: string, severity: string) => void;
  closeSnackbar: () => void;
  purchaseOrderData: null | PurchaseOrderData;
  setPurchaseOrderData: (data: PurchaseOrderData | null) => void;
  productsReceived: Array<ProductReceivedInterface>;
  addProductReceived: (product: ProductReceivedInterface) => void;
  cleanProductsReceived: () => void;
  deleteProductReceived: (productNumber: string) => void;
  resetStore: () => void;
  billImages: File[] | null;
  setBillImage: (image: File[] | null) => void;
  receptionId: number | null;
  setReceptionId: (id: number | null) => void;
}


import {
  PurchaseOrderData,
  MultiplePurchaseOrdersData,
  PurchaseOrderDetectedType,
} from "./purchaseOrderInterface";
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
  multiplePurchaseOrderData: null | MultiplePurchaseOrdersData;
  addPurchaseOrderData: (
    purchaseOrderDetected: PurchaseOrderDetectedType
  ) => void;
  removePurchaseOrderData: (numeroOrden: string) => void;
  productsReceived: Array<ProductReceivedInterface>;
  setProductsReceived: (products: ProductReceivedInterface[]) => void;
  addProductReceived: (product: ProductReceivedInterface) => void;
  cleanProductsReceived: () => void;
  deleteProductReceived: (productNumber: string) => void;
  resetStore: () => void;
  billImage: File | null;
  setBillImage: (image: File | null) => void;
  jointReception: boolean;
  setJointReception: (joint: boolean) => void;
  clearMultiplePurchaseOrderData: () => void;
  receptionCreationState: string;
  setReceptionCreationState: (state: string) => void;
  receptionTimer: number;
  setReceptionTimer: (time: number) => void;
}

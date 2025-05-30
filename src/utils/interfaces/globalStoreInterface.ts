import { PurchaseOrderInterface } from "./purchaseOrderInterface";
import { ProductReceivedInterface } from "./productReceivedInterface";

export default interface GlobalStoreInterface {
  purchaseOrderData: null | {
    id: string;
    orderNumber: string;
    supplierName: string;
    orderDate: string;
    status: "pending" | "approved" | "rejected";
    totalAmount: number;
    items: Array<{
      itemCode: string;
      description: string;
      quantity: number;
      unitPrice: number;
    }>;
  };
  setPurchaseOrderData: (data: PurchaseOrderInterface | null) => void;
  productsReceived: Array<ProductReceivedInterface>;
  addProductReceived: (product: ProductReceivedInterface) => void;
  cleanProductsReceived: () => void;
  deleteProductReceived: (productNumber: string) => void;
  resetStore: () => void;
  billImage: File[] | null;
  setBillImage: (image: File[] | null) => void;
}

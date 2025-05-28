export interface PurchaseOrderInterface {
    id: string;
    orderNumber: string;
    supplierName: string; 
    orderDate: string;
    status: "pending" | "approved" | "rejected";
    totalAmount: number;
    items: Array<PurchaseOrderItemInterface>;
}

export interface PurchaseOrderItemInterface {
    itemCode: string;
        description: string;
        quantity: number;
        unitPrice: number;
}
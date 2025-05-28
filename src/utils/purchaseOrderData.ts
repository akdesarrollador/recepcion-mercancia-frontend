import { PurchaseOrderInterface } from "./interfaces/purchaseOrderInterface";

export const poData1: PurchaseOrderInterface[] = [
  {
    id: "13208357923",
    orderNumber: "000005732305259",
    supplierName: "Alimentos Polar S.A.",
    orderDate: "2023-01-15",
    status: "approved",
    totalAmount: 4179,
    items: [
      {
        itemCode: "7523753465652",
        description: "Harina de Maiz Precocida 900g",
        quantity: 659,
        unitPrice: 0.75,
      },
      {
        itemCode: "7523712365652",
        description: "Mayonesa Mavesa 450g",
        quantity: 700,
        unitPrice: 1.12,
      },
      {
        itemCode: "9876712365652",
        description: "Ketchup Pampero 250g",
        quantity: 120,
        unitPrice: 1.05,
      },
      {
        itemCode: "1209712365652",
        description: "Mantequilla Mavesa 450g",
        quantity: 550,
        unitPrice: 1.34,
      },
      {
        itemCode: "9876724569052",
        description: "Avena en Hojuelas Quaker 900g",
        quantity: 900,
        unitPrice: 2.32,
      },
      {
        itemCode: "91239872365652",
        description: "Arroz Tradicional Primor 900g",
        quantity: 1200,
        unitPrice: 0.97,
      },
      {
        itemCode: "9876712376548",
        description: "Malta Maltín Polar Botella 1 litro",
        quantity: 50,
        unitPrice: 2.99,
      },
    ],
  },
];

export const poData2: PurchaseOrderInterface[] = [
  {
    id: "13276347923",
    orderNumber: "000005732312098",
    supplierName: "Frutería Luisito",
    orderDate: "2025-05-15",
    status: "approved",
    totalAmount: 16850,
    items: [
      {
        itemCode: "1210399446620",
        description: "Manzana Roja pequeñas",
        quantity: 250,
        unitPrice: 0.8,
      },
      {
        itemCode: "1175768263258",
        description: "Cambur",
        quantity: 700,
        unitPrice: 0.4,
      },
      {
        itemCode: "1153328582232",
        description: "Papa grandes",
        quantity: 5000,
        unitPrice: 0.7,
      },
      {
        itemCode: "1003761015685",
        description: "Zanahoria",
        quantity: 7000,
        unitPrice: 0.4,
      },
      {
        itemCode: "1013242896807",
        description: "Tomate",
        quantity: 10000,
        unitPrice: 0.5,
      },
      {
        itemCode: "1044034429236",
        description: "Fresa pequeña",
        quantity: 100,
        unitPrice: 1.5,
      },
      {
        itemCode: "1224353250632",
        description: "Pepino",
        quantity: 100,
        unitPrice: 0.8,
      },
    ],
  },
];

export const getPurchaseOrderData = (orderNumber: string): PurchaseOrderInterface | undefined => {
    const allData = [...poData1, ...poData2];
    return allData.find(po => po.orderNumber === orderNumber);
}

import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  Producto,
  PurchaseOrderData,
  PurchaseOrderInterface,
} from "../utils/interfaces/purchaseOrderInterface";
import GlobalStoreInterface from "../utils/interfaces/globalStoreInterface";
import { ProductReceivedInterface } from "../utils/interfaces/productReceivedInterface";

const useGlobalStore = create<GlobalStoreInterface>()(
  persist(
    (set, get) => ({
      snackbar: {
        open: false,
        message: "",
        severity: "",
      },
      openSnackbar: (message = "", severity = "") => {
        set({ snackbar: { open: true, message, severity } });
      },
      closeSnackbar: () => {
        set({
          snackbar: { open: false, message: "", severity: "" },
        });
      },
      purchaseOrderData: null,
      setPurchaseOrderData: (data: PurchaseOrderData | null) =>
        set({ purchaseOrderData: data }),
      productsReceived: Array<ProductReceivedInterface>(),
      addProductReceived: (product: ProductReceivedInterface) =>
        set({ productsReceived: [...get().productsReceived, product] }),
      cleanProductsReceived: () => set({ productsReceived: [] }),
      deleteProductReceived: (code: string) => {
        set({
          productsReceived: get().productsReceived.filter(
            (product) => product.code !== code
          ),
        });
      },
      resetStore: () =>
        set({
          billImage: null,
          purchaseOrderData: null,
          productsReceived: [],
          multiplePurchaseOrderData: null,
          jointReception: false,
        }),
      billImage: null,
      setBillImage: (image: File | null) => set({ billImage: image }),
      jointReception: false,
      setJointReception: (joint: boolean) => set({ jointReception: joint }),
      multiplePurchaseOrderData: null,
      clearMultiplePurchaseOrderData: () =>
        set({ multiplePurchaseOrderData: null }),
      addPurchaseOrderData: (
        purchaseOrder: PurchaseOrderInterface,
        productos: Producto[]
      ) =>
        set({
          multiplePurchaseOrderData: {
            ordenesCompra: [
              ...(get().multiplePurchaseOrderData?.ordenesCompra || []),
              {
                ...purchaseOrder,
                __cantidadProductos: productos.length, // propiedad auxiliar
              },
            ],
            productos: [
              ...(get().multiplePurchaseOrderData?.productos || []),
              ...productos,
            ],
          },
        }),
      removePurchaseOrderData: (numeroOrden: string) => {
        const currentData = get().multiplePurchaseOrderData;
        // Si no hay datos, no hacer nada
        if (!currentData) return;

        // Encuentra el índice de la orden a eliminar
        const orderIndex = currentData.ordenesCompra.findIndex(
          (order) => order?.numeroOrden === numeroOrden
        );
        if (orderIndex === -1) return;

        const start = currentData.ordenesCompra
          .slice(0, orderIndex)
          .reduce((acc, order) => acc + (order.__cantidadProductos || 0), 0);

        const count =
          currentData.ordenesCompra[orderIndex].__cantidadProductos || 0;

        set({
          multiplePurchaseOrderData: {
            ordenesCompra: currentData.ordenesCompra.filter(
              (order) => order.numeroOrden !== numeroOrden
            ),
            productos: [
              ...currentData.productos.slice(0, start),
              ...currentData.productos.slice(start + count),
            ],
          },
        });
      },
    }),
    {
      name: "global-storage-rdm",
      partialize: (state) => ({
        purchaseOrderData: state.purchaseOrderData,
        productsReceived: state.productsReceived,
        billImage: state.billImage,
        jointReception: state.jointReception,
        multiplePurchaseOrderData: state.multiplePurchaseOrderData,
      }),
    }
  )
);

export default useGlobalStore;

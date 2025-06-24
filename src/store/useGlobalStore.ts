import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PurchaseOrderData } from "../utils/interfaces/purchaseOrderInterface";
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
          jointReception: false,
        }),
      billImage: null,
      setBillImage: (image: File | null) => set({ billImage: image }),
      jointReception: false, // Default value, can be set later
      setJointReception: (joint: boolean) => set({ jointReception: joint }),
    }),
    {
      name: "global-storage-rdm",
      partialize: (state) => ({
        purchaseOrderData: state.purchaseOrderData,
        productsReceived: state.productsReceived,
        billImages: state.billImage,
        jointReception: state.jointReception,
      }),
    }
  )
);

export default useGlobalStore;

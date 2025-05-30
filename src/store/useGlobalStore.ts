import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PurchaseOrderInterface } from '../utils/interfaces/purchaseOrderInterface';
import GlobalStoreInterface from '../utils/interfaces/globalStoreInterface';
import { ProductReceivedInterface } from '../utils/interfaces/productReceivedInterface';

const useGlobalStore = create<GlobalStoreInterface>()(
  persist(
    (set, get) => ({
      purchaseOrderData: null,
      setPurchaseOrderData: (data: PurchaseOrderInterface | null) => set({ purchaseOrderData: data }),
      productsReceived: Array<ProductReceivedInterface>(),
      addProductReceived: (product: ProductReceivedInterface) =>
        set({ productsReceived: [...get().productsReceived, product] }),
      cleanProductsReceived: () => set({ productsReceived: [] }),
      deleteProductReceived: (productCode: string) => {
        set({
          productsReceived: get().productsReceived.filter(
            (product) => product.productCode !== productCode
          )
        });
      },
      resetStore: () => set({
        billImage: null,
        purchaseOrderData: null,
        productsReceived: []
      }),
      billImage: null,
      setBillImage: (image: File[] | null) => set({ billImage: image })

    }),
    {
      name: "global-storage-rdm",
      partialize: (state) => ({
        purchaseOrderData: state.purchaseOrderData,
        productsReceived: state.productsReceived,
        billImage: state.billImage
      })
    }
  )
);

export default useGlobalStore;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  Producto,
  PurchaseOrderData,
  PurchaseOrderDetectedType,
  // PurchaseOrderInterface,
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
      setProductsReceived: (products: ProductReceivedInterface[]) =>
        set({ productsReceived: products }),

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
      receptionTimer: 0,
      setReceptionTimer: (time: number) => set({ receptionTimer: time }),
      jointReception: false,
      setJointReception: (joint: boolean) => set({ jointReception: joint }),
      multiplePurchaseOrderData: null,
      clearMultiplePurchaseOrderData: () =>
        set({ multiplePurchaseOrderData: null }),
      addPurchaseOrderData: (
        purchaseOrderDetected: PurchaseOrderDetectedType
      ) => {
        if (!get().jointReception) {
          console.log("recepcion conjunta en false");
          get().setJointReception(true);
          // Normalización de productos existentes (si es necesario)
          const normalizedExistingProducts =
            get().purchaseOrderData?.productos.map((product) => ({
              codigo: product.codigo,
              descripcion: product.descripcion,
              recibido: product.recibido || 0,
              unidades_por_bulto: product.unidades_por_bulto || 0,
              solicitado_odc:
                product.solicitado_odc || (product as any).cantidad || 0,
              total_solicitado: product.total_solicitado || 0,
            }));

          // Paso 2: Normalizar los nuevos productos a la estructura Producto
          const normalizedNewProducts = purchaseOrderDetected.productos.map(
            (product) => ({
              codigo: product.codigo,
              descripcion: product.descripcion,
              recibido: 0,
              unidades_por_bulto: 0,
              solicitado_odc: +product.cantidad,
              total_solicitado: product.total_solicitado,
            })
          );

          // Paso 3: Combinar todos los productos en un solo arreglo
          const allProducts = [
            ...(normalizedExistingProducts || []),
            ...normalizedNewProducts,
          ];

          // Paso 4: Agrupar por código y sumar cantidades
          const mergedProducts = allProducts.reduce((acc, current) => {
            const existingProduct = acc.find(
              (p) => p.codigo === current.codigo
            );

            if (existingProduct) {
              // Sumar cantidades si el producto ya existe
              existingProduct.solicitado_odc += current.solicitado_odc;
              existingProduct.total_solicitado += current.total_solicitado;
              // Mantener los valores de recibido y unidades_por_bulto del producto existente
              existingProduct.recibido = Math.max(
                existingProduct.recibido,
                current.recibido
              );
              existingProduct.unidades_por_bulto = Math.max(
                existingProduct.unidades_por_bulto,
                current.unidades_por_bulto
              );
            } else {
              // Agregar nuevo producto si no existe
              acc.push({ ...current });
            }
            return acc;
          }, [] as Producto[]);

          const purchaseOrderData = get().purchaseOrderData;
          const ordenCompra = purchaseOrderData?.ordenCompra;

          set({
            multiplePurchaseOrderData: {
              ordenesCompra:
                purchaseOrderData && ordenCompra ? [ordenCompra] : [],
              productos: [
                ...(get().multiplePurchaseOrderData?.productos || []),
              ],
            },
          });

          set({
            multiplePurchaseOrderData: {
              ordenesCompra: [
                ...(get().multiplePurchaseOrderData?.ordenesCompra || []),
                purchaseOrderDetected.ordenCompra,
              ],
              productos: mergedProducts,
            },
          });
        } else {
          console.log("recepcion conjunta en true");
          // Normalización de productos existentes (si es necesario)
          const normalizedExistingProducts =
            get().multiplePurchaseOrderData?.productos.map((product) => ({
              codigo: product.codigo,
              descripcion: product.descripcion,
              recibido: product.recibido || 0,
              unidades_por_bulto: product.unidades_por_bulto || 0,
              solicitado_odc:
                product.solicitado_odc || (product as any).cantidad || 0,
              total_solicitado: product.total_solicitado || 0,
            }));

          // Paso 2: Normalizar los nuevos productos a la estructura Producto
          const normalizedNewProducts = purchaseOrderDetected.productos.map(
            (product) => ({
              codigo: product.codigo,
              descripcion: product.descripcion,
              recibido: 0,
              unidades_por_bulto: 0,
              solicitado_odc: +product.cantidad,
              total_solicitado: product.total_solicitado,
            })
          );

          // Paso 3: Combinar todos los productos en un solo arreglo
          const allProducts = [
            ...(normalizedExistingProducts || []),
            ...normalizedNewProducts,
          ];

          // Paso 4: Agrupar por código y sumar cantidades
          const mergedProducts = allProducts.reduce((acc, current) => {
            const existingProduct = acc.find(
              (p) => p.codigo === current.codigo
            );

            if (existingProduct) {
              // Sumar cantidades si el producto ya existe
              existingProduct.solicitado_odc += current.solicitado_odc;
              existingProduct.total_solicitado += current.total_solicitado;
              // Mantener los valores de recibido y unidades_por_bulto del producto existente
              existingProduct.recibido = Math.max(
                existingProduct.recibido,
                current.recibido
              );
              existingProduct.unidades_por_bulto = Math.max(
                existingProduct.unidades_por_bulto,
                current.unidades_por_bulto
              );
            } else {
              // Agregar nuevo producto si no existe
              acc.push({ ...current });
            }
            return acc;
          }, [] as Producto[]);

          console.log(
            "ordenes de compra en mpo antes de agregar nueva: ",
            get().multiplePurchaseOrderData?.ordenesCompra
          );

          console.log(
            "orden de compra por agregar: ",
            purchaseOrderDetected.ordenCompra
          );

          set({
            multiplePurchaseOrderData: {
              ordenesCompra: [
                ...(get().multiplePurchaseOrderData?.ordenesCompra || []),
                purchaseOrderDetected.ordenCompra,
              ],
              productos: mergedProducts,
            },
          });
        }
      },
      removePurchaseOrderData: (numeroOrden: string) => {
        const currentData = get().multiplePurchaseOrderData;
        // Si no hay datos, no hacer nada
        if (!currentData) return;

        if (currentData.ordenesCompra.length === 1) {
          return set({ multiplePurchaseOrderData: null });
        }

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
      receptionCreationState: "Iniciando...",
      setReceptionCreationState: (state: string) =>
        set({ receptionCreationState: state }),
    }),
    {
      name: "global-storage-rdm",
      partialize: (state) => ({
        purchaseOrderData: state.purchaseOrderData,
        productsReceived: state.productsReceived,
        billImage: state.billImage,
        jointReception: state.jointReception,
        receptionCreationState: state.receptionCreationState,
        multiplePurchaseOrderData: state.multiplePurchaseOrderData,
      }),
    }
  )
);

export default useGlobalStore;

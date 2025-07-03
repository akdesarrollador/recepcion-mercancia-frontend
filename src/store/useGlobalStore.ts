import { create } from "zustand";
import { persist } from "zustand/middleware";
import { OrdenCompraDetectadaInterface } from "../utils/interfaces/ordenes-compra.interfaces";
import GlobalStoreInterface from "../utils/interfaces/global-store.interfaces";
import Producto, { ProductoRecibidoInterface } from "../utils/interfaces/productos.interfaces";

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
      ordenesCompraData: null,
      addOrdenCompra: (ordenCompraDetectada: OrdenCompraDetectadaInterface) => {
        const products = get().ordenesCompraData?.productos || [];
        const normalizedNewProducts = ordenCompraDetectada.productos.map((product) => ({
          codigo: product.codigo,
          descripcion: product.descripcion,
          ya_recibido: product?.ya_recibido || 0,
          cantidad_asignada: product.cantidad_asignada || 0,
          unidades_por_bulto: product.unidades_por_bulto || 0,
        }));

        const allProducts = [ ...products, ...normalizedNewProducts ];

        const mergedProducts = allProducts.reduce((acc, current) => {
          const existingProduct = acc.find((p) => p.codigo === current.codigo);

          if(existingProduct) {
            existingProduct.cantidad_asignada += current.cantidad_asignada;
            existingProduct.ya_recibido = Math.max(existingProduct.ya_recibido, current.ya_recibido);
            existingProduct.unidades_por_bulto =Math.max(existingProduct.unidades_por_bulto, current.unidades_por_bulto);
          } else {
            acc.push({ ...current });
          }
          return acc;
        }, [] as Producto[]);

        set({
          ordenesCompraData: {
            ordenes_compra: [
              ...get().ordenesCompraData?.ordenes_compra || [],
              {
                ...ordenCompraDetectada.ordenCompra,
                numero_orden: ordenCompraDetectada.ordenCompra.numeroOrden,
                fecha_pedido: ordenCompraDetectada.ordenCompra.fechaPedido,
                dias_ven: ordenCompraDetectada.ordenCompra.diasVen,
                recibir_en: ordenCompraDetectada.ordenCompra.recibirEn,
              }
            ],
            productos: mergedProducts,
          }
        });
      },
      removerOrdenCompra: (numero_orden: string) => {
        const currentData = get().ordenesCompraData;
        if (!currentData) return;

        if (currentData.ordenes_compra.length === 1) {
          return set({ ordenesCompraData: null });
        }

        const orderIndex = currentData.ordenes_compra.findIndex((order) => order?.numero_orden === numero_orden);
        if (orderIndex === -1) return;

        const start = currentData.ordenes_compra
          .slice(0, orderIndex)
          .reduce((acc, order) => acc + (order.__cantidad_productos || 0), 0);

        const count = currentData.ordenes_compra[orderIndex].__cantidad_productos || 0;

        set({
          ordenesCompraData: {
            ordenes_compra: currentData.ordenes_compra.filter((order) => order.numero_orden !== numero_orden),
            productos: [
              ...currentData.productos.slice(0, start),
              ...currentData.productos.slice(start + count),
            ],
          },
        });
      },
      limpiarOrdenesCompraData: () => set({ ordenesCompraData: null }),
      productosRecibidos: Array<ProductoRecibidoInterface>(),
      setProductosRecibidos: (productos: ProductoRecibidoInterface[]) => {
        set({ productosRecibidos: productos });
      },
      addProductoRecibido: (producto: ProductoRecibidoInterface) => {
        set({ productosRecibidos: [...get().productosRecibidos, producto] });
      },
      eliminarProductoRecibido: (codigo: string) => {
        set({
          productosRecibidos: get().productosRecibidos.filter((product) => product.codigo !== codigo),
        });
      },
      limpiarProductosRecibidos: () => set({ productosRecibidos: [] }),
      billImage: null,
      setBillImage: (image: File | null) => set({ billImage: image }),
      receptionTimer: 0,
      setReceptionTimer: (time: number) => set({ receptionTimer: time }),
      jointReception: false,
      setJointReception: (joint: boolean) => set({ jointReception: joint }),
      receptionCreationState: "Iniciando...",
      setReceptionCreationState: (state: string) => set({ receptionCreationState: state }),
      resetStore: () => set({
        snackbar: {
          open: false,
          message: "",
          severity: "",
        },
        ordenesCompraData: null,
        productosRecibidos: [],
        billImage: null,
        jointReception: false,
        receptionCreationState: "Iniciando...",
        receptionTimer: 0,
      }),
    }),
    {
      name: "global-storage-rdm",
      partialize: (state) => ({
        ordenesCompraData: state.ordenesCompraData,
        billImage: state.billImage,
        jointReception: state.jointReception,
        receptionCreationState: state.receptionCreationState,
        receptionTimer: state.receptionTimer,
        productosRecibidos: state.productosRecibidos,
      }),
    }
  )
);

export default useGlobalStore;

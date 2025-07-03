import Producto from "./productos.interfaces";

export default interface OrdenesCompraInterface {
  ordenes_compra: OrdenCompra[];
  productos: Producto[];
}

export interface OrdenCompra {
  id: number;
  numero_orden: string;
  proveedor: Proveedor;
  fecha_pedido: string;
  dias_ven: number;
  recibir_en: string;
  __cantidad_productos?: number; // propiedad auxiliar para uso interno
}

export interface Proveedor {
  codigo: string;
  nombre: string;
  direccion: string;
  rif: string;
}


export interface OrdenCompraDetectadaInterface {
  ordenCompra: {
    id: number;
    numeroOrden: string;
    proveedor: {
      codigo: string;
      nombre: string;
      direccion: string;
      rif: string;
    };
    fechaPedido: string;
    diasVen: number;
    observacion1: string;
    observacion2: string;
    observacion3: string;
    observacion4: string;
    operador: string;
    fechaCreacion: string;
    fechaRE: string;
    recibirEn: string;
  };
  productos: Array<{
    codigo: string;
    descripcion: string;
    cantidad_asignada: number;
    total_solicitado: number;
    ya_recibido?: number;
    unidades_por_bulto?: number;
  }>;
}

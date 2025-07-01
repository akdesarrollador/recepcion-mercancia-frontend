export interface PurchaseOrderData {
  ordenCompra: PurchaseOrderInterface;
  productos: Producto[];
}

export interface MultiplePurchaseOrdersData {
  ordenesCompra: PurchaseOrderInterface[];
  productos: Producto[];
}

export interface PurchaseOrderInterface {
  id: number;
  numeroOrden: string;
  proveedor: Proveedor;
  fechaPedido: string;
  diasVen: number;
  recibirEn: string;
  __cantidadProductos?: number; // propiedad auxiliar para uso interno
}

export interface Proveedor {
  codigo: string;
  nombre: string;
  direccion: string;
  rif: string;
}

export interface Producto {
  codigo: string;
  descripcion: string;
  recibido: number;
  unidades_por_bulto: number;
  solicitado_odc: number;
  total_solicitado: number;
}

export interface PurchaseOrderDetectedType {
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
    cantidad: number;
    total_solicitado: number;
  }>;
}

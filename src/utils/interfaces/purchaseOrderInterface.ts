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
  totalProductos: number;
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
  solicitado_tienda: number;
}

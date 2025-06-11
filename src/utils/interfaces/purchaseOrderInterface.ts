export interface PurchaseOrderData {
  ordenCompra: PurchaseOrderInterface;
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
  solicitado_odc: number;
  solicitado_tienda: number;
  recibido: number;
}

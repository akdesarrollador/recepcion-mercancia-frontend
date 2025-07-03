export default interface Producto {
  codigo: string;
  descripcion: string;
  cantidad_asignada: number;
  ya_recibido: number;
  unidades_por_bulto: number;
}

export interface ProductoRecibidoInterface {
    codigo: string; // Identificador único del producto
    descripcion: string; // Descripción del producto
    cantidad_asignada: number; // Cantidad asignada del producto
    unidades: number; // Número de unidades recibidas
    unidades_por_bulto: number; // Número de unidades por bulto
}
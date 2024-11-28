export interface Factura {
  id: string;
  fecha: Date;
  servicioRealizado: string;
  costoServicio: number;
  abono: number;
  estado: boolean;
  fechaCreacion: Date;
}

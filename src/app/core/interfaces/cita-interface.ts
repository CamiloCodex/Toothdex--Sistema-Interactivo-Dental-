import { Paciente } from "./paciente.interface";

export interface Cita {
    id: string;
    fecha: Date;
    motivo: string;
    estado: string;
}
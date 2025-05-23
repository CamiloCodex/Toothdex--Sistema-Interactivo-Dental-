// Generated by https://quicktype.io
import { Cita } from "./cita-interface";
import { Factura } from "./facturación-interface";
import { HistoriaClinica } from "./historia-clinica.interface";


export interface Paciente {
    id:                string;
    cedula:            string;
    name:              string;
    lastName:          string;
    celular:           string;
    email:             string;
    genero:            string;
    address:           string;
    estadoCivil:       string;
    fechaNacimiento:   Date;
    antecedentes:      string;
    otrosAntecedentes: string;
    medicamentos:      string;
    historiasClinicas: HistoriaClinica[];
    citas:             Cita[];
    facturas:          Factura[];
    estado:            boolean;
    tratamiento:       string;
    valorInicial:      number;
    numeroCuotas:      number;
    valorPorCuotas:    number;
}

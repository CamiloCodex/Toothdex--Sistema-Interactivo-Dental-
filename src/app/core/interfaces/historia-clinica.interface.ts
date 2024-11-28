import { Paciente } from "./paciente.interface";

export interface HistoriaClinica {
  id: string;
  remitido: string;
  motivoConsulta: string;
  ruidosArticulares: string;
  examenFrontal: string;
  asimetria: string;
  perfil: string;
  posicionLabial: string;
  hiperHipotomia: boolean;
  habitos: string;
  dolorArticilar: boolean;
  dientes: number;
  diagEsqueletico: DiagEsqueleticoForm;
  diagRadiograficoDentario: DiagRadiograficoDentarioForm;
  diagEsqueleticoTejidos: DiagEsqueleticoTejidosForm;
  posicionLabialForm: PosicionLabialForm;
  diagnosticos: DiagnosticosForm;
  estado: boolean;
}

interface DiagEsqueleticoForm {
  diagnosticoEsqueletico: string;
  prognatismo: string;
  retrognatismo: string;
  tipoCrecimiento: string;
  alturaFacial: string;
  macrognatismo: string;
  micrognatismo: string;
}

interface DiagRadiograficoDentarioForm {
  protuccion: string;
  rectruccion: string;
}

interface DiagEsqueleticoTejidosForm {
  tiposPerfil: string;
}

interface PosicionLabialForm {
  posicionLabialProquelia: string;
  posicionLabialRetroquelia: string;
}

interface DiagnosticosForm {
  facial: string;
  funcional: string;
  esqueletico: string;
  dental: string;
  planTratamiento: string;
  conExtracciones: boolean;
  posiblesExtracciones: string;
  observaciones: string;
}

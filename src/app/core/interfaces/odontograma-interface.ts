export interface Odontograma {
    id: string;
    dientes: Diente[];
    fechaCreacion: Date;
    estado: boolean;
}

export interface Diente {
    diente: number;
    caraOclusal: Enfermedad;
    caraVestibular: Enfermedad;
    caraDistal: Enfermedad;
    caraMesial: Enfermedad;
    caraLingual: Enfermedad;
    observaciones: string;
}

export interface Enfermedad {
    enfermedad: string;
}
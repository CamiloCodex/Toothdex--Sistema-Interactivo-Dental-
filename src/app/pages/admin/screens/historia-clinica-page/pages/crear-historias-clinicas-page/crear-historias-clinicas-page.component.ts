import { Location } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HistoriaClinica } from '@core/interfaces/historia-clinica.interface';
import { Paciente } from '@core/interfaces/paciente.interface';
import { User } from '@core/interfaces/user.interface';
import { FirebaseService } from '@core/services/firebase.service';
import { UtilsService } from '@core/services/utils.service';
import { ButtonComponent } from '@shared/components/button/button.component';
import { PrimeNg_Modules } from '@shared/library/primeng';
import { MessageService, SelectItem } from 'primeng/api';

interface DiagEsqueleticoForm {
  diagnosticoEsqueletico: FormControl<string>;
  prognatismo: FormControl<string>;
  retrognatismo: FormControl<string>;
  tipoCrecimiento: FormControl<string>;
  alturaFacial: FormControl<string>;
  macrognatismo: FormControl<string>;
  micrognatismo: FormControl<string>;
}
interface DiagRadiograficoDentarioForm {
  protuccion: FormControl<string>;
  retruccion: FormControl<string>;
}
interface DiagEsqueleticoTejidosForm {
  tiposPerfil: FormControl<string>;
}

interface PosicionLabialForm {
  posicionLabialProquelia: FormControl<string>;
  posicionLabialRetroquelia: FormControl<string>;
}
interface DiagnosticosForm {
  facial: FormControl<string>;
  funcional: FormControl<string>;
  esqueletico: FormControl<string>;
  dental: FormControl<string>;
  planTratamiento: FormControl<string>;
  conExtracciones: FormControl;
  posiblesExtracciones: FormControl<string>;
  observaciones: FormControl<string>;
}

interface HistoriaClinicaForm {
  remitido: FormControl<string>;
  motivoConsulta: FormControl<string>;
  ruidoArticular: FormControl<string>;
  examenFrontal: FormControl<string>;
  asimetria: FormControl<string>;
  perfil: FormControl<string>;
  posicionLabial: FormControl<string>;
  hiperhipotomia: FormControl;
  habitos: FormControl<string>;
  dolorArticular: FormControl;
  dientes: FormControl<number>;
  diagEsqueletico: FormGroup<DiagEsqueleticoForm>;
  diagRadiograficoDentario: FormGroup<DiagRadiograficoDentarioForm>;
  diagEsqueleticoTejidos: FormGroup<DiagEsqueleticoTejidosForm>;
  posicionLabialForm: FormGroup<PosicionLabialForm>;
  diagnosticos: FormGroup<DiagnosticosForm>;
  estado: FormControl<boolean>;
  fechaConsulta: FormControl;
  fechaCreacion: FormControl<Date>;
}

@Component({
  selector: 'app-crear-historias-clinicas-page',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent, PrimeNg_Modules],
  templateUrl: './crear-historias-clinicas-page.component.html',
  styles: ``,
  providers: [MessageService],
})
export class CrearHistoriasClinicasPageComponent implements OnInit {
  @Input() historiaClinica: HistoriaClinica;

  private _fS = inject(FirebaseService);
  private _uS = inject(UtilsService);

  _router = inject(Router);
  _location = inject(Location);
  _mS = inject(MessageService);

  paciente!: Paciente;

  private _formBuilder = inject(FormBuilder).nonNullable;

  selectedHiperhipotomia: SelectItem[] = [
    { label: 'Hipertomía', value: 'Hipertomia' },
    { label: 'Hipotomía', value: 'Hipotomia' },
  ];

  selectedSN: SelectItem[] = [
    { label: 'Si', value: 'Si' },
    { label: 'No', value: 'No' },
  ];

  selectedPerfil: SelectItem[] = [
    { label: 'Recto', value: 'Recto' },
    { label: 'Concavo', value: 'Concavo' },
    { label: 'Convexo', value: 'Convexo' },
  ];

  selectedPosicionLabial: SelectItem[] = [
    { label: 'Normal', value: 'Normal' },
    { label: 'Protuccion', value: 'Protuccion' },
    { label: 'Retruccion', value: 'Retruccion' },
  ];
  r;

  selectedExamenFrontal: SelectItem[] = [
    { label: 'Mesoprosopo', value: 'Mesoprosopo' },
    { label: 'Euriprosopo', value: 'Euriprosopo' },
    { label: 'Lectoprosopo', value: 'Lectoprosopo' },
  ];

  selectedHabitos: SelectItem[] = [
    { label: 'Onicofagia', value: 'Onicofagia' },
    { label: 'Resp. Oral', value: 'Resp. Oral' },
    { label: 'Succión digital', value: 'Succion digital' },
    { label: 'Succión lingual', value: 'Succion lingual' },
    { label: 'Presión', value: 'Presion' },
    { label: 'Alt. fonéticas', value: 'Alt. foneticas' },
  ];

  selectedIS: SelectItem[] = [
    { label: 'Superior', value: 'Superior' },
    { label: 'Inferior', value: 'Inferior' },
  ];

  form = this._formBuilder.group<HistoriaClinicaForm>({
    remitido: this._formBuilder.control('', [Validators.required]),
    motivoConsulta: this._formBuilder.control('', [Validators.required]),
    ruidoArticular: this._formBuilder.control('', [Validators.required]),
    examenFrontal: this._formBuilder.control('', [Validators.required]),
    asimetria: this._formBuilder.control('', [Validators.required]),
    perfil: this._formBuilder.control('', [Validators.required]),
    posicionLabial: this._formBuilder.control('', [Validators.required]),
    hiperhipotomia: this._formBuilder.control('', [Validators.required]),
    habitos: this._formBuilder.control('', [Validators.required]),
    dolorArticular: this._formBuilder.control('', [Validators.required]),
    dientes: this._formBuilder.control(null, [
      Validators.required,
      Validators.min(0),
      Validators.max(32),
    ]),
    diagEsqueletico: this._formBuilder.group<DiagEsqueleticoForm>({
      diagnosticoEsqueletico: this._formBuilder.control('', [
        Validators.required,
      ]),
      prognatismo: this._formBuilder.control('', [Validators.required]),
      retrognatismo: this._formBuilder.control('', [Validators.required]),
      tipoCrecimiento: this._formBuilder.control('', [Validators.required]),
      alturaFacial: this._formBuilder.control('', [Validators.required]),
      macrognatismo: this._formBuilder.control('', [Validators.required]),
      micrognatismo: this._formBuilder.control('', [Validators.required]),
    }),
    diagRadiograficoDentario:
      this._formBuilder.group<DiagRadiograficoDentarioForm>({
        protuccion: this._formBuilder.control('', [Validators.required]),
        retruccion: this._formBuilder.control('', [Validators.required]),
      }),
    diagEsqueleticoTejidos: this._formBuilder.group<DiagEsqueleticoTejidosForm>(
      {
        tiposPerfil: this._formBuilder.control('', [Validators.required]),
      }
    ),
    posicionLabialForm: this._formBuilder.group<PosicionLabialForm>({
      posicionLabialProquelia: this._formBuilder.control('', [
        Validators.required,
      ]),
      posicionLabialRetroquelia: this._formBuilder.control('', [
        Validators.required,
      ]),
    }),
    diagnosticos: this._formBuilder.group<DiagnosticosForm>({
      facial: this._formBuilder.control('', [Validators.required]),
      funcional: this._formBuilder.control('', [Validators.required]),
      esqueletico: this._formBuilder.control('', [Validators.required]),
      dental: this._formBuilder.control('', [Validators.required]),
      planTratamiento: this._formBuilder.control('', [Validators.required]),
      conExtracciones: this._formBuilder.control('', [Validators.required]),
      posiblesExtracciones: this._formBuilder.control('', [
        Validators.required,
      ]),
      observaciones: this._formBuilder.control('', [Validators.required]),
    }),
    estado: this._formBuilder.control(true),
    fechaConsulta: this._formBuilder.control(new Date()),
    fechaCreacion: this._formBuilder.control(new Date()),
  });

  userId = {} as User;

  user(): User {
    return this._uS.getLocalStorage('user');
  }

  ngOnInit(): void {
    this.userId = this._uS.getLocalStorage('user');
    this.paciente = (this._location.getState() as any).paciente;
    this.historiaClinica = (this._location.getState() as any).historiaClinica;
    if (this.historiaClinica) {
      this.form.patchValue(this.historiaClinica);
    }
  }

  async submit() {
    if (this.form.valid) {
      this.historiaClinica ? this.editHistoria() : this.addHistoria();
    }
  }

  async addHistoria() {
    if (this.form.invalid) return;
    let path = `users/${this.userId.uid}/pacientes/${this.paciente.id}/historias-clinicas`;
    this._fS
      .addDocument(path, this.form.value)
      .then(async (res) => {
        this._mS.add({
          severity: 'success',
          summary: 'Historia Clínica creada',
          detail: 'La historia clínica ha sido creada con éxito',
        });
        setTimeout(() => {
          this._uS.routerLink('/admin/historias-clinicas');
        }, 1000);
        this.form.reset();
      })
      .catch((err) => {
        this._mS.add({
          severity: 'error',
          summary: 'Error!',
          detail: err.message,
        });
      });
  }

  async editHistoria() {
    let path = `users/${this.userId.uid}/pacientes/${this.paciente.id}/historias-clinicas/${this.historiaClinica.id}`;
    this._fS
      .updateDocument(path, this.form.value)
      .then(async (res) => {
        this._mS.add({
          severity: 'success',
          summary: 'Historia Clínica actualizada',
          detail: 'La historia clínica ha sido actualizada con éxito',
        });
        setTimeout(() => {
          this._uS.routerLink('/admin/historias-clinicas');
        }, 1000);
      })
      .catch((error) => {
        this._mS.add({
          severity: 'error',
          summary: 'Error!',
          detail: error.message,
        });
      });
  }

  cleanForm() {
    this.form.reset();
    this._mS.add({
      severity: 'info',
      summary: 'Formulario reiniciado',
      detail: 'Todos los campos del formulario fueron limpiados con éxito.',
    });
  }
}

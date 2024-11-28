import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '@shared/components/button/button.component';
import { MessageService, SelectItem } from 'primeng/api';
import { Router } from '@angular/router';
import { FirebaseService } from '@core/services/firebase.service';
import { User } from '@core/interfaces/user.interface';
import { UtilsService } from '@core/services/utils.service';
import { ContratoComponent } from '../../components/contrato/contrato.component';
import { PrimeNg_Modules } from '@shared/library/primeng';

interface pacienteForm {
  cedula: FormControl<string>;
  name: FormControl<string>;
  lastName: FormControl<string>;
  celular: FormControl<string>;
  email: FormControl<string>;
  genero: FormControl;
  address: FormControl<string>;
  estadoCivil: FormControl<string>;
  fechaNacimiento: FormControl<string>;
  antecedentes: FormControl<string>;
  otrosAntecedentes: FormControl<string>;
  medicamentos: FormControl<string>;
  estado: FormControl<boolean>;
  tratamiento: FormControl<string>;
  valorInicial: FormControl<number>;
  numeroCuotas: FormControl<number>;
  valorPorCuotas: FormControl<number>;
  fechaCreacion: FormControl<Date>;
}

@Component({
  selector: 'crear-paciente-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonComponent,
    CommonModule,
    FormsModule,
    ContratoComponent,
    PrimeNg_Modules,
  ],
  templateUrl: './crear-paciente-page.component.html',
  styles: ``,
  providers: [MessageService],
})
export class CrearPacientePageComponent implements OnInit {
  _fS = inject(FirebaseService);
  _uS = inject(UtilsService);
  _mS = inject(MessageService);

  user = {} as User;

  _router = inject(Router);

  private _formBuilder = inject(FormBuilder).nonNullable;

  selectedAntecedentes: any[] = [];

  generoOptions: SelectItem[] = [
    { label: 'Masculino', value: 'Masculino' },
    { label: 'Femenino', value: 'Femenino' },
    { label: 'Otro', value: 'Otro' },
  ];

  estadoCivilOptions: SelectItem[] = [
    { label: 'Soltero', value: 'Soltero' },
    { label: 'Casado', value: 'Casado' },
    { label: 'Divorciado', value: 'Divorciado' },
    { label: 'Viudo', value: 'Viudo' },
  ];

  antecedentes: any[] = [
    { name: 'Problemas Renales', key: 'PR' },
    { name: 'Problemas Cardiacos', key: 'PC' },
    { name: 'Diabetes', key: 'D' },
    { name: 'Embarazo', key: 'E' },
    { name: 'Procesos Hemorrágicos', key: 'PH' },
    { name: 'Hipertensión Arterial', key: 'HA' },
  ];

  form = this._formBuilder.group<pacienteForm>({
    cedula: this._formBuilder.control('', [
      Validators.required,
      Validators.minLength(7),
      Validators.maxLength(11),
    ]),
    name: this._formBuilder.control('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    lastName: this._formBuilder.control('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    celular: this._formBuilder.control('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
    ]),
    email: this._formBuilder.control('', [
      Validators.required,
      Validators.email,
    ]),
    genero: this._formBuilder.control(null, Validators.required),
    address: this._formBuilder.control('', Validators.required),
    estadoCivil: this._formBuilder.control(null, Validators.required),
    fechaNacimiento: this._formBuilder.control('', Validators.required),
    antecedentes: this._formBuilder.control(''),
    otrosAntecedentes: this._formBuilder.control(''),
    medicamentos: this._formBuilder.control(''),
    estado: this._formBuilder.control(true),
    tratamiento: this._formBuilder.control('', Validators.required),
    valorInicial: this._formBuilder.control(null, Validators.required),
    numeroCuotas: this._formBuilder.control(null, [
      Validators.required,
      Validators.min(1),
      Validators.max(36),
    ]),
    valorPorCuotas: this._formBuilder.control(null, Validators.required),
    fechaCreacion: this._formBuilder.control(new Date()),
  });

  ngOnInit(): void {
    this.user = this._uS.getLocalStorage('user');
    this.form.get('valorInicial').valueChanges.subscribe(() => {
      this.updateValorPorCuotas();
    });
    this.form.get('numeroCuotas').valueChanges.subscribe(() => {
      this.updateValorPorCuotas();
    });
  }

  async addPaciente() {
    if (this.form.invalid) return;
    let path = `users/${this.user.uid}/pacientes`;
    this._fS
      .addDocument(path, this.form.value)
      .then(async (res) => {
        this._mS.add({
          severity: 'success',
          summary: 'Paciente creado',
          detail: 'El paciente ha sido creado con éxito',
        });
        setTimeout(() => {
          this._uS.routerLink('/admin/pacientes');
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

  cancelForm() {
    this.form.reset();
    this._mS.add({
      severity: 'info',
      summary: 'Formulario reiniciado',
      detail: 'Todos los campos del formulario fueron limpiados con éxito.',
    });
  }

  handleContractAccepted() {
    this._mS.add({
      severity: 'info',
      summary: 'Confirmed',
      detail: 'You have accepted the contract',
      life: 3000,
    });
  }

  handleContractRejected() {
    this._mS.add({
      severity: 'error',
      summary: 'Rejected',
      detail: 'You have rejected the contract',
      life: 3000,
    });
  }

  get valorInicial(): number {
    return this.form.get('valorInicial').value;
  }

  get numeroCuotas(): number {
    return this.form.get('numeroCuotas').value;
  }

  updateValorPorCuotas() {
    const valorPorCuotas = this.valorInicial / this.numeroCuotas;
    this.form.patchValue({ valorPorCuotas }, { emitEvent: false });
  }
}

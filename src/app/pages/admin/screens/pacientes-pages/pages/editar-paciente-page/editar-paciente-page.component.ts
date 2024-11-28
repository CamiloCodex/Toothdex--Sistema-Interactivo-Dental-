import { CommonModule, Location } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Paciente } from '@core/interfaces/paciente.interface';
import { User } from '@core/interfaces/user.interface';
import { FirebaseService } from '@core/services/firebase.service';
import { UtilsService } from '@core/services/utils.service';
import { ButtonComponent } from '@shared/components/button/button.component';
import { MessageService, SelectItem } from 'primeng/api';
import { ContratoComponent } from '../../components/contrato/contrato.component';
import { PrimeNg_Modules } from '@shared/library/primeng';

interface pacienteForm {
  cedula: FormControl<string>;
  name: FormControl<string>;
  lastName: FormControl<string>;
  celular: FormControl<string>;
  email: FormControl<string>;
  genero: FormControl<string>;
  address: FormControl<string>;
  estadoCivil: FormControl<string>;
  fechaNacimiento: FormControl<Date>;
  antecedentes: FormControl<string[]>;
  otrosAntecedentes: FormControl<string>;
  medicamentos: FormControl<string>;
  tratamiento: FormControl<string>;
  valorInicial: FormControl<number>;
  numeroCuotas: FormControl<number>;
  valorPorCuotas: FormControl<number>;
}

@Component({
  selector: 'app-editar-paciente-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonComponent,
    CommonModule,
    FormsModule,
    ContratoComponent,
    PrimeNg_Modules,
  ],
  templateUrl: './editar-paciente-page.component.html',
  styles: ``,
  providers: [MessageService],
})
export class EditarPacientePageComponent implements OnInit {
  _location = inject(Location);
  _mS = inject(MessageService);

  paciente!: Paciente;

  user = {} as User;

  private _fS = inject(FirebaseService);
  private _uS = inject(UtilsService);

  _router = inject(Router);

  private _formBuilder = inject(FormBuilder).nonNullable;

  selectedAntecedentes: any[] = [];

  formD!: any;

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
    genero: this._formBuilder.control('', Validators.required),
    address: this._formBuilder.control('', Validators.required),
    estadoCivil: this._formBuilder.control('', Validators.required),
    fechaNacimiento: this._formBuilder.control(null, Validators.required),
    antecedentes: this._formBuilder.control<string[]>([]),
    otrosAntecedentes: this._formBuilder.control(''),
    medicamentos: this._formBuilder.control(''),
    tratamiento: this._formBuilder.control('', Validators.required),
    valorInicial: this._formBuilder.control(null, Validators.required),
    numeroCuotas: this._formBuilder.control(null, Validators.required),
    valorPorCuotas: this._formBuilder.control(null, Validators.required),
  });

  ngOnInit(): void {
    this.user = this._uS.getLocalStorage('user');
    this.paciente = (this._location.getState() as any).paciente;
    this.form.patchValue({
      cedula: this.paciente.cedula,
      name: this.paciente.name,
      lastName: this.paciente.lastName,
      celular: this.paciente.celular,
      email: this.paciente.email,
      genero: this.paciente.genero,
      address: this.paciente.address,
      estadoCivil: this.paciente.estadoCivil,
      fechaNacimiento: this.paciente.fechaNacimiento,
      otrosAntecedentes: this.paciente.otrosAntecedentes,
      medicamentos: this.paciente.medicamentos,
      antecedentes: this.paciente.antecedentes as unknown as string[],
      tratamiento: this.paciente.tratamiento,
      valorInicial: this.paciente.valorInicial,
      numeroCuotas: this.paciente.numeroCuotas,
      valorPorCuotas: this.paciente.valorPorCuotas,
    });
    this.selectedAntecedentes = this.paciente.antecedentes as unknown as any[];
  }

  async editPaciente() {
    let path = `users/${this.user.uid}/pacientes/${this.paciente.id}`;
    this._fS
      .updateDocument(path, this.form.value)
      .then(async (res) => {
        this._mS.add({
          severity: 'success',
          summary: 'Paciente actualizado',
          detail: 'El paciente ha sido actualizado con éxito',
        });
        setTimeout(() => {
          this._uS.routerLink('/admin/pacientes');
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
}

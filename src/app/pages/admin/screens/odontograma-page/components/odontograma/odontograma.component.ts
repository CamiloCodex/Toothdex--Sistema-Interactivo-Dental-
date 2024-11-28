import { CommonModule, Location } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Odontograma } from '@core/interfaces/odontograma-interface';
import { Paciente } from '@core/interfaces/paciente.interface';
import { User } from '@core/interfaces/user.interface';
import { FirebaseService } from '@core/services/firebase.service';
import { UtilsService } from '@core/services/utils.service';
import { TitleComponent } from '@pages/admin/components/title/title.component';
import { ButtonComponent } from '@shared/components/button/button.component';
import { PrimeNg_Modules } from '@shared/library/primeng';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-odontograma',
  standalone: true,
  imports: [
    TitleComponent,
    ReactiveFormsModule,
    ButtonComponent,
    CommonModule,
    FormsModule,
    PrimeNg_Modules,
  ],
  templateUrl: './odontograma.component.html',
  providers: [MessageService],
  styles: ``,
})
export class OdontogramaComponent implements OnInit {
  @Input() odontograma: Odontograma;

  _fS = inject(FirebaseService);
  _mS = inject(MessageService);
  _uS = inject(UtilsService);
  _fB = inject(FormBuilder);
  _location = inject(Location);

  displayModal: boolean = false;
  selectedDiente: any;
  selectedDienteIndex: any;
  form: FormGroup;

  enfermedad: string;
  paciente!: Paciente;
  teethLeft = [18, 17, 16, 15, 14, 13, 12, 11];
  subTeethLeft = [55, 54, 53, 52, 51];
  teethRight = [21, 22, 23, 24, 25, 26, 27, 28];
  subTeethRight = [61, 62, 63, 64, 65];
  teethBottomLeft = [48, 47, 46, 45, 44, 43, 42, 41];
  upTeethBottomLeft = [85, 84, 83, 82, 81];
  upTeethBottomRight = [71, 72, 73, 74, 75];
  teethBottomRight = [31, 32, 33, 34, 35, 36, 37, 38];

  dientes = [
    ...this.teethLeft,
    ...this.teethRight,
    ...this.subTeethLeft,
    ...this.subTeethRight,
    ...this.upTeethBottomLeft,
    ...this.upTeethBottomRight,
    ...this.teethBottomLeft,
    ...this.teethBottomRight,
  ];

  caras = [
    {
      formControlName: 'caraVestibular',
      label: 'Cara Vestibular',
      placeholder: 'Cara Vestibular',
      value: 'Vestibular',
    },
    {
      formControlName: 'caraMesial',
      label: 'Cara Mesial',
      placeholder: 'Cara Mesial',
      value: 'Mesial',
    },
    {
      formControlName: 'caraOclusal',
      label: 'Cara Oclusal',
      placeholder: 'Cara Oclusal',
      value: 'Oclusal',
    },
    {
      formControlName: 'caraDistal',
      label: 'Cara Distal',
      placeholder: 'Cara Distal',
      value: 'Distal',
    },
    {
      formControlName: 'caraLingual',
      label: 'Cara Lingual',
      placeholder: 'Cara Lingual',
      value: 'Lingual',
    },
  ];

  enfermedades = [
    { label: 'Amalg', value: 'amalg' },
    { label: 'Caries', value: 'caries' },
    { label: 'Corona', value: 'corona' },
    { label: 'Endodoncia Indicada', value: 'endodoncia-indicada' },
    { label: 'Endodoncia Realizada', value: 'endodoncia-realizada' },
    { label: 'Exodoncia Realizada', value: 'exodoncia-realizada' },
    { label: 'Fractura', value: 'fractura' },
    { label: 'Ninguna', value: 'ninguna' },
    { label: 'Prótesis Existente', value: 'protesis-existente' },
    { label: 'Recina', value: 'recina' },
    { label: 'Sin Erupcionar', value: 'sin-erupcionar' },
  ];

  user(): User {
    return this._uS.getLocalStorage('user');
  }

  constructor() {
    this.form = this._fB.group({
      id: this._fB.control(''),
      dientes: this._fB.array([]),
      fechaCreacion: this._fB.control(new Date()),
      estado: this._fB.control(true),
    });
  }

  ngOnInit() {
    this.paciente = (this._location.getState() as any).paciente;
    this.odontograma = (this._location.getState() as any).odontograma;
    this.inicializarDientes();
    if (this.odontograma) {
      this.form.patchValue(this.odontograma);
    }
  }

  get dienteFormArray() {
    return this.form.get('dientes') as FormArray;
  }

  inicializarDientes() {
    this.dientes.forEach((diente) => {
      this.dienteFormArray.push(this.createDienteForm(diente));
    });
  }

  createDienteForm(diente: number) {
    return this._fB.group({
      diente: this._fB.control(diente, [Validators.required]),
      caraOclusal: this._fB.group({
        enfermedad: '',
      }),
      caraVestibular: this._fB.group({
        enfermedad: '',
      }),
      caraDistal: this._fB.group({
        enfermedad: '',
      }),
      caraMesial: this._fB.group({
        enfermedad: '',
      }),
      caraLingual: this._fB.group({
        enfermedad: '',
      }),
      observaciones: this._fB.control(''),
    });
  }

  getCaraClase(diente: number, cara: string): string {
    // Encontrar el índice del diente en el FormArray
    const dienteIndex = this.dienteFormArray.controls.findIndex(
      (control) => control.value.diente === diente
    );
    if (dienteIndex === -1) {
      return '';
    }

    // Obtener el control del diente específico
    const dienteControl = this.dienteFormArray.at(dienteIndex);

    // Obtener la enfermedad de la cara específica del diente
    let enfermedad = '';
    const caraControl = dienteControl.get(`${cara}.enfermedad`);
    if (caraControl && caraControl.value.length > 0) {
      enfermedad = caraControl.value[0];
    }

    // Devuelve el color basado en la enfermedad
    return this.getColorPorEnfermedad(enfermedad);
  }

  openModal(diente: number) {
    this.selectedDienteIndex = this.dienteFormArray.controls.findIndex(
      (control) => control.value.diente === diente
    );
    if (this.selectedDienteIndex !== -1) {
      this.displayModal = true;
    }
    console.log(this.selectedDienteIndex);
  }

  async submit() {
    if (this.form.valid) {
      this.odontograma ? this.editOdontograma() : this.addOdontograma();
    }
  }

  addOdontograma() {
    let path = `users/${this.user().uid}/pacientes/${
      this.paciente.id
    }/odontogramas`;
    delete this.form.value.id;
    this._fS
      .addDocument(path, this.form.value)
      .then(async (res) => {
        this._mS.add({
          severity: 'success',
          summary: 'Odontograma creado',
          detail: 'El odontograma ha sido creado con éxito',
        });
        setTimeout(() => {
          this.displayModal = false;
          this._uS.routerLink('admin/odontogramas/table-odontograma');
        }, 1000);
      })
      .catch((err) => {
        this._mS.add({
          severity: 'error',
          summary: 'Error!',
          detail: err.message,
        });
      });
  }

  async editOdontograma() {
    let path = `users/${this.user().uid}/pacientes/${
      this.paciente.id
    }/odontogramas/${this.odontograma.id}`;
    delete this.form.value.id;
    this._fS
      .updateDocument(path, this.form.value)
      .then(async (res) => {
        this._mS.add({
          severity: 'success',
          summary: 'Odontograma actualizado',
          detail: 'El odontograma ha sido actualizado con éxito',
        });
        this.displayModal = false;
      })
      .catch((error) => {
        this._mS.add({
          severity: 'error',
          summary: 'Error!',
          detail: error.message,
        });
      });
  }

  getColorPorEnfermedad(enfermedad: string): string {
    switch (enfermedad) {
      case 'caries':
        return 'bg-red-500 text-white';
      case 'fractura':
        return 'bg-orange-500 text-white';
      case 'recina':
        return 'bg-blue-500 text-white';
      case 'amalg':
        return 'bg-yellow-500 text-white';
      case 'exodoncia-realizada':
        return 'bg-green-500 text-white';
      case 'sin-erupcionar':
        return 'bg-gray-500 text-white';
      case 'endodoncia-realizada':
        return 'bg-purple-500 text-white';
      case 'endodoncia-indicada':
        return 'bg-pink-500 text-white';
      case 'protesis-existente':
        return 'bg-indigo-500 text-white';
      case 'corona':
        return 'bg-teal-500 text-white';
      default:
        return 'ninguna';
    }
  }
}

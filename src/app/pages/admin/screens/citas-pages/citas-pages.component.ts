import { Component, OnInit } from '@angular/core';
import { TitleComponent } from '../../components/title/title.component';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '@shared/components/button/button.component';
import FileSaver from 'file-saver';
import { CommonModule, DatePipe, Location } from '@angular/common';
import { MessageService, SelectItem } from 'primeng/api';
import { User } from '@core/interfaces/user.interface';
import { FirebaseService } from '@core/services/firebase.service';
import { UtilsService } from '@core/services/utils.service';
import { Paciente } from '@core/interfaces/paciente.interface';
import { Cita } from '@core/interfaces/cita-interface';
import { PrimeNg_Modules } from '@shared/library/primeng';

interface Column {
  field: string;
  header: string;
  customExportHeader?: string;
}

interface ExportColumn {
  title: string;
  dataKey: string;
}

interface CitaForm {
  id: FormControl;
  fecha: FormControl;
  motivo: FormControl;
  tiposEstado: FormControl;
  estado: FormControl;
  fechaCreacion: FormControl;
}

@Component({
  selector: 'admin-citas-pages',
  standalone: true,
  templateUrl: './citas-pages.component.html',
  styles: ``,
  imports: [
    TitleComponent,
    FormsModule,
    ButtonComponent,
    CommonModule,
    ReactiveFormsModule,
    DatePipe,
    PrimeNg_Modules
  ],
  providers: [MessageService],
})
export class CitasPagesComponent implements OnInit {
  value: string | undefined;

  date: Date | undefined;

  minDate: Date = new Date();

  datetime12h: Date[] | undefined;

  datetime24h: Date[] | undefined;

  time: Date[] | undefined;

  hourFormat: string = '12';

  clonedCitas: { [s: string]: Cita } = {};

  cols!: Column[];

  exportColumns!: ExportColumn[];

  citas!: Cita[];

  selectedCitas!: Cita[];

  user1 = {} as User;

  paciente!: Paciente;

  cita!: Cita;

  tiposEstados!: SelectItem[];

  constructor(
    private _mS: MessageService,
    private _fS: FirebaseService,
    private _uS: UtilsService,
    private _location: Location,
    private _fB: FormBuilder
  ) {}

  user(): User {
    return this._uS.getLocalStorage('user');
  }

  ngOnInit() {
    this.user1 = this._uS.getLocalStorage('user');
    this.paciente = (this._location.getState() as any).paciente;
    this.cita = (this._location.getState() as any).cita;
    this.getCitas();
    this.tiposEstados = [
      { label: 'Pendiente', value: 'PENDIENTE' },
      { label: 'Completado', value: 'COMPLETADO' },
    ];
  }

  form = this._fB.group<CitaForm>({
    id: new FormControl(''),
    motivo: this._fB.control('', [Validators.required]),
    fecha: this._fB.control(null, [Validators.required]),
    tiposEstado: this._fB.control('PENDIENTE', [Validators.required]),
    estado: this._fB.control(true),
    fechaCreacion: this._fB.control(new Date()),
  });

  getCitas() {
    const userId = this.user().uid;
    const pacienteId = this.paciente.id;

    if (!userId || !pacienteId) {
      console.error('Missing userId or pacienteId');
      return;
    }

    let path = `users/${userId}/pacientes/${pacienteId}/citas`;

    let sub = this._fS.getCollectionData(path).subscribe({
      next: (res: any) => {
        this.citas = res.map((cita: any) => {
          return {
            ...cita,
            fecha: cita.fecha ? cita.fecha.toDate() : null,
          };
        });
        sub.unsubscribe();
      },
      error: (error) => {
        this._mS.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Ha ocurrido un error al obtener las citas',
        });
      },
    });
  }

  async saveCita() {
    if (this.form.invalid) return;
    let path = `users/${this.user1.uid}/pacientes/${this.paciente.id}/citas`;
    delete this.form.value.id;
    this._fS
      .addDocument(path, this.form.value)
      .then(async (res) => {
        this._mS.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'La cita ha sido creada con éxito',
        });
        this.form.reset();
        this.getCitas();
      })
      .catch((err) => {
        this._mS.add({
          severity: 'error',
          summary: 'Error!',
          detail: err.message,
        });
      });
  }

  exportPdf() {
    import('jspdf').then((jsPDF) => {
      import('jspdf-autotable').then((x) => {
        const doc = new jsPDF.default('p', 'px', 'a4');
        (doc as any).autoTable(this.exportColumns, this.citas);
        doc.save('citas.pdf');
      });
    });
  }

  exportExcel() {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.citas);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'citas');
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    FileSaver.saveAs(
      data,
      fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
    );
  }

  onRowEditInit(cita: Cita) {
    this.clonedCitas[cita.id as string] = { ...cita };
  }

  async editCita(cita: Cita) {
    const userId = this.user().uid;
    const pacienteId = this.paciente.id;
    const citaId = cita.id;

    if (!userId || !pacienteId || !citaId) {
      console.error('Missing userId or pacienteId or citaId');
      return;
    }

    const path = `users/${userId}/pacientes/${pacienteId}/citas/${citaId}`;
    
    const { id, ...citaSinId } = cita;

    try {
      await this._fS.updateDocument(path, citaSinId);
      this._mS.add({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Cita actualizada con éxito',
      });
      this._uS.routerLink('/admin/pacientes/citas');
      this.getCitas();
    } catch (error) {
      console.error(path, error);
      this._mS.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Ha ocurrido un error al actualizar la cita',
      });
    }
  }

  onRowEditCancel(cita: Cita, index: number) {
    this.citas[index] = this.clonedCitas[cita.id as string];
    delete this.clonedCitas[cita.id as string];
  }

  getSeverity(status: string) {
    switch (status) {
      case 'COMPLETADO':
        return 'success';
      case 'PENDIENTE':
        return 'danger';
      default:
        return 'success';
    }
  }
}

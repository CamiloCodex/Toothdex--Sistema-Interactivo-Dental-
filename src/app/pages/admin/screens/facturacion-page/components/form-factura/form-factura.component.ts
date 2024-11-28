import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FirebaseService } from '@core/services/firebase.service';
import { UtilsService } from '@core/services/utils.service';
import { ButtonComponent } from '@shared/components/button/button.component';
import { User } from '@core/interfaces/user.interface';
import { Paciente } from '@core/interfaces/paciente.interface';
import { CommonModule, DatePipe, Location } from '@angular/common';
import { Factura } from '@core/interfaces/facturación-interface';
import { MessageService } from 'primeng/api';
import { abonoNoMayorQueCosto } from '@core/validators/costo.validators';
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

interface FacturaForm {
  id: FormControl;
  servicioRealizado: FormControl;
  costoServicio: FormControl;
  abono: FormControl;
  estado: FormControl<boolean>;
  fechaCreacion: FormControl<Date>;
}

@Component({
  selector: 'form-factura',
  standalone: true,
  imports: [
    FormsModule,
    ButtonComponent,
    CommonModule,
    ReactiveFormsModule,
    DatePipe,
    PrimeNg_Modules,
  ],
  templateUrl: './form-factura.component.html',
  styles: ``,
  providers: [MessageService],
})
export class FormFacturaComponent implements OnInit {
  _fS = inject(FirebaseService);
  _uS = inject(UtilsService);
  _fB = inject(FormBuilder);
  _mS = inject(MessageService);
  _location = inject(Location);

  date: Date | undefined;

  minDate: Date = new Date();

  maxDate: Date = new Date();

  hourFormat: string = '12';

  user1 = {} as User;

  paciente!: Paciente;

  facturas: Factura[] = [];

  cols!: Column[];

  exportColumns!: ExportColumn[];

  clonedFactura: { [s: string]: Factura } = {};

  user(): User {
    return this._uS.getLocalStorage('user');
  }

  ngOnInit() {
    this.user1 = this._uS.getLocalStorage('user');
    this.paciente = (this._location.getState() as any).paciente;
    this.getFacturas();
  }

  form = this._fB.group<FacturaForm>(
    {
      id: new FormControl(''),
      servicioRealizado: this._fB.control('', [Validators.required]),
      costoServicio: this._fB.control('', [Validators.required]),
      abono: this._fB.control(null, [Validators.required]),
      estado: this._fB.control(true),
      fechaCreacion: this._fB.control(new Date()),
    },
    // { validators: abonoNoMayorQueCosto() }
  );

  getFacturas() {
    const userId = this.user().uid;
    const pacienteId = this.paciente.id;

    if (!userId || !pacienteId) {
      console.error('No se encuetran facturas para este paciente.');
      return;
    }

    let path = `users/${userId}/pacientes/${pacienteId}/facturas`;

    let sub = this._fS.getCollectionData(path).subscribe({
      next: (res: any) => {
        this.facturas = res.map((factura: any) => {
          return {
            ...factura,
            fechaCreacion: factura.fechaCreacion
              ? factura.fechaCreacion.toDate()
              : null,
          };
        });
        sub.unsubscribe();
      },
      error: (error) => {
        this._mS.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Ha ocurrido un error al obtener las facturas',
        });
      },
    });
  }

  async saveFactura() {
    if (this.form.invalid) return;
    let path = `users/${this.user1.uid}/pacientes/${this.paciente.id}/facturas`;
    delete this.form.value.id;
    this._fS
      .addDocument(path, this.form.value)
      .then(async (res) => {
        this._mS.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Factura creada con éxito',
        });
        this.getFacturas();
        this.form.controls['servicioRealizado'].reset();
        this.form.controls['costoServicio'].reset();
        this.form.controls['abono'].reset();
      })
      .catch((err) => {
        console.log(err);
        this._mS.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Ha ocurrido un error al crear la factura',
        });
      });
  }

  async editFactura(factura: Factura) {
    const userId = this.user().uid;
    const pacienteId = this.paciente.id;
    const facturaId = factura.id;

    if (!userId || !pacienteId || !facturaId) {
      console.error('Missing userId or pacienteId or citaId');
      return;
    }

    const path = `users/${userId}/pacientes/${pacienteId}/facturas/${facturaId}`;

    const { id, ...facturaSinId } = factura;

    if (!this.validateAbono(facturaSinId)) return;

    this._fS
      .updateDocument(path, facturaSinId)
      .then((res) => {
        this._mS.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Factura actualizada con éxito',
        });
        this.getFacturas();
      })
      .catch((err) => {
        console.log(err);
        this._mS.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Ha ocurrido un error al actualizar la factura',
        });
      });
  }

  imprimirFactura(factura: Factura) {
    console.log(factura);
  }

  onRowEditInit(factura: Factura) {
    this.clonedFactura[factura.id as string] = { ...factura };
  }

  onRowEditCancel(factura: Factura, index: number) {
    this.facturas[index] = this.clonedFactura[factura.id as string];
    delete this.clonedFactura[factura.id as string];
  }

  getGanacias() {
    return this.facturas.reduce(
      (index, facturas) => index + facturas.costoServicio,
      0
    );
  }

  getAbonos() {
    return this.facturas.reduce((index, facturas) => index + facturas.abono, 0);
  }

  validateAbono(factura: any): boolean {
    if (factura.abono > factura.costoServicio) {
      this._mS.add({
        severity: 'error',
        summary: 'Error',
        detail: 'El abono no puede ser mayor al costo del servicio.',
      });
      this.getFacturas();
      return false;
    }
    return true;
  }

  exportPdf(facturaEspecifica?: Factura) {
    import('jspdf').then((jsPDF) => {
      import('jspdf-autotable').then((x) => {
        const doc = new jsPDF.default('p', 'px', 'a4');

        const logoUrl = './assets/logo.png';
        const img = new Image();
        img.src = logoUrl;
        img.onload = () => {
          const imgWidth = 100;
          const imgHeight = (img.height * imgWidth) / img.width;
          const pageWidth = doc.internal.pageSize.getWidth();
          const centerX = (pageWidth - imgWidth) / 2;

          doc.addImage(img, 'PNG', centerX, 20, imgWidth, imgHeight);

          const finalY = 20 + imgHeight + 10;

          const facturasAExportar = facturaEspecifica
            ? [facturaEspecifica]
            : this.facturas;

          let totalCostoServicio = 0,
            totalAbono = 0,
            totalDeuda = 0;
          if (!facturaEspecifica) {
            totalCostoServicio = facturasAExportar.reduce(
              (sum, factura) => sum + factura.costoServicio,
              0
            );
            totalAbono = facturasAExportar.reduce(
              (sum, factura) => sum + factura.abono,
              0
            );
            totalDeuda = totalCostoServicio - totalAbono;
          }

          const body = facturasAExportar.map((factura) => [
            factura.fechaCreacion
              ? factura.fechaCreacion.toLocaleDateString()
              : '',
            factura.servicioRealizado,
            factura.costoServicio.toFixed(2),
            factura.abono.toFixed(2),
            (factura.costoServicio - factura.abono).toFixed(2),
          ]);

          if (!facturaEspecifica) {
            body.push([
              'Totales',
              '',
              totalCostoServicio.toFixed(2),
              totalAbono.toFixed(2),
              totalDeuda.toFixed(2),
            ]);
          }

          (doc as any).autoTable({
            startY: finalY,
            head: [
              [
                'Fecha',
                'Servicio Realizado',
                'Costo del servicio',
                'Abono',
                'Deuda',
              ],
            ],
            body: body,
          });

          doc.save(
            facturaEspecifica
              ? `factura_${facturaEspecifica.id}.pdf`
              : 'facturas.pdf'
          );
        };
      });
    });
  }
}

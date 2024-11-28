import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import FileSaver from 'file-saver';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

interface Column {
  field: string;
  header: string;
  customExportHeader?: string;
}

interface ExportColumn {
  title: string;
  dataKey: string;
}

interface Servicio {
  code: string;
  service: string;
  valorUnitario: number;
  valorTotal: number;
}

@Component({
  selector: 'tabla-servicios-realizados',
  standalone: true,
  imports: [
    TableModule,
    CommonModule,
    ButtonModule
  ],
  templateUrl: './tabla-servicios-realizados.component.html',
  styles: ``
})
export class TablaServiciosRealizadosComponent {
  servicios!: Servicio[];

  selectedServicios!: Servicio[];


  cols!: Column[];

  exportColumns!: ExportColumn[];

  ngOnInit() {

    this.cols = [
      { field: 'code', header: 'Número de Servicio', customExportHeader: 'Número de Servicio' },
      { field: 'service', header: 'Servicios Ofrecidos' },
      { field: 'valorUnitario', header: 'Valor Unitario' },
      { field: 'valorTotal', header: 'Valor Total' }
    ];

    this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
  }

  exportPdf() {
    import('jspdf').then((jsPDF) => {
      import('jspdf-autotable').then((x) => {
        const doc = new jsPDF.default('p', 'px', 'a4');
        (doc as any).autoTable(this.exportColumns, this.servicios);
        doc.save('servicios.pdf');
      });
    });
  }

  exportExcel() {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.servicios);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, 'servicios');
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }
}

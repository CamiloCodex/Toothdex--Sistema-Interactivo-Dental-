import { Routes } from '@angular/router';
import { OdontogramaPageComponent } from './odontograma-page.component';
import { OdontogramaComponent } from './components/odontograma/odontograma.component';
import { TableOdontogramaComponent } from './components/table-odontograma/table-odontograma.component';
import { HistorialOdontogramaComponent } from './components/historial-odontograma/historial-odontograma.component';

export default [
  {
    path: '',
    component: OdontogramaPageComponent,
    children: [
      {
        path: 'table-odontograma',
        component: TableOdontogramaComponent,
      },
      {
        path: 'odontograma',
        component: OdontogramaComponent,
      },
      {
        path: 'historial-odontograma',
        component: HistorialOdontogramaComponent,
      },
      {
        path: '**',
        redirectTo: 'table-odontograma',
      },
    ],
  },
] as Routes;

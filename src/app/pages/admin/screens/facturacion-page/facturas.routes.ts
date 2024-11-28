import { Routes } from '@angular/router';
import { FacturacionPageComponent } from './facturacion-page.component';
import { FacturacionComponent } from './components/facturacion/facturacion.component';
import { FormFacturaComponent } from './components/form-factura/form-factura.component';

export default [
  {
    path: '',
    component: FacturacionPageComponent,
    children: [
      {
        path: 'factura',
        component: FacturacionComponent,
      },
      {
        path: 'crear-factura',
        component: FormFacturaComponent,
      },
      {
        path: '**',
        redirectTo: 'factura',
      },
    ],
  },
] as Routes;

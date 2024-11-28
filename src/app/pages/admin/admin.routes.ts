import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { InicioPageComponent } from './screens/inicio-page/inicio-page.component';

export default [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'inicio',
        component: InicioPageComponent,
      },
      {
        path: 'pacientes',
        loadChildren: () =>
          import('./screens/pacientes-pages/pacientes.routes'),
      },
      {
        path: 'historias-clinicas',
        loadChildren: () =>
          import('./screens/historia-clinica-page/historias-clinicas.routes'),
      },
      {
        path: 'servicios',
        loadChildren: () => import('./screens/servicios-page/servicios.routes'),
      },
      {
        path: 'odontogramas',
        loadChildren: () =>
          import('./screens/odontograma-page/odontograma.routes'),
      },
      {
        path: 'facturacion',
        loadChildren: () =>
          import('./screens/facturacion-page/facturas.routes'),
      },
      {
        path: '**',
        redirectTo: 'inicio',
      },
    ],
  },
] as Routes;

import { Routes } from '@angular/router';
import { HistoriaClinicaPageComponent } from './historia-clinica-page.component';
import { ListaHistoriasClinicasPageComponent } from './pages/lista-historias-clinicas-page/lista-historias-clinicas-page.component';
import { CrearHistoriasClinicasPageComponent } from './pages/crear-historias-clinicas-page/crear-historias-clinicas-page.component';
import { TablaHistorialClinicoComponent } from './components/tabla-historial-clinico/tabla-historial-clinico.component';

export default [
  {
    path: '',
    component: HistoriaClinicaPageComponent,
    children: [
      {
        path: 'lista-historias-clinicas',
        component: ListaHistoriasClinicasPageComponent,
      },
      {
        path: 'historia-clinica',
        component: CrearHistoriasClinicasPageComponent,
      },
      {
        path: 'historial-clinico',
        component: TablaHistorialClinicoComponent,
      },
      {
        path: '**',
        redirectTo: 'lista-historias-clinicas',
      },
    ],
  },
] as Routes;

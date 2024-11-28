import { Routes } from '@angular/router';
import { PacientesPagesComponent } from './pacientes-pages.component';
import { ListaPacientesPageComponent } from './pages/lista-pacientes-page/lista-pacientes-page.component';
import { CrearPacientePageComponent } from './pages/crear-paciente-page/crear-paciente-page.component';
import { EditarPacientePageComponent } from './pages/editar-paciente-page/editar-paciente-page.component';
import { CitasPagesComponent } from '../citas-pages/citas-pages.component';

export default [
  {
    path: '',
    component: PacientesPagesComponent,
    children: [
      {
        path: 'lista-pacientes',
        component: ListaPacientesPageComponent,
      },
      {
        path: 'crear-paciente',
        component: CrearPacientePageComponent,
      },
      {
        path: 'editar-paciente',
        component: EditarPacientePageComponent,
      },
      {
        path: 'citas',
        component: CitasPagesComponent,
      },
      {
        path: '**',
        redirectTo: 'lista-pacientes',
      },
    ],
  },
] as Routes;

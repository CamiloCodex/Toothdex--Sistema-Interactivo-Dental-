import { Component } from '@angular/core';
import { TablaPacientesComponent } from '../../components/tabla-pacientes/tabla-pacientes.component';

@Component({
  selector: 'lista-pacientes-page',
  standalone: true,
  imports: [TablaPacientesComponent],
  template: `<tabla-pacientes />`,
  styles: ``,
})
export class ListaPacientesPageComponent {}

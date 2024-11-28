import { Component } from '@angular/core';
import { TablaHistoriaClinicaComponent } from '../../components/tabla-historia-clinica/tabla-historia-clinica.component';

@Component({
  selector: 'app-lista-historias-clinicas-page',
  standalone: true,
  imports: [TablaHistoriaClinicaComponent],
  templateUrl: './lista-historias-clinicas-page.component.html',
  styles: ``,
})
export class ListaHistoriasClinicasPageComponent {}

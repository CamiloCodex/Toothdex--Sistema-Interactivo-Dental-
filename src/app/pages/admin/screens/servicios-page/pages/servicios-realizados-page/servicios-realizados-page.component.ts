import { Component } from '@angular/core';
import { ServiciosFormComponent } from '../../components/servicios-form/servicios-form.component';
import { TablaServiciosRealizadosComponent } from '../../components/tabla-servicios-realizados/tabla-servicios-realizados.component';

@Component({
  selector: 'app-servicios-realizados-page',
  standalone: true,
  imports: [
    ServiciosFormComponent,
    TablaServiciosRealizadosComponent,
  ],
  templateUrl: './servicios-realizados-page.component.html',
  styles: ``
})
export class ServiciosRealizadosPageComponent {

}

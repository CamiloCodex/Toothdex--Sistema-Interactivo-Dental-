import { Component } from '@angular/core';
import { ServiciosFormComponent } from '../../components/servicios-form/servicios-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TablaServiciosOfrecidosComponent } from '../../components/tabla-servicios-ofrecidos/tabla-servicios-ofrecidos.component';

@Component({
  selector: 'app-servicios-ofrecidos-page',
  standalone: true,
  imports: [
    ServiciosFormComponent,
    ReactiveFormsModule,
    TablaServiciosOfrecidosComponent
    
  ],
  templateUrl: './servicios-ofrecidos-page.component.html',
  styles: ``
})
export class ServiciosOfrecidosPageComponent {

}

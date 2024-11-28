import { Component, Input } from '@angular/core';
import { ButtonComponent } from '@shared/components/button/button.component';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'servicios-form',
  standalone: true,
  imports: [
    FloatLabelModule,
    InputTextModule,
    ButtonComponent,
  ],
  templateUrl: './servicios-form.component.html',
  styles: ``
})
export class ServiciosFormComponent {
  @Input() title: string = 'Nombre del servicio';
}

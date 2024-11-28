import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'public-card-info',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, DialogModule],
  templateUrl: './card-info.component.html',
  styles: [`
    :host ::ng-deep {
      .p-card {
        background: var(--surface-card);
        border: 1px solid var(--surface-border);
      }

      .p-card-content {
        padding: 0;
      }

      .p-dialog-content {
        padding: 2rem;
      }

      .p-button.p-button-outlined {
        &:hover {
          background: var(--primary-color);
          color: white;
          border-color: var(--primary-color);
        }
      }
    }
  `]
})
export class CardInfoComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() img: string = '';

  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }

  scheduleAppointment() {
    // Implementar lógica para agendar cita
    this.visible = false;
  }
}

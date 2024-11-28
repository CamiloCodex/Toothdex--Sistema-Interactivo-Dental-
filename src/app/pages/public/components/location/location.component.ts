import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './location.component.html',
  styles: [`
    :host ::ng-deep {
      .surface-100 {
        transition: all 0.3s ease;

        &:hover {
          background-color: var(--surface-200);
          transform: translateX(5px);
        }
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
export class LocationComponent {
  openDirections() {
    window.open('https://www.google.com/maps?daddr=Consultorio+Odontológico+Maximiliano+Manjarrez,+Valledupar,+Cesar', '_blank');
  }

  callNow() {
    window.location.href = 'tel:+573046426769';
  }
}

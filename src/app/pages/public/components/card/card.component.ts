import { Component, Input } from '@angular/core';
import { PrimeNg_Modules } from '@shared/library/primeng';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'public-card',
  standalone: true,
  imports: [PrimeNg_Modules],
  templateUrl: './card.component.html',
  styles: `:host ::ng-deep {
    .p-card {
      background: var(--surface-card);
      border: 1px solid var(--surface-border);
    }

    .p-card-content {
      padding: 0;
    }

    .p-card-body {
      padding: 2rem;
    }

    .p-button.p-button-outlined {
      &:hover {
        background: var(--primary-color);
        color: white;
        border-color: var(--primary-color);
      }
    }
  }`,
})
export class CardComponent {
  @Input({ required: true }) title: string = 'Title Card';
  @Input({ required: false }) subtitle?: string;
  @Input({ required: true }) description: string = 'Description Card';
}

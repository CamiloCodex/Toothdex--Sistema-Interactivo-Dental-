import { Component, Input } from '@angular/core';
import { PrimeNg_Modules } from '@shared/library/primeng';

@Component({
  selector: 'admin-title',
  standalone: true,
  imports: [PrimeNg_Modules],
  templateUrl: './title.component.html',
  styles: ``,
})
export class TitleComponent {
  @Input({ required: true }) title!: string;
}

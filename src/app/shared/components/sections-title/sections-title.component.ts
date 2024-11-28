import { Component, Input } from '@angular/core';
import { PrimeNg_Modules } from '@shared/library/primeng';

@Component({
  selector: 'shared-sections-title',
  standalone: true,
  imports: [PrimeNg_Modules],
  templateUrl: './sections-title.component.html',
  styles: ``,
})
export class SectionsTitleComponent {
  @Input({ required: true }) title!: string;
}

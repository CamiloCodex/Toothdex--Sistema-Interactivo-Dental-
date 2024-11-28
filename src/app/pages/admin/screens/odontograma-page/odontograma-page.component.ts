import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TitleComponent } from '@pages/admin/components/title/title.component';

@Component({
  selector: 'admin-odontograma-page',
  standalone: true,
  templateUrl: './odontograma-page.component.html',
  styles: ``,
  imports: [RouterOutlet, TitleComponent],
})
export class OdontogramaPageComponent {}

import { Component, inject } from '@angular/core';
import { UtilsService } from '@core/services/utils.service';
import { PrimeNg_Modules } from '@shared/library/primeng';

@Component({
  selector: 'app-error404-page',
  standalone: true,
  imports: [PrimeNg_Modules],
  templateUrl: './error404-page.component.html',
  styles: ``,
})
export class Error404PageComponent {
  _uS = inject(UtilsService);
}

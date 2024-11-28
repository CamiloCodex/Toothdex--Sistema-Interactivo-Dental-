import { Component } from '@angular/core';
import { TitleComponent } from "../../components/title/title.component";
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'admin-facturacion-page',
    standalone: true,
    templateUrl: './facturacion-page.component.html',
    styles: ``,
    imports: [
        TitleComponent,
        RouterOutlet,
    ]
})
export class FacturacionPageComponent {

}

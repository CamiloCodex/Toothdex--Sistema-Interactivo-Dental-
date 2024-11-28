import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TitleComponent } from "../../components/title/title.component";

@Component({
    selector: 'app-servicios-page',
    standalone: true,
    templateUrl: './servicios-page.component.html',
    styles: ``,
    imports: [RouterModule, TitleComponent]
})
export class ServiciosPageComponent {

}

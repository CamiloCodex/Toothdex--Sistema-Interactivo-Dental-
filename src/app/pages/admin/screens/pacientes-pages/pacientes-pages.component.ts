import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TitleComponent } from '@pages/admin/components/title/title.component';

@Component({
  selector: 'admin-pacientes-pages',
  standalone: true,
  template: `
    <admin-title title="Pacientes" class="text-blue-800" />
    <router-outlet />
  `,
  imports: [RouterModule, TitleComponent],
  styles: ``,
})
export class PacientesPagesComponent {}

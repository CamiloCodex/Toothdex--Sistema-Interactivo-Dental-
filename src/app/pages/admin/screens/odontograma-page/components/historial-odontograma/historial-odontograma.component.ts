import { CommonModule, AsyncPipe, DatePipe, Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Odontograma } from '@core/interfaces/odontograma-interface';
import { Paciente } from '@core/interfaces/paciente.interface';
import { User } from '@core/interfaces/user.interface';
import { FirebaseService } from '@core/services/firebase.service';
import { UtilsService } from '@core/services/utils.service';
import { ButtonComponent } from '@shared/components/button/button.component';
import { PrimeNg_Modules } from '@shared/library/primeng';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-historial-odontograma',
  standalone: true,
  imports: [
    AsyncPipe,
    ButtonComponent,
    CommonModule,
    DatePipe,
    PrimeNg_Modules,
    ReactiveFormsModule,
  ],
  templateUrl: './historial-odontograma.component.html',
  styles: ``,
  providers: [MessageService, ConfirmationService],
})
export class HistorialOdontogramaComponent {
  _fS = inject(FirebaseService);
  _uS = inject(UtilsService);
  _location = inject(Location);
  _router = inject(Router);

  paciente!: Paciente;

  odontogramas: Odontograma[] = [];

  search = new FormControl('');

  user(): User {
    return this._uS.getLocalStorage('user');
  }

  ngOnInit(): void {
    this.paciente = (this._location.getState() as any).paciente;
    this.getOdontogramas();
  }

  getOdontogramas() {
    const userId = this.user().uid;
    const pacienteId = this.paciente.id;

    if (!userId || !pacienteId) {
      console.error('Missing userId or pacienteId');
      return;
    }

    let path = `users/${userId}/pacientes/${pacienteId}/odontogramas`;

    let sub = this._fS.getCollectionData(path).subscribe({
      next: (res: any) => {
        this.odontogramas = res.map((odontograma: any) => {
          return {
            ...odontograma,
            fechaCreacion: odontograma.fechaCreacion
              ? odontograma.fechaCreacion.toDate()
              : null,
          };
        });
        sub.unsubscribe();
      },
      error: (error) => {
        console.error('Error fetching citas:', error);
      },
    });
  }

  editOdontograma(odontograma: Odontograma) {
    this._router.navigateByUrl('admin/odontogramas/odontograma', {
      state: { odontograma, paciente: this.paciente },
    });
  }
}

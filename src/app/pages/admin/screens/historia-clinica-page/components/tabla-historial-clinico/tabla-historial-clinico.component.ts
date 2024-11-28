import { AsyncPipe, CommonModule, DatePipe, Location } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HistoriaClinica } from '@core/interfaces/historia-clinica.interface';
import { Paciente } from '@core/interfaces/paciente.interface';
import { User } from '@core/interfaces/user.interface';
import { FirebaseService } from '@core/services/firebase.service';
import { UtilsService } from '@core/services/utils.service';
import { PrimeNg_Modules } from '@shared/library/primeng';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-tabla-historial-clinico',
  standalone: true,
  imports: [
    AsyncPipe,
    CommonModule,
    DatePipe,
    PrimeNg_Modules,
    ReactiveFormsModule,
  ],
  templateUrl: './tabla-historial-clinico.component.html',
  styles: ``,
  providers: [MessageService, ConfirmationService],
})
export class TablaHistorialClinicoComponent implements OnInit {
  _fS = inject(FirebaseService);
  _uS = inject(UtilsService);
  _location = inject(Location);
  _router = inject(Router);

  paciente!: Paciente;

  historialesClinicos: HistoriaClinica[] = [];

  search = new FormControl('');

  user(): User {
    return this._uS.getLocalStorage('user');
  }

  ngOnInit(): void {
    this.paciente = (this._location.getState() as any).paciente;
    this.getHistoriasClinicas();
  }

  getHistoriasClinicas() {
    const userId = this.user().uid;
    const pacienteId = this.paciente.id;

    if (!userId || !pacienteId) {
      console.error('Missing userId or pacienteId');
      return;
    }

    let path = `users/${userId}/pacientes/${pacienteId}/historias-clinicas`;

    let sub = this._fS.getCollectionData(path).subscribe({
      next: (res: any) => {
        this.historialesClinicos = res.map((historiaClinica: any) => {
          return {
            ...historiaClinica,
            fechaConsulta: historiaClinica.fechaConsulta
              ? historiaClinica.fechaConsulta.toDate()
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

  editHistoriaClinica(historiaClinica: HistoriaClinica) {
    this._router.navigateByUrl(
      'admin/historias-clinicas/historia-clinica',
      {
        state: { historiaClinica, paciente: this.paciente },
      }
    );
  }
}

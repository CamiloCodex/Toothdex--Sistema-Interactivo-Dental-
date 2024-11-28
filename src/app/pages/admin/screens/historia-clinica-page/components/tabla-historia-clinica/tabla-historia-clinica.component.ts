import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { where } from '@angular/fire/firestore';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Paciente } from '@core/interfaces/paciente.interface';
import { User } from '@core/interfaces/user.interface';
import { FirebaseService } from '@core/services/firebase.service';
import { UtilsService } from '@core/services/utils.service';
import { PrimeNg_Modules } from '@shared/library/primeng';
import { MessageService, ConfirmationService } from 'primeng/api';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'tabla-historia-clinica',
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    ReactiveFormsModule,
    PrimeNg_Modules,
  ],
  templateUrl: './tabla-historia-clinica.component.html',
  styles: ``,
  providers: [MessageService, ConfirmationService],
})
export class TablaHistoriaClinicaComponent implements OnInit {
  private _fS = inject(FirebaseService);
  private _uS = inject(UtilsService);

  _router = inject(Router);

  pacienteDialog: boolean = false;

  pacientes!: Paciente[];

  selectedPacientes!: Paciente[] | null;

  submitted: boolean = false;

  statuses!: any[];

  Delete!: string;

  search = new FormControl('');

  user(): User {
    return this._uS.getLocalStorage('user');
  }

  ngOnInit(): void {
    this.search.valueChanges.pipe(debounceTime(1000)).subscribe((value) => {
      this.getPacientes(value);
    });
    this.getPacientes();
  }

  getPacientes(searchValue: string = '') {
    let path = `users/${this.user().uid}/pacientes`;

    let conditions: any[] = [];

    if (searchValue) {
      conditions.push(where('cedula', '==', searchValue));
    }

    let sub = this._fS.getCollectionData(path, conditions).subscribe({
      next: (res: any) => {
        this.pacientes = res;
        sub.unsubscribe();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  crearHistoria(paciente: Paciente) {
    this._router.navigateByUrl(
      '/admin/historias-clinicas/historia-clinica',
      { state: { paciente } }
    );
  }

  verHistorial(paciente: Paciente) {
    this._router.navigateByUrl('/admin/historias-clinicas/historial-clinico', {
      state: { paciente },
    });
  }

  hideDialog() {
    this.pacienteDialog = false;
    this.submitted = false;
  }

  savePaciente() {}

  findIndexById(id: string) {}

  createId(): string {
    let id = '';
    var chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }
}

import { Component, OnInit, inject } from '@angular/core';
import { AsyncPipe, CommonModule, JsonPipe } from '@angular/common';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { Paciente } from '@core/interfaces/paciente.interface';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { User } from '@core/interfaces/user.interface';
import { UtilsService } from '@core/services/utils.service';
import { FirebaseService } from '@core/services/firebase.service';
import { Timestamp, where } from '@angular/fire/firestore';
import { PrimeNg_Modules } from '@shared/library/primeng';

@Component({
  selector: 'tabla-pacientes',
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    ReactiveFormsModule,
    JsonPipe,
    PrimeNg_Modules,
  ],
  templateUrl: './tabla-pacientes.component.html',
  styles: ``,
  providers: [MessageService, ConfirmationService],
})
export class TablaPacientesComponent implements OnInit {
  _messageService = inject(MessageService);
  _confirmationService = inject(ConfirmationService);

  _router = inject(Router);
  _uS = inject(UtilsService);
  _fS = inject(FirebaseService);

  pacientes: Paciente[] = [];

  pacienteDialog: boolean = false;

  selectedPacientes!: Paciente[] | null;

  submitted: boolean = false;

  search = new FormControl('');

  ngOnInit(): void {
    this.search.valueChanges.pipe(debounceTime(1000)).subscribe((value) => {
      this.getPacientes(value);
    });
    this.getPacientes();
  }

  user(): User {
    return this._uS.getLocalStorage('user');
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

  editPaciente(paciente: Paciente) {
    if (paciente.fechaNacimiento instanceof Timestamp) {
      paciente.fechaNacimiento = (
        paciente.fechaNacimiento as Timestamp
      ).toDate();
    }
    this._router.navigateByUrl('/admin/pacientes/editar-paciente', {
      state: { paciente },
    });
  }

  addCitaPaciente(paciente: Paciente) {
    this._router.navigateByUrl('/admin/pacientes/citas', {
      state: { paciente },
    });
  }

  deletePaciente(paciente: Paciente) {
    this._confirmationService.confirm({
      message: `¿Estás seguro de que deseas eliminar a ${paciente.name} ${paciente.lastName}?`,
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        let path = `users/${this.user().uid}/pacientes/${paciente.id}`;
        this._fS.deleteteDocument(path).then(() => {
          this._messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Paciente eliminado',
          });
          this.getPacientes();
        });
      },
    });
  }

  hideDialog() {
    this.pacienteDialog = false;
    this.submitted = false;
  }
}

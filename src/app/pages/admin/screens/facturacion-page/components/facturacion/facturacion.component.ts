import { CommonModule, AsyncPipe, JsonPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { User } from '@angular/fire/auth';
import { where } from '@angular/fire/firestore';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Paciente } from '@core/interfaces/paciente.interface';
import { FirebaseService } from '@core/services/firebase.service';
import { UtilsService } from '@core/services/utils.service';
import { PrimeNg_Modules } from '@shared/library/primeng';
import { MessageService, ConfirmationService } from 'primeng/api';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-facturacion',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PrimeNg_Modules,
  ],
  templateUrl: './facturacion.component.html',
  styles: ``,
  providers: [MessageService, ConfirmationService],
})
export class FacturacionComponent implements OnInit {
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

  addFactura(paciente: Paciente) {
    this._router.navigateByUrl('admin/facturacion/crear-factura', {
      state: { paciente },
    });
  }

  hideDialog() {
    this.pacienteDialog = false;
    this.submitted = false;
  }
}

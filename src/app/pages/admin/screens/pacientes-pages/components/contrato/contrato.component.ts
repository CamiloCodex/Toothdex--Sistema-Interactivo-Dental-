import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { User } from '@core/interfaces/user.interface';
import { FirebaseService } from '@core/services/firebase.service';
import { UtilsService } from '@core/services/utils.service';
import { ButtonComponent } from '@shared/components/button/button.component';
import { PrimeNg_Modules } from '@shared/library/primeng';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-contrato',
  standalone: true,
  imports: [
    PrimeNg_Modules,
    ReactiveFormsModule,
    CommonModule,
    ButtonComponent,
  ],
  templateUrl: './contrato.component.html',
  styles: ``,
  providers: [
    ConfirmationService,
    MessageService,
    UtilsService,
    FirebaseService,
  ],
})
export class ContratoComponent implements OnInit {
  _mS = inject(MessageService);
  _cS = inject(ConfirmationService);
  _uS = inject(UtilsService);
  _fS = inject(FirebaseService);

  @Input() cedula: string;
  @Input() name: string;
  @Input() lastname: string;
  @Input() tratamiento: string;
  @Input() valorInicial: number;
  @Input() numeroCuotas: number;
  @Input() valorPorCuotas: number;

  @Output() contractAccepted: EventEmitter<boolean> = new EventEmitter();
  @Output() contractRejected: EventEmitter<boolean> = new EventEmitter();

  displayContract: boolean = false;

  user = {} as User;

  ngOnInit(): void {
    this.user = this._uS.getLocalStorage('user');
  }

  isInvalid() {
    if (
      !this.cedula ||
      !this.name ||
      !this.lastname ||
      !this.tratamiento ||
      !this.valorInicial ||
      !this.numeroCuotas ||
      !this.valorPorCuotas
    ) {
      return true;
    }
    return false;
  }

  confirm() {
    if (this.isInvalid()) {
      this._mS.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No puede ver el contrato sin llenar todos los campos.',
      });
      return;
    }
    this.displayContract = true;
  }

  onContractAccept() {
    this.contractAccepted.emit(true);
    this.displayContract = false;
  }

  onContractReject() {
    // this.contractRejected.emit(true);
    this.displayContract = false;
  }
}

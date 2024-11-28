import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ButtonComponent } from '@shared/components/button/button.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UtilsService } from '@core/services/utils.service';
import { FirebaseService } from '@core/services/firebase.service';
import { MessageService } from 'primeng/api';
import { PrimeNg_Modules } from '@shared/library/primeng';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ButtonComponent,
    ReactiveFormsModule,
    PrimeNg_Modules,
  ],
  templateUrl: './forgot-password-page.component.html',
  styles: ``,
  providers: [MessageService],
})
export class ForgotPasswordPageComponent {
  private _fS = inject(FirebaseService);
  private _uS = inject(UtilsService);
  private _fB = inject(FormBuilder);
  private _mS = inject(MessageService);
  _router = inject(Router);

  public forgotPasswordForm: FormGroup = this._fB.group({
    email: ['', [Validators.required, Validators.email]],
  });

  recoveryPassword() {
    if (this.forgotPasswordForm.valid) {
      this._fS
        .sendRecoveryEmail(this.forgotPasswordForm.value.email)
        .then(() => {
          this._mS.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Correo enviado correctamente',
          });

          setTimeout(() => {
            this._router.navigate(['/auth/login']);
          }
          , 2000);

          this.forgotPasswordForm.reset();
        })
        .catch((err) => {
          this._mS.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Correo no encontrado',
          });
        });
    }
  }
}

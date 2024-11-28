import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ButtonComponent } from '@shared/components/button/button.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UtilsService } from '@core/services/utils.service';
import { DocumentData } from '@angular/fire/firestore';
import { FirebaseService } from '@core/services/firebase.service';
import { User } from '@core/interfaces/user.interface';
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
  templateUrl: './login-page.component.html',
  styles: ``,
  providers: [MessageService],
})
export class LoginPageComponent {
  private _fS = inject(FirebaseService);
  private _fB = inject(FormBuilder);
  private _uS = inject(UtilsService);
  private _mS = inject(MessageService);
  _router = inject(Router);

  public loginForm: FormGroup = this._fB.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  login() {
    if (this.loginForm.valid) {
      this._fS
        .signIn(this.loginForm.value as User)
        .then((resp) => {
          this.getUserInfo(resp.user.uid);
          this._mS.add({
            severity: 'success',
            summary: 'Bienvenido!',
            detail: `Te damos la bienvenida ${resp.user.displayName} !`,
          });
        })
        .catch((err) => {
          console.log(err);
          this._mS.add({
            severity: 'error',
            summary: 'Error!',
            detail: err.message,
          });
        });
    }
  }

  async getUserInfo(uid: string) {
    if (this.loginForm.valid) {
      let path = `users/${uid}`;

      this._fS
        .getDocument(path)
        .then((documentData: DocumentData | undefined) => {
          if (documentData) {
            const user = documentData as User;

            this._uS.setLocalStorage('user', user);
            setTimeout(() => {
              this._uS.routerLink('/admin');
            }, 1000);
            this.loginForm.reset();
          } else {
            console.error('El documento no existe');
          }
        })
        .catch((err) => {
          console.log(err);
          this._mS.add({
            severity: 'error',
            summary: 'Error!',
            detail: err.message,
          });
        });
    }
  }
}

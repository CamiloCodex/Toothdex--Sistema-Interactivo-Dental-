import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { User } from '@core/interfaces/user.interface';
import { FirebaseService } from '@core/services/firebase.service';
import { UtilsService } from '@core/services/utils.service';
import { ButtonComponent } from '@shared/components/button/button.component';
import { PrimeNg_Modules } from '@shared/library/primeng';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ButtonComponent,
    ReactiveFormsModule,
    PrimeNg_Modules,
  ],
  templateUrl: './register-page.component.html',
  styles: ``,
  providers: [MessageService],
})
export class RegisterPageComponent {
  private _fS = inject(FirebaseService);
  private _fB = inject(FormBuilder);
  private _uS = inject(UtilsService);
  private _mS = inject(MessageService);

  _router = inject(Router);

  public registerForm: FormGroup = this._fB.group({
    uid: [''],
    name: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  signUp() {
    if (this.registerForm.valid) {
      this._fS
        .signUp(this.registerForm.value as User)
        .then(async (resp) => {
          await this._fS.updateUser(this.registerForm.value.name);

          let uid = resp.user.uid;

          this.registerForm.patchValue({ uid });

          this.setUserInfo(uid);

          this._uS.routerLink('/admin');
        })
        .catch((err) => {
          this._mS.add({
            severity: 'error',
            summary: 'Error',
            detail: err.message,
          });
        });
    }
  }

  setUserInfo(uid: string) {
    if (this.registerForm.valid) {
      let path = `users/${uid}`;
      delete this.registerForm.value.password;

      this._fS
        .setDocument(path, this.registerForm.value)
        .then((resp) => {
          this._uS.setLocalStorage('user', this.registerForm.value);
          this._mS.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Usuario creado correctamente',
          });
          setTimeout(() => {
            this._router.navigate(['/admin']);
          }, 2000);
        })
        .catch((err) => {
          this._mS.add({
            severity: 'error',
            summary: 'Error',
            detail: err.message,
          });
        });
    }
  }
}

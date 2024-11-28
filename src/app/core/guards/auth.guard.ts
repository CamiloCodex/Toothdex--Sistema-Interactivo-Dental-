import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { FirebaseService } from '@core/services/firebase.service';

export const AuthGuard: CanActivateFn = (route, state) => {

  const _fS = inject(FirebaseService);
  const _router = inject(Router);

  let user = localStorage.getItem('user');

  return new Promise((resolve) => {
    _fS.getAuth().onAuthStateChanged((auth) => {
      if (auth && user) {
        resolve(true);
      } else {
        _router.navigate(['/auth/login']);
        resolve(false);
      }
    });
  });
};


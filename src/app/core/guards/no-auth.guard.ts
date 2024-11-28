import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { FirebaseService } from '@core/services/firebase.service';

export const NoAuthGuard: CanActivateFn = (route, state) => {

  const _fS = inject(FirebaseService);
  const _router = inject(Router);


  return new Promise((resolve) => {
    _fS.getAuth().onAuthStateChanged((auth) => {
      if (!auth) {
        resolve(true);
      } else {
        _router.navigate(['/admin']);
        resolve(false);
      }
    });
  });
};

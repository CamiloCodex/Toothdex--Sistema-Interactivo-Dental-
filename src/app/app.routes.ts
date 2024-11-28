import { Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';
import { NoAuthGuard } from '@core/guards/no-auth.guard';
import { Error404PageComponent } from '@shared/pages/error404-page/error404-page.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'public',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes'),
    canActivate: [NoAuthGuard],
  },
  {
    path: 'admin',
    loadChildren: () => import('./pages/admin/admin.routes'),
    canActivate: [AuthGuard],
  },
  {
    path: 'public',
    loadChildren: () => import('./pages/public/public.routes'),
  },
  {
    path: '**',
    component: Error404PageComponent,
  },
];

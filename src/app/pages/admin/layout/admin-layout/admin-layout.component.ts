import { FirebaseService } from '@core/services/firebase.service';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PrimeNg_Modules } from '@shared/library/primeng';
import { MenuItem, MessageService } from 'primeng/api';
import { User } from '@core/interfaces/user.interface';
import { UtilsService } from '@core/services/utils.service';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterModule, PrimeNg_Modules, CommonModule],
  templateUrl: './admin-layout.component.html',
  styles: [],
  providers: [MessageService],
})
export class AdminLayoutComponent {
  sidebarVisible = false;
  menuItems: MenuItem[] = [];
  user = {} as User;
  private _fS = inject(FirebaseService);
  private _uS = inject(UtilsService);
  _mS = inject(MessageService);

  ngOnInit(): void {
    this.user = this._uS.getLocalStorage('user');
    this.menuItems = [
      {
        label: 'Inicio',
        icon: 'pi pi-fw pi-home',
        routerLink: ['/admin'],
      },
      {
        label: 'Pacientes',
        icon: 'pi pi-fw pi-user',
        routerLink: ['/admin/pacientes'],
        items: [
          {
            label: 'Nuevo Paciente',
            icon: 'pi pi-fw pi-user-plus',
            routerLink: ['/admin/pacientes/crear-paciente'],
          },
          {
            label: 'Listado de Pacientes',
            icon: 'pi pi-fw pi-users',
            routerLink: ['/admin/pacientes'],
          },
        ],
      },
      {
        label: 'Historias Clínicas',
        icon: 'pi pi-fw pi-book',
        routerLink: ['/admin/historias-clinicas'],
        items: [
          {
            label: 'Listado de Historias Clínicas',
            icon: 'pi pi-fw pi-book',
            routerLink: ['/admin/historias-clinicas'],
          },
        ],
      },
      {
        label: 'Odontogramas',
        icon: 'pi pi-fw pi-image',
        routerLink: ['/admin/odontogramas'],
      },
      // {
      //   label: 'Servicios',
      //   icon: 'pi pi-fw pi-briefcase',
      //   routerLink: ['/admin/servicios'],
      //   items: [
      //     {
      //       label: 'Servicios Ofrecidos',
      //       icon: 'pi pi-fw pi-list',
      //       routerLink: ['/admin/servicios/servicios-ofrecidos'],
      //     },
      //     {
      //       label: 'Servicios Realizados',
      //       icon: 'pi pi-fw pi-list',
      //       routerLink: ['/admin/servicios/servicios-realizados'],
      //     },
      //   ],
      // },
      {
        label: 'Facturación',
        icon: 'pi pi-fw pi-money-bill',
        routerLink: ['/admin/facturacion'],
      },
      // {
      //   label: 'Citas',
      //   icon: 'pi pi-fw pi-calendar',
      //   routerLink: ['/admin/citas'],
      // },
      // {
      //   label: 'Ayuda',
      //   icon: 'pi pi-fw pi-question',
      //   routerLink: ['/admin/ayuda'],
      // },
    ];
  }

  isActive(route: string | undefined): boolean {
    if (!route) return false;
    return window.location.pathname === route;
  }

  toggleSidebar(): void {
    this.sidebarVisible = !this.sidebarVisible;
  }

  logout(): void {
    this._fS.signOut();
  }

  signOut() {
    this._mS.add({
      severity: 'success',
      summary: 'Cerrando sesión',
      detail: `Hasta pronto ${this.user.name}`,
    });
    setTimeout(() => {
      this._fS.signOut();
      this._uS.routerLink('/auth');
    }, 1000);
  }
}

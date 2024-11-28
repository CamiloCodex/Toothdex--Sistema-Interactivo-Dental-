import { Component, OnInit, inject } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { FirebaseService } from '@core/services/firebase.service';
import { User } from '@core/interfaces/user.interface';
import { UtilsService } from '@core/services/utils.service';
import { PrimeNg_Modules } from '@shared/library/primeng';

@Component({
  selector: 'admin-menu',
  standalone: true,
  imports: [
    PrimeNg_Modules
  ],
  templateUrl: './menu.component.html',
  styles: ``,
  providers: [MessageService],
})
export class MenuComponent implements OnInit {
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
      },
      {
        label: 'Historias Clínicas',
        icon: 'pi pi-fw pi-book',
        routerLink: ['/admin/historias-clinicas'],
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
      {
        label: 'Cerrar',
        icon: 'pi pi-fw pi-power-off',
        command: () => this.signOut(),
      },
    ];
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

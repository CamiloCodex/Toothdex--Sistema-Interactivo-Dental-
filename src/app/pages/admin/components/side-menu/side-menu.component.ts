/* The SideMenuComponent class defines a side menu for an admin dashboard with various menu items and
submenus. */
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { PanelMenuModule } from 'primeng/panelmenu';

@Component({
  selector: 'admin-side-menu',
  standalone: true,
  imports: [PanelMenuModule],
  templateUrl: './side-menu.component.html',
  styles: ``
})
export class SideMenuComponent implements OnInit {

  menuItems: MenuItem[] = [];

  ngOnInit(): void {
    this.menuItems = [
      {
        label: 'Inicio',
        icon: 'pi pi-fw pi-home',
        routerLink: ['/admin']
      },
      {
        label: 'Pacientes',
        icon: 'pi pi-fw pi-user',
        routerLink: ['/admin/pacientes'],
        items: [
          {
            label: 'Nuevo Paciente',
            icon: 'pi pi-fw pi-user-plus',
            routerLink: ['/admin/pacientes/crear-paciente']
          },
          {
            label: 'Listado de Pacientes',
            icon: 'pi pi-fw pi-users',
            routerLink: ['/admin/pacientes']
          }
        ]
      },
      {
        label: 'Historias Clínicas',
        icon: 'pi pi-fw pi-book',
        routerLink: ['/admin/historias-clinicas'],
        items: [
          {
            label: 'Nueva Historia Clínica',
            icon: 'pi pi-fw pi-bookmark',
            routerLink: ['/admin/historias-clinicas/crear-historia-clinica']
          },
          {
            label: 'Listado de Historias Clínicas',
            icon: 'pi pi-fw pi-book',
            routerLink: ['/admin/historias-clinicas']
          }
        ]
      },
      {
        label: 'Odontogramas',
        icon: 'pi pi-fw pi-image',
        routerLink: ['/admin/odontogramas']
      },
      {
        label: 'Servicios',
        icon: 'pi pi-fw pi-briefcase',
        routerLink: ['/admin/servicios'],
        items: [
          {
            label: 'Servicios Ofrecidos',
            icon: 'pi pi-fw pi-list',
            routerLink: ['/admin/servicios/servicios-ofrecidos']
          },
          {
            label: 'Servicios Realizados',
            icon: 'pi pi-fw pi-list',
            routerLink: ['/admin/servicios/servicios-realizados']
          }
        ]
      },
      {
        label: 'Facturación',
        icon: 'pi pi-fw pi-money-bill',
        routerLink: ['/admin/facturacion']
      },
      {
        label: 'Citas',
        icon: 'pi pi-fw pi-calendar',
        routerLink: ['/admin/citas']
      },
      {
        label: 'Ayuda',
        icon: 'pi pi-fw pi-question',
        routerLink: ['/admin/ayuda']
      }
    ];
  }

}

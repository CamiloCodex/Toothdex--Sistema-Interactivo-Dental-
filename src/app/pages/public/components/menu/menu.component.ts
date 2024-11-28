import { Component, OnInit, inject } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonComponent } from '@shared/components/button/button.component';
import { Router } from '@angular/router';
import { PrimeNg_Modules } from '@shared/library/primeng';

@Component({
  selector: 'public-menu',
  standalone: true,
  imports: [PrimeNg_Modules, ButtonComponent],
  templateUrl: './menu.component.html',
  styles: `
    img {
      max-width: 120px;
      height: auto;
      object-fit: contain;
    }

    .menu-logo {
      display: flex;
      align-items: center;
      padding: 0 1rem;
    }

    .menu-end {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
  `,
})
export class MenuComponent implements OnInit {
  #router = inject(Router);

  menuItems: MenuItem[] = [];

  ngOnInit(): void {
    this.menuItems = [
      { label: 'Inicio', icon: 'pi pi-home', command: () => this.scrollTo('inicio') },
      { label: 'Conócenos', icon: 'pi pi-info-circle', command: () => this.scrollTo('conocenos') },
      { label: 'Servicios', icon: 'pi pi-cog', command: () => this.scrollTo('servicios') },
      { label: 'Contacto', icon: 'pi pi-envelope', command: () => this.scrollTo('Contacto') },
    ];
  }

  scrollTo(section: string): void {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }


  toLogin(): void {
    this.#router.navigate(['/auth/login']);
  }
}

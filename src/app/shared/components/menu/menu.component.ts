import { Component, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Sidebar } from 'primeng/sidebar';
import { PrimeNg_Modules } from '@shared/library/primeng';


@Component({
  selector: 'shared-menu',
  standalone: true,
  imports: [RouterModule, PrimeNg_Modules,],
  templateUrl: './menu.component.html',
  styles: ``
})
export class MenuComponent {

  @ViewChild('sidebarRef') sidebarRef!: Sidebar;

    closeCallback(e: any): void {
        this.sidebarRef.close(e);
    }

    sidebarVisible: boolean = true;

}

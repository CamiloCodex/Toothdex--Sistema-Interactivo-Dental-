import { Routes } from "@angular/router";
import { ServiciosPageComponent } from "./servicios-page.component";
import { ServiciosOfrecidosPageComponent } from "./pages/servicios-ofrecidos-page/servicios-ofrecidos-page.component";
import { ServiciosRealizadosPageComponent } from "./pages/servicios-realizados-page/servicios-realizados-page.component";

export default [
    {
        path: '',
        component: ServiciosPageComponent,
        children: [
            {
                path: 'servicios-ofrecidos',
                component: ServiciosOfrecidosPageComponent
            },
            {
                path: 'servicios-realizados',
                component: ServiciosRealizadosPageComponent
            },
            {
                path: '**',
                redirectTo: 'servicios-ofrecidos'
            },
        ]
    }
] as Routes;
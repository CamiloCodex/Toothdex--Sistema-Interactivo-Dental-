import { Component } from '@angular/core';
import { Card } from '@pages/public/interfaces/card.interface';
import { Info } from '@pages/public/interfaces/info.interface';
import { PrimeNg_Modules } from '@shared/library/primeng';
import { MenuComponent } from "../../components/menu/menu.component";
import { CardComponent } from '@pages/public/components/card/card.component';
import { FooterComponent } from '@shared/components/footer/footer.component';
import { CardInfoComponent } from '@pages/public/components/card-info/card-info.component';
import { LocationComponent } from "../../components/location/location.component";


@Component({
    standalone: true,
    templateUrl: './home-page.component.html',
    styles: [`
      `],
    imports: [
    PrimeNg_Modules,
    MenuComponent,
    CardComponent,
    FooterComponent,
    CardInfoComponent,
    LocationComponent
]
})
export class HomePageComponent {
    cards: Card[] = [
        {
            title: 'Misión',
            description: `Nuestra misión es proporcionar a nuestros pacientes una atención odontológica y ortodoncia de la más alta calidad.
            Nos esforzamos por mejorar la salud bucal y la confianza de cada individuo que confía en nosotros,a través de tratamientos personalizados,
            tecnología avanzada y un equipo comprometido. Estamos dedicados a crear sonrisas hermosas y saludables que perduren toda la vida`
        },
        {
            title: 'Visión',
            description: `Nuestra visión es convertirnos en un referente líder en odontología y ortodoncia,
            reconocidos por nuestra excelencia clínica, enfoque centrado en el paciente y resultados sobresalientes.
            Buscamos ser una clínica innovadora y apasionada que inspire confianza y comodidad en cada paso del camino.
            A medida que crecemos, aspiramos a impactar positivamente la salud bucal de comunidades más amplias.`
        },
    ];

    infoServices: Info[] = [
        {
            icon: 'periodoncia.png',
            title: 'Periodoncia',
            description: 'Trata las enfermedades de las encías y los tejidos que soportan los dientes'
        },
        {
            icon: 'operatoria.png',
            title: 'Operatoria',
            description: 'Opera los dientes para eliminar caries y restaurar su forma y función'
        },
        {
            icon: 'endiodoncia.png',
            title: 'Endodoncia',
            description: 'Trata las enfermedades de la pulpa dental'
        },
        {
            icon: 'cirugia.png',
            title: 'Cirugía',
            description: 'Cirugía Oral y Maxilofacial'
        },
        {
            icon: 'rehabilitacion.png',
            title: 'Rehabilitacion Oral',
            description: 'Rehabilitacion Oral y Prótesis Fija y Removible'
        },
        {
            icon: 'ortodoncia.png',
            title: 'Ortodoncia',
            description: 'Ortodoncia y Ortopedia Maxilofacial, ATM y Oclusión'
        },
        {
            icon: 'odontopediatria.png',
            title: 'Odontopediatría',
            description: 'Atención dental especializada para niños y adolescentes de 0 a 18 años de edad'
        },
    ]
    onCallClick(): void {
      window.location.href = 'tel:+573046426769';
    }

    onWhatsAppClick() {
      window.open('https://wa.me/573046426769', '_blank');
    }

}

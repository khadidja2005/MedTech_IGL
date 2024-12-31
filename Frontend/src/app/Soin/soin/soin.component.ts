import { Component } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { HeaderPDIComponent } from '../../components/header-pdi/header-pdi.component';
import { TopContentComponent } from '../top-content/top-content.component';
import { BottomContentComponent } from '../bottom-content/bottom-content.component';
import { TypeSoins } from '../../../types/soins';

export interface Soin {
  ordre: number;
  date: string;
  heure: string;
  type_soins: TypeSoins;
  description: string;
  infermier: number;
  medicament: string | null;
  dose: string | null;
}

export interface Infermier {
  id: number;
  nom: string;
}


@Component({
  selector: 'app-soin',
  imports: [SidebarComponent, HeaderPDIComponent, TopContentComponent, BottomContentComponent],
  templateUrl: './soin.component.html',
  styleUrl: './soin.component.css'
})
export class SoinComponent {
  role : string = 'infermierResponsable';
  infermiers: Infermier[] = [
    { id: 1, nom: 'Jean Dupont' },
    { id: 2, nom: 'Marie Martin' },
    { id: 3, nom: 'Pierre Durand' },
    { id: 4, nom: 'Sophie Dubois' },
    { id: 5, nom: 'Pauline Lefevre' },
  ];
  soin : Soin =
  {
    ordre : 1,
    date: '21/12/2024',
    heure: '12:00',
    type_soins: 'ADMINISTRATION DE MEDICAMENT',
    description: 'Soins infirmier',
    infermier: 1,
    medicament: 'Doliprane',
    dose: '1 comprimé',
  }
}

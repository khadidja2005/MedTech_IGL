import { Component } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { HeaderPDIComponent } from '../../components/header-pdi/header-pdi.component';
import { TopContentComponent } from '../top-content/top-content.component';
import { BottomContentComponent } from '../bottom-content/bottom-content.component';
import { Soins } from '../../../types/soins';

@Component({
  selector: 'app-soin',
  imports: [SidebarComponent, HeaderPDIComponent, TopContentComponent, BottomContentComponent],
  templateUrl: './soin.component.html',
  styleUrl: './soin.component.css'
})
export class SoinComponent {
  role : string = 'infermierResponsable';
  infermiers = ['Khelifati Amine', 'Bouzidi Ahmed', 'Bouzidi Mohamed', 'Bouzidi Sarah'];
  soin : Soins = {
        id: '1',
        date: '12/12/2024',
        heure: '15:30',
        type_soins: 'SOIN INFERMIER',
        description: 'hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh',
        etat_patient: 'hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh',
        medicament: 'doliprane',
        dose: '500mg',
        hospitalisation: '',
        infermier: 'Khelifati Amine',};
}

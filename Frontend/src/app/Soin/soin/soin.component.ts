import { Component , Inject, PLATFORM_ID } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { HeaderPDIComponent } from '../../components/header-pdi/header-pdi.component';
import { TopContentComponent } from '../top-content/top-content.component';
import { BottomContentComponent } from '../bottom-content/bottom-content.component';
import { TypeSoins } from '../../../types/soins';
import { FormsModule } from '@angular/forms';
import axios from 'axios';
import { Notyf } from 'notyf';
import { Router } from '@angular/router';
import { CommonModule, isPlatformBrowser, NgClass } from '@angular/common';
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
  imports: [SidebarComponent, HeaderPDIComponent, TopContentComponent, BottomContentComponent , FormsModule, CommonModule],
  templateUrl: './soin.component.html',
  styleUrl: './soin.component.css'
})
export class SoinComponent {
    notyf: Notyf | undefined;
    constructor(@Inject(PLATFORM_ID) private platformId: Object , private router : Router) {
      if (isPlatformBrowser(this.platformId)) {
        this.notyf = new Notyf();
      }
    }
  role : string = 'infermierResponsable';
  infermiers: Infermier[] = [
    { id: 1, nom: 'Jean Dupont' },
    { id: 2, nom: 'Marie Martin' },
    { id: 3, nom: 'Pierre Durand' },
    { id: 4, nom: 'Sophie Dubois' },
    { id: 5, nom: 'Pauline Lefevre' },
  ];

  //dpi/<str:dpi_id>/soins/<str:soin_id>/

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
  async ngOnInit() {
    try {
     const response = await axios.get('http://localhost:8000/soins/dpi/109/soins/65/');
     console.log(response.data);
     this.soin = response.data.data;
    
    }catch(e){
      console.log(e); 
      if (this.notyf) {
        this.notyf.error('Erreur lors du chargement des employees');
      };
    }
  }
}

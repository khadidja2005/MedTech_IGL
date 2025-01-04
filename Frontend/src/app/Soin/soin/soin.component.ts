import { Component , Inject, PLATFORM_ID } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { HeaderPDIComponent } from '../../components/header-pdi/header-pdi.component';
import { TopContentComponent } from '../top-content/top-content.component';
import { BottomContentComponent } from '../bottom-content/bottom-content.component';
import { TypeSoins } from '../../../types/soins';
import { FormsModule } from '@angular/forms';
import axios from 'axios';
import { Notyf } from 'notyf';
import { ActivatedRoute, Router } from '@angular/router';
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
    constructor(@Inject(PLATFORM_ID) private platformId: Object , private router : Router , private route: ActivatedRoute) {
      if (isPlatformBrowser(this.platformId)) {
        this.notyf = new Notyf();
      }
    }
  role : string = 'infermierResponsable';
  infermiers: Infermier[] = [
  ];

  //dpi/<str:dpi_id>/soins/<str:soin_id>/

  soin: Soin = {
    ordre: 0,
    date: '',
    heure: '',
    type_soins: {} as TypeSoins,
    description: '',
    infermier: 0,
    medicament: null,
    dose: null
  }
  async ngOnInit() {
      // Get the ID once
      this.route.params.subscribe(params => {
        const id = params['id'];
        // Use the ID to fetch data or whatever you need
      });
    try {
     const response = await axios.get('http://localhost:8000/soins/dpi/soins/65/');
     //console.log(response.data);
     this.soin = response.data;
     this.infermiers.push({id : response.data.infirmier_info.id , nom : response.data.infirmier_info.nom_complet})
    
    }catch(e){
      console.log(e); 
      if (this.notyf) {
        this.notyf.error('Erreur lors du chargement des employees');
      };
    }
  }
}

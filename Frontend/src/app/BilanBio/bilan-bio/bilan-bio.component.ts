import { Component } from '@angular/core';
import { TableParamComponent } from '../table-param/table-param.component';
import { BilanDetailsComponent } from '../bilan-details/bilan-details.component';
import { HeaderPDIComponent } from '../../components/header-pdi/header-pdi.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { Patient } from '../../Ordonnance/ordonnance/ordonnance.component';
import { medecin } from '../../Hospitalisation/hospitalisation/hospitalisation.component';
import { Etab } from '../../Pharmacie/pharmacie/pharmacie.component';

export interface bilan {
  ordre: number;
  date: string;
  est_complet: boolean;
  est_resultat: boolean;
  medecin: number;
  etablissement: number;
  patient: number;
}

export interface Resultat {
  valeur_mesure: string | null;
  parametre: string;
  norme: string | null;
  laborantin: number | null;
}

export interface labo {
  id: number;
  nom: string;
}


@Component({
  selector: 'app-bilan-bio',
  imports: [SidebarComponent,HeaderPDIComponent,BilanDetailsComponent,TableParamComponent],
  templateUrl: './bilan-bio.component.html',
  styleUrl: './bilan-bio.component.css'
})
export class BilanBioComponent {
  role: string = 'laborantin';


  patients: Patient[] = [
    {
      id: 1,
      nom: 'Dupont Jean',
    },
    {
      id: 2,
      nom: 'Dupont Jeanne',
    },
    {
      id: 3,
      nom: 'Dupont Jeanine',
    }
  ];

  medecins : medecin[] = [
    {
      id: 1,
      nom: 'Dr. Dupont'
    },
    {
      id: 2,
      nom: 'Dr. Durand'
    },
    {
      id: 3,
      nom: 'Dr. Dubois'
    }
  ];

  labos : labo[] = [
    {
      id: 1,
      nom: 'Labo 1'
    },
    {
      id: 2,
      nom: 'Labo 2'
    },
    {
      id: 3,
      nom: 'Labo 3'
    }
  ];

  user:labo =this.labos[0];

  activeItem: string;
  constructor() {
    if (this.role == 'laborantin') {
      this.activeItem = 'Bilans';
    }
    else {
      this.activeItem = 'DPI';
    }
  }
  bilan : bilan = {
  ordre : 1,
  date : '01/12/2024',
  est_complet: false,
  est_resultat: false,
  medecin: 1,
  etablissement: 1,
  patient: 1
  }
  params : Resultat[]= [
    {
    valeur_mesure: '5,9 x 10^3/ul',
    parametre: 'param',
    norme: '4-10',
    laborantin: 1
    },
    {
      valeur_mesure: '5,9 x 10^3/ul',
      parametre: 'param',
      norme: '4-10',
      laborantin: 1
      },
      {
        valeur_mesure: null,
        parametre: 'param',
        norme: null,
        laborantin: null,
        },
  ];
  etablissements : Etab[] = [
    {
      id: 1,
      nom: 'CHU'
    },
    {
      id: 2,
      nom: 'Clinique'
    },
    {
      id: 3,
      nom: 'Hopital'
    }
  ];

}

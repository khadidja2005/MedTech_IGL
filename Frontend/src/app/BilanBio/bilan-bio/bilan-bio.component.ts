import { Component } from '@angular/core';
import { BilanBio } from '../../../types/bilanbio';
import { ResultatBio } from '../../../types/resultatbio';
import { TableParamComponent } from '../table-param/table-param.component';
import { BilanDetailsComponent } from '../bilan-details/bilan-details.component';
import { HeaderPDIComponent } from '../../components/header-pdi/header-pdi.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-bilan-bio',
  imports: [SidebarComponent,HeaderPDIComponent,BilanDetailsComponent,TableParamComponent],
  templateUrl: './bilan-bio.component.html',
  styleUrl: './bilan-bio.component.css'
})
export class BilanBioComponent {
  role: string = 'medecin';
  user= 'Khalifati Amine';
  activeItem: string;
  constructor() {
    if (this.role == 'laborantin') {
      this.activeItem = 'Bilans';
    }
    else {
      this.activeItem = 'DPI';
    }
  }
  bilan : BilanBio = {
    id: '1',
  date_debut: '01/12/2024',
  date_fin: '25/12/2024',
  parametres: '',
  est_complet: false,
  est_resultat: false,
  medecin: 'Khalifati Amine',
  Consultation:  null,
  etablissement: 'CHU',
  patient: 'Khalifati Amine'
  }
  params : ResultatBio[]= [
    {id: '',
    valeur_mesure: '5,9 x 10^3/ul',
    date_mesure: '',
    heure_mesure: '',
    parametre: 'param',
    norme: '4-10',
    bilan_bio: '1',
    laborantin: 'Khalifati Mohamed'
    },
    {id: '',
      valeur_mesure: '5,9 x 10^3/ul',
      date_mesure: '',
      heure_mesure: '',
      parametre: 'param',
      norme: '4-10',
      bilan_bio: '1',
      laborantin: 'Khalifati Mohamed'
      },
      {id: '',
        valeur_mesure: '',
        date_mesure: '',
        heure_mesure: '',
        parametre: 'param',
        norme: '',
        bilan_bio: '1',
        laborantin: ''
        },
  ];

}

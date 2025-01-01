import { Component } from '@angular/core';
import { HeaderPDIComponent } from '../../components/header-pdi/header-pdi.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { HospitalisationDetailsComponent } from '../hospitalisation-details/hospitalisation-details.component';
import { TypeSoins } from '../../../types/soins';
import { Infermier } from '../../Soin/soin/soin.component';
import axios from 'axios';

export interface SoinPageHospitalisation {
  type_soins: TypeSoins;
  infermier: number;
  date: string;
  heure: string;
}
export interface ConsultationPageHospitalisation {
  date: string;
  medecin: number;
}
export interface HospitalisationPage {
  ordre: number;
  date_debut: string;
  date_fin: string | null;
  medecin: string;
}
export interface medecin {
  nom: string;
  id: number;
}

@Component({
  selector: 'app-hospitalisation',
  imports: [
    HeaderPDIComponent,
    SidebarComponent,
    HospitalisationDetailsComponent,
  ],
  templateUrl: './hospitalisation.component.html',
  styleUrl: './hospitalisation.component.css',
})
export class HospitalisationComponent {
  hospitalisation_id = 2871; //use navigation to get this value
  hospitalisation: HospitalisationPage = {
    ordre: 1, //use navigation
    date_debut: '12/12/2024',
    medecin: 'Khelifati Amine',
    date_fin: null,
  };
  ngOnInit() {
    this.onPageLoad();
  }
  async onPageLoad(): Promise<void> {
    console.log(
      'Fetching hospitalisation details for ID:',
      this.hospitalisation_id
    );
    await axios
      .get('http://localhost:8000/hospitalisation/', {
        params: { hospitalisation_id: this.hospitalisation_id },
      })
      .then((response) => {
        this.hospitalisation.date_debut = response.data.date_debut;
        this.hospitalisation.date_fin = response.data.date_fin;
        this.hospitalisation.medecin = response.data.medecin;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  medecins: medecin[] = [
    {
      nom: 'Khelifati Amine',
      id: 1,
    },
    {
      nom: 'Bouzidi Ahmed',
      id: 2,
    },
    {
      nom: 'Bouzidi Mohamed',
      id: 3,
    },
    {
      nom: 'Bouzidi Sarah',
      id: 4,
    },
  ];

  infermiers: Infermier[] = [
    {
      nom: 'Khelifati Amine',
      id: 1,
    },
    {
      nom: 'Bouzidi Ahmed',
      id: 2,
    },
    {
      nom: 'Bouzidi Mohamed',
      id: 3,
    },
    {
      nom: 'Bouzidi Sarah',
      id: 4,
    },
  ];
  soins: SoinPageHospitalisation[] = [
    {
      date: '12/12/2024',
      heure: '15:30',
      type_soins: 'INFIRMIER',
      infermier: 1,
    },
    {
      date: '13/12/2024',
      heure: '7:30',
      type_soins: 'AUTRE',
      infermier: 2,
    },

    {
      date: '15/12/2024',
      heure: '13:30',
      type_soins: 'ADMINISTRATION DE MEDICAMENT',
      infermier: 1,
    },

    {
      date: '21/12/2024',
      heure: '21:30',
      type_soins: "OBSERVATION D'ETAT",
      infermier: 3,
    },
    {
      date: '22/12/2024',
      heure: '16:30',
      type_soins: 'INFIRMIER',
      infermier: 4,
    },
  ];
  consultations: ConsultationPageHospitalisation[] = [
    {
      date: '12/12/2024',
      medecin: 1,
    },
    {
      date: '12/12/2024',
      medecin: 1,
    },
    {
      date: '13/12/2024',
      medecin: 2,
    },
    {
      date: '12/12/2024',
      medecin: 3,
    },
    {
      date: '13/12/2024',
      medecin: 4,
    },
  ];
}

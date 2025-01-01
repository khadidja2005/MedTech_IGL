import { Component } from '@angular/core';
import { HeaderPDIComponent } from '../../components/header-pdi/header-pdi.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { HospitalisationDetailsComponent } from '../hospitalisation-details/hospitalisation-details.component';
import { TypeSoins } from '../../../types/soins';
import axios from 'axios';

export interface SoinPageHospitalisation {
  id: number;
  type_soins: TypeSoins;
  infermier: string;
  date: string;
  heure: string;
}
export interface ConsultationPageHospitalisation {
  id: number;
  date: string;
  medecin: string;
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
  hospitalisation_id = 2880; //use navigation to get this value
  hospitalisation: HospitalisationPage = {
    ordre: 1, //use navigation
    date_debut: ' ',
    medecin: ' ',
    date_fin: null,
  };
  medecins: medecin[] = [];
  consultations: ConsultationPageHospitalisation[] = [];
  soins: SoinPageHospitalisation[] = [];
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
    await axios
      .get('http://localhost:8000/hospitalisation/modifier/medecins', {
        params: { hospitalisation_id: this.hospitalisation_id },
      })
      .then((response) => {
        this.medecins = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
    await axios
      .get('http://localhost:8000/hospitalisation/consultations', {
        params: { hospitalisation_id: this.hospitalisation_id },
      })
      .then((response) => {
        this.consultations = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
    await axios
      .get('http://localhost:8000/hospitalisation/Soins', {
        params: { hospitalisation_id: this.hospitalisation_id },
      })
      .then((response) => {
        this.soins = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

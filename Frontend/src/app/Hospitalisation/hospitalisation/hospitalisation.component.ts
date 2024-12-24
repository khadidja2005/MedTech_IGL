import { Component} from '@angular/core';
import { HeaderPDIComponent } from '../../components/header-pdi/header-pdi.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { HospitalisationDetailsComponent } from '../hospitalisation-details/hospitalisation-details.component';
import { Consultation } from '../../../types/consultation';
import { Hospitalisation } from '../../../types/hospitalisation';
import { Soins } from '../../../types/soins';
@Component({
  selector: 'app-hospitalisation',
  imports: [HeaderPDIComponent,SidebarComponent, HospitalisationDetailsComponent],
  templateUrl: './hospitalisation.component.html',
  styleUrl: './hospitalisation.component.css'
})
export class HospitalisationComponent {
  medecins = ['Khelifati Amine', 'Bouzidi Ahmed', 'Bouzidi Mohamed', 'Bouzidi Sarah'];
  infermiers = ['Khelifati Amine', 'Bouzidi Ahmed', 'Bouzidi Mohamed', 'Bouzidi Sarah'];
  soins: Soins[] = [
      {
        id: '1',
        date: '12/12/2024',
        heure: '15:30',
        type_soins: 'SOIN INFERMIER',
        description: '',
        etat_patient: '',
        medicament: '',
        dose: '',
        hospitalisation: '',
        infermier: 'Khalifa Mohamed',
      },
      {
        id: '2',
        date: '13/12/2024',
        heure: '7:30',
        type_soins: 'AUTRE',
        description: '',
        etat_patient: '',
        medicament: '',
        dose: '',
        hospitalisation: '',
        infermier: 'Khalifa Mohamed',
      },

      {
        id: '3',
        date: '15/12/2024',
        heure: '13:30',
        type_soins: 'ADMINISTRATION DE MEDICAMENT',
        description: '',
        etat_patient: '',
        medicament: '',
        dose: '',
        hospitalisation: '',
        infermier: 'Khalifa Mohamed',
      },

      {
        id: '4',
        date: '21/12/2024',
        heure: '21:30',
        type_soins: 'OBSERVATION DETAT',
        description: '',
        etat_patient: '',
        medicament: '',
        dose: '',
        hospitalisation: '',
        infermier: 'Khalifa Mohamed',
      },
      {
        id: '5',
        date: '22/12/2024',
        heure: '16:30',
        type_soins: 'SOIN INFERMIER',
        description: '',
        etat_patient: '',
        medicament: '',
        dose: '',
        hospitalisation: '',
        infermier: 'Khalifa Mohamed',
      },
    ];
  consultations: Consultation[] = [
    {
      id: '1',
      resume: '',
      date: '12/12/2024',
      Hospitalisation: '1',
      Medecin: 'Khalifa Mohamed',
    },
    {
      id: '2',
      resume: '',
      date: '12/12/2024',
      Hospitalisation: '1',
      Medecin: 'Khalifa Mohamed',
    },
    {
      id: '3',
      resume: '',
      date: '13/12/2024',
      Hospitalisation: '1',
      Medecin: 'Khalifa Mohamed',
    },
    {
      id: '4',
      resume: '',
      date: '12/12/2024',
      Hospitalisation: '1',
      Medecin: 'Khalifa Mohamed',
    },
    {
      id: '5',
      resume: '',
      date: '13/12/2024',
      Hospitalisation: '1',
      Medecin: 'Khalifa Mohamed',
    }
  ];
  hospitalisation: Hospitalisation = {
        id: '1',
        date_debut: '12/12/2024', // ISO date string
        date_fin: '', // ISO date string
        DPI: '1', // Foreign key to DPI
        medecin_responsable: 'Khelifati Amine', // Foreign key to PersonnelMedical
        status : 'en cours',
    };
  }



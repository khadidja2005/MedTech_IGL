import { Ordonnance } from './../../../types/ordonance.d';
import { Component } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { HeaderPDIComponent } from '../../components/header-pdi/header-pdi.component';
import { OrdonnaceDetailsComponent } from '../ordonnace-details/ordonnace-details.component';
import { TableMedicamentComponent } from '../table-medicament/table-medicament.component';

export interface OrdonnancePageOrd
{
  ordre : number;
  date : string;
  estValide: boolean;
  patient_id: number;
  medecin_id: number;
  termine: boolean;
  etablissement: number;
}

export interface MedicamentPageOrd
{
  nom: string;
  dosage: string;
  duree: string;
}

export interface Patient {
  nom : string;
  id : number;
}

@Component({
  selector: 'app-ordonnance',
  imports: [SidebarComponent,HeaderPDIComponent,OrdonnaceDetailsComponent,TableMedicamentComponent],
  templateUrl: './ordonnance.component.html',
  styleUrl: './ordonnance.component.css'
})
export class OrdonnanceComponent {
  role: string = 'medecin';
  activeItem: string;
  constructor() {
    if (this.role == 'pharmacien') {
      this.activeItem = 'Ordonnance';
    }
    else {
      this.activeItem = 'DPI';
    }
  }
  patients : Patient[] = [
    { nom: 'Jean Dupont', id: 1},
    { nom: 'Paul Martin', id: 2},
    { nom: 'Marie Durand', id: 3},
  ];
  medecins : Patient[] = [
    { nom: 'Dr. Jean Dupont', id: 1},
    { nom: 'Dr. Paul Martin', id: 2},
    { nom: 'Dr. Marie Durand', id: 3},
  ];
  
  ordonnance: OrdonnancePageOrd = {
      ordre : 1,
      date: '25/12/2024',
      estValide: false,
      patient_id: 1,
      medecin_id: 1,
      termine : false,
      etablissement: 1,
    };
  medicaments: MedicamentPageOrd[] = [
    {
      nom: 'doliprane',
      dosage: '500mg',
      duree: '3 jours',
    },

    {
      nom: 'xydole',
      dosage: '500mg',
      duree: '2 jours',
    },

    {
      nom: 'ibuprofène',
      dosage: '200mg',
      duree: '5 jours',
    },

    {
      nom: 'paracétamol',
      dosage: '100mg',
      duree: '4 jours',
    },

    {
      nom: 'amoxicilline',
      dosage: '250mg',
      duree: '7 jours',
    }

  ];

}

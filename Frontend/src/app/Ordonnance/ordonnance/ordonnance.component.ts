import { Component } from '@angular/core';
import { Ordonnance } from '../../../types/ordonance';
import { Medicament } from '../../../types/medicament';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { HeaderPDIComponent } from '../../components/header-pdi/header-pdi.component';
import { OrdonnaceDetailsComponent } from '../ordonnace-details/ordonnace-details.component';
import { TableMedicamentComponent } from '../table-medicament/table-medicament.component';

@Component({
  selector: 'app-ordonnance',
  imports: [SidebarComponent,HeaderPDIComponent,OrdonnaceDetailsComponent,TableMedicamentComponent],
  templateUrl: './ordonnance.component.html',
  styleUrl: './ordonnance.component.css'
})
export class OrdonnanceComponent {
  role: string = 'pharmacien';
  ordonnance: Ordonnance = {
      id: '1',
      date: '25/12/2024',
      estValide: false,
      consultation: '1',
      pharmacien_id: 'Khelifati Amine',
      patient_id: 'Khelifati Amine',
      medecin_id: 'Khelifati Amine',
      termine : false
    };
  medicaments: Medicament[] = [
    {
      id: '1',
      nom: 'doliprane',
      dosage: '500mg',
      duree: '3 jours',
      ordonnance: '1'
    },

    {
      id: '2',
      nom: 'xydole',
      dosage: '500mg',
      duree: '2 jours',
      ordonnance: '1'
    },

    {
      id: '3',
      nom: 'ibuprofène',
      dosage: '200mg',
      duree: '5 jours',
      ordonnance: '1'
    },

    {
      id: '4',
      nom: 'paracétamol',
      dosage: '100mg',
      duree: '4 jours',
      ordonnance: '1'
    },

    {
      id: '5',
      nom: 'amoxicilline',
      dosage: '250mg',
      duree: '7 jours',
      ordonnance: '1'
    }

  ];

}

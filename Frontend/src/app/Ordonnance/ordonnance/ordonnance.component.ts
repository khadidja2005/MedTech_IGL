import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { HeaderPDIComponent } from '../../components/header-pdi/header-pdi.component';
import { OrdonnaceDetailsComponent } from '../ordonnace-details/ordonnace-details.component';
import { TableMedicamentComponent } from '../table-medicament/table-medicament.component';
import { ActivatedRoute } from '@angular/router';
export interface OrdonnancePageOrd {
  ordre: number;
  date: string;
  estValide: boolean;
  patient: string;
  medecin: string;
  medecin_id: number;
  termine: boolean;
  etablissement: number;
}

export interface MedicamentPageOrd {
  id: number;
  nom: string;
  dosage: string;
  duree: string;
}

interface resData {
  date: string;
  medecin: string;
  medecin_id: number;
  patient: string;
  estValide: boolean;
  estTerminer: boolean;
  medicaments: meds[];
}
interface meds {
  medicament_id: number;
  nom: string;
  dosage: string;
  duree: string;
}

@Component({
  selector: 'app-ordonnance',
  imports: [
    SidebarComponent,
    HeaderPDIComponent,
    OrdonnaceDetailsComponent,
    TableMedicamentComponent,
  ],
  templateUrl: './ordonnance.component.html',
  styleUrls: ['./ordonnance.component.css'],
})
export class OrdonnanceComponent implements OnInit {
  role: string = localStorage.getItem('role')?.toLowerCase() || 'medecin';
  ordonnance: any = {};
  medicaments: any[] = [];
  isLoading = false;
  errorMessage: string | null = null;
  ordonnanceId: string = '';
  activeItem: string = ''; // Ajoutez cette ligne
  peutValider = true;
  peutModifier = false;
  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const ordonnanceId = params['id'];
      // Use the ID to fetch data or whatever you need
      this.loadOrdonnance(ordonnanceId);
    });
  }

  async loadOrdonnance(id: number): Promise<void> {
    this.isLoading = true;
    try {
      await axios
        .get<resData>(`http://127.0.0.1:8000/ordonnance/`, {
          params: { ordonnance_id: id },
        })
        .then((response) => {
          this.ordonnance = {
            ordre: id,
            date: response.data.date,
            medecin: response.data.medecin,
            medecin_id: response.data.medecin_id,
            patient: response.data.patient,
            estValide: response.data.estValide,
            termine: response.data.estTerminer,
            etablissement: 1,
          };
          this.medicaments = response.data.medicaments.map((m) => ({
            id: m.medicament_id,
            nom: m.nom,
            dosage: m.dosage,
            duree: m.duree,
          }));
        });
      this.peutValider =
        this.role === 'pharmacien' &&
        !this.ordonnance.estValide &&
        !this.ordonnance.termine &&
        this.medicaments.length > 0;
      this.peutModifier =
        this.role === 'medecin' &&
        localStorage.getItem('id') === this.ordonnance.medecin_id.toString();
    } catch (error) {
      this.errorMessage = 'Erreur lors du chargement des données.';
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  }
}

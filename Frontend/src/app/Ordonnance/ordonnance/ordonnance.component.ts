import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { HeaderPDIComponent } from '../../components/header-pdi/header-pdi.component';
import { OrdonnaceDetailsComponent } from '../ordonnace-details/ordonnace-details.component';
import { TableMedicamentComponent } from '../table-medicament/table-medicament.component';

export interface OrdonnancePageOrd {
  ordre: number;
  date: string;
  estValide: boolean;
  patient_id: number;
  medecin_id: number;
  termine: boolean;
  etablissement: number;
}

export interface MedicamentPageOrd {
  nom: string;
  dosage: string;
  duree: string;
}

export interface Patient {
  nom: string;
  id: number;
}

@Component({
  selector: 'app-ordonnance',
  imports: [SidebarComponent, HeaderPDIComponent, OrdonnaceDetailsComponent, TableMedicamentComponent],
  templateUrl: './ordonnance.component.html',
  styleUrls: ['./ordonnance.component.css']
})
export class OrdonnanceComponent implements OnInit {
  role: string = 'medecin';
  ordonnance: any = {};
  medicaments: any[] = [];
  isLoading = false;
  errorMessage: string | null = null;
  activeItem: string = ''; // Ajoutez cette ligne
  medecins: any[] = []; // Ajoutez cette ligne
  patients: any[] = []; // Ajoutez cette ligne

  ngOnInit(): void {
    const ordonnanceId = 1; // Replace with dynamic ID
    this.loadOrdonnance(ordonnanceId);
  }

  async loadOrdonnance(id: number): Promise<void> {
    this.isLoading = true;
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/ordonnances/`, {
        params: { ordonnance_id: id },
      });
      this.ordonnance = response.data;
      this.medicaments = response.data.medicaments;
    } catch (error) {
      this.errorMessage = 'Erreur lors du chargement des données.';
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  }

  async addMedicament(nom: string, dosage: string, duree: string): Promise<void> {
    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/ordonnances/ajouter/medicament`, {
        ordonnance_id: this.ordonnance.ordre,
        nom,
        dosage,
        duree,
      });
      this.medicaments.push({ id: response.data.medicament_id, nom, dosage, duree });
      alert('Médicament ajouté avec succès.');
    } catch (error) {
      console.error('Erreur lors de l’ajout du médicament:', error);
    }
  }

  async deleteMedicament(id: number): Promise<void> {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/ordonnances/supprimer/medicament`, {
        data: { medicament_id: id },
      });
      this.medicaments = this.medicaments.filter(m => m.id !== id);
      alert('Médicament supprimé avec succès.');
    } catch (error) {
      console.error('Erreur lors de la suppression du médicament:', error);
    }
  }

  async validateOrdonnance(pharmacienId: number): Promise<void> {
    try {
      await axios.post(`http://127.0.0.1:8000/api/ordonnances/valider`, {
        ordonnance_id: this.ordonnance.ordre,
        pharmacien_id: pharmacienId,
      });
      this.ordonnance.estValide = true;
      alert('Ordonnance validée avec succès.');
    } catch (error) {
      console.error('Erreur lors de la validation:', error);
    }
  }

  async completeOrdonnance(): Promise<void> {
    try {
      await axios.post(`http://127.0.0.1:8000/api/ordonnances/terminer/`, {
        ordonnance_id: this.ordonnance.ordre,
      });
      this.ordonnance.termine = true;
      alert('Ordonnance terminée avec succès.');
    } catch (error) {
      console.error('Erreur lors de la terminaison:', error);
    }
  }
}

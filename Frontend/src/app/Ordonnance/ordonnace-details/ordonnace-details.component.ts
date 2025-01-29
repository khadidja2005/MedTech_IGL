import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Ordonnance } from '../../../types/ordonance';
import { Medicament } from '../../../types/medicament';
import { AjouterMedicamentComponent } from '../ajouter-medicament/ajouter-medicament.component';
import {
  MedicamentPageOrd,
  OrdonnancePageOrd,
  Patient,
} from '../ordonnance/ordonnance.component';
import { medecin } from '../../Hospitalisation/hospitalisation/hospitalisation.component';
import axios from 'axios';

@Component({
  selector: 'app-ordonnace-details',
  imports: [CommonModule, AjouterMedicamentComponent],
  templateUrl: './ordonnace-details.component.html',
  styleUrl: './ordonnace-details.component.css',
})
export class OrdonnaceDetailsComponent {
  @Input() ordonnance!: OrdonnancePageOrd;
  @Input() medicaments!: MedicamentPageOrd[];
  @Input() medecins!: medecin[];
  @Input() patients!: Patient[];
  @Input() role!: string;
  @Input() id!: string;
  isAddPanelVisible = false;
  isPopupVisible = false;
  getMedecinName(id: number): string {
    return this.medecins.find((medecin) => medecin.id === id)?.nom || '';
  }
  getPatientName(id: number): string {
    return this.patients.find((patient) => patient.id === id)?.nom || '';
  }
  terminate() {
    this.ordonnance.termine = true;
  }

  async valider(): Promise<void> {
    try {
      await axios.post(`http://127.0.0.1:8000/ordonnance/valider`, {
        ordonnance_id: this.id,
        pharmacien_id: localStorage.getItem('id'),
      });
      this.ordonnance.estValide = true;
      alert('Ordonnance validée avec succès.');
    } catch (error) {
      console.error('Erreur lors de la validation:', error);
    }

    this.ordonnance.estValide = true;
  }

  openAddPanel() {
    this.isAddPanelVisible = true;
  }

  // Method to close the panel
  closeAddPanel() {
    this.isAddPanelVisible = false;
  }

  openPopup() {
    this.isPopupVisible = true;
  }

  closePopup() {
    this.isPopupVisible = false;
  }

  // Method to add a consultation (called when the new consultation is emitted from the form)
  addMedicament(newMedicament: MedicamentPageOrd) {
    this.medicaments.push(newMedicament); // Add the new consultation to the list
    this.isAddPanelVisible = false; // Close the panel after adding
  }
}

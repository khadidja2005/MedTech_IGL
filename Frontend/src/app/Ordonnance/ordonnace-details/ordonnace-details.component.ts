import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AjouterMedicamentComponent } from '../ajouter-medicament/ajouter-medicament.component';
import {
  MedicamentPageOrd,
  OrdonnancePageOrd,
} from '../ordonnance/ordonnance.component';
import axios from 'axios';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ordonnace-details',
  imports: [CommonModule, AjouterMedicamentComponent],
  templateUrl: './ordonnace-details.component.html',
  styleUrl: './ordonnace-details.component.css',
})
export class OrdonnaceDetailsComponent {
  @Input() ordonnance!: OrdonnancePageOrd;
  @Input() medicaments!: MedicamentPageOrd[];
  @Input() role!: string;
  @Input() id!: string;
  @Input() peutValider!: boolean;
  @Input() peutModifier!: boolean;
  @Input() peutTerminer!: boolean;
  isAddPanelVisible = false;
  isPopupVisible = false;
  constructor(private router: Router) {}
  async terminate() {
    try {
      await axios.post(`http://127.0.0.1:8000/ordonnance/terminer/`, {
        ordonnance_id: this.ordonnance.ordre,
        medecin_id: parseInt(localStorage.getItem('id') || '0'),
      });
      this.ordonnance.termine = true;
      alert('Ordonnance terminée avec succès.');
    } catch (error) {
      console.error('Erreur lors de la terminaison:', error);
    }
  }

  async valider(): Promise<void> {
    try {
      await axios.post(`http://127.0.0.1:8000/ordonnance/valider`, {
        ordonnance_id: this.ordonnance.ordre,
        pharmacien_id: localStorage.getItem('id'),
      });
      this.ordonnance.estValide = true;
      alert('Ordonnance validée avec succès.');
    } catch (error) {
      console.error('Erreur lors de la validation:', error);
    }
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
  async supOrd() {
    await axios
      .delete('http://127.0.0.1:8000/ordonnance/supprimer', {
        params: {
          ordonnance_id: this.ordonnance.ordre,
        },
      })
      .then((response) => {
        alert('Ordonnance supprimée avec succès.');
        this.router.navigate(['/recherche']);
      })
      .catch((error) => {
        console.error('Erreur lors de la suppression:', error);
      });
  }
  // Method to add a consultation (called when the new consultation is emitted from the form)
  addMedicament(newMedicament: MedicamentPageOrd) {
    this.medicaments.push(newMedicament); // Add the new consultation to the list
    this.isAddPanelVisible = false; // Close the panel after adding
  }
}

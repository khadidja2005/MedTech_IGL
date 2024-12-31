import { CommonModule } from '@angular/common';
import { Component,Input } from '@angular/core';
import { Ordonnance } from '../../../types/ordonance';
import { Medicament } from '../../../types/medicament';
import { AjouterMedicamentComponent } from '../ajouter-medicament/ajouter-medicament.component';
import { MedicamentPageOrd, OrdonnancePageOrd, Patient } from '../ordonnance/ordonnance.component';
import { medecin } from '../../Hospitalisation/hospitalisation/hospitalisation.component';

@Component({
  selector: 'app-ordonnace-details',
  imports: [CommonModule,AjouterMedicamentComponent],
  templateUrl: './ordonnace-details.component.html',
  styleUrl: './ordonnace-details.component.css'
})
export class OrdonnaceDetailsComponent {
  @Input() ordonnance !: OrdonnancePageOrd;
  @Input() medicaments !: MedicamentPageOrd[];
  @Input() medecins !: medecin[];
  @Input() patients !: Patient[];
  @Input() role !: string;
  isAddPanelVisible = false;
  isPopupVisible = false;
  getMedecinName(id: number): string {
    return this.medecins.find(medecin => medecin.id === id)?.nom || '';
  }
  getPatientName(id: number): string {
    return this.patients.find(patient => patient.id === id)?.nom || '';
  }
  terminate(){
    this.ordonnance.termine = true;
  }
  valider(){
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
      this.medicaments.push(newMedicament);  // Add the new consultation to the list
      this.isAddPanelVisible = false;  // Close the panel after adding
    }


}

import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Ordonnance } from '../../../types/ordonance';
import { Medicament } from '../../../types/medicament';
import { ModifierMedicamentComponent } from "../modifier-medicament/modifier-medicament.component";
import { MedicamentPageOrd } from '../ordonnance/ordonnance.component';

@Component({
  selector: 'app-table-medicament',
  standalone: true, // Added for Angular standalone components
  imports: [CommonModule, ModifierMedicamentComponent],
  templateUrl: './table-medicament.component.html',
  styleUrls: ['./table-medicament.component.css'] // Fixed typo: `styleUrl` -> `styleUrls`
})
export class TableMedicamentComponent {
  @Input() medicaments!: MedicamentPageOrd[];
  @Input() role!: string;
  index=0;

  isPopupVisible = false;
  currentMedicament: MedicamentPageOrd | null = null; // Stores the medicament being modified
  currentIndex: number | null = null; // Stores the index of the medicament being modified



  /**
   * Opens the popup for modifying a medicament.
   * @param medicament The medicament to modify
   * @param index The index of the medicament in the list
   */
  openPopup(medicament: MedicamentPageOrd, index: number) {
    this.currentMedicament = { ...medicament }; // Clone the medicament to avoid direct mutation
    this.currentIndex = index;
    this.isPopupVisible = true;
  }

  /**
   * Closes the popup.
   */
  closePopup() {
    this.isPopupVisible = false;
    this.currentMedicament = null;
    this.currentIndex = null;
  }

  /**
   * Updates a medicament in the list.
   * @param updatedMedicament The updated medicament data
   */
  updateMedicament(updatedMedicament: Partial<MedicamentPageOrd>) {
    if(this.currentIndex !== null && this.currentMedicament) {
    this.medicaments[this.currentIndex] = {
      ...this.medicaments[this.currentIndex],
      nom : updatedMedicament.nom || this.medicaments[this.currentIndex].nom,
      dosage: updatedMedicament.dosage ? updatedMedicament.dosage : this.medicaments[this.currentIndex].dosage,
      duree: updatedMedicament.duree ? updatedMedicament.duree : this.medicaments[this.currentIndex].duree,
    };
    this.isPopupVisible = false;  // Close the panel after saving the data
  }
}
}

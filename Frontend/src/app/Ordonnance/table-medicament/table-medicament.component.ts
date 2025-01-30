import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MedicamentPageOrd } from '../ordonnance/ordonnance.component';
import { ModifierMedicamentComponent } from "../modifier-medicament/modifier-medicament.component";

@Component({
  selector: 'app-table-medicament',
  standalone: true,
  imports: [CommonModule, ModifierMedicamentComponent],
  templateUrl: './table-medicament.component.html',
  styleUrls: ['./table-medicament.component.css']
})
export class TableMedicamentComponent {
  @Input() medicaments: MedicamentPageOrd[] = [];
  @Input() role!: string;
  isPopupVisible = false;
  currentMedicament: MedicamentPageOrd | null = null;
  currentIndex: number | null = null;

  constructor() {
    this.loadFakeData();
  }

  /**
   * Charge des données factices si aucun médicament n'est disponible.
   */
  private loadFakeData(): void {
    if (this.medicaments.length === 0) {
      console.warn("Aucune donnée chargée, utilisation des données factices.");
      this.medicaments = [
        { nom: "Paracétamol", dosage: "500mg", duree: "5 jours" },
        { nom: "Ibuprofène", dosage: "400mg", duree: "7 jours" },
        { nom: "Amoxicilline", dosage: "1g", duree: "10 jours" }
      ];
    }
  }

  /**
   * Ouvre le popup pour modifier un médicament.
   */
  openPopup(medicament: MedicamentPageOrd, index: number): void {
    this.currentMedicament = { ...medicament };
    this.currentIndex = index;
    this.isPopupVisible = true;
  }

  /**
   * Ferme le popup de modification.
   */
  closePopup(): void {
    this.isPopupVisible = false;
    this.currentMedicament = null;
    this.currentIndex = null;
  }

  /**
   * Met à jour un médicament dans la liste.
   */
  updateMedicament(updatedMedicament: Partial<MedicamentPageOrd>): void {
    if (this.currentIndex !== null && this.currentMedicament) {
      this.medicaments[this.currentIndex] = {
        ...this.medicaments[this.currentIndex],
        nom: updatedMedicament.nom || this.medicaments[this.currentIndex].nom,
        dosage: updatedMedicament.dosage || this.medicaments[this.currentIndex].dosage,
        duree: updatedMedicament.duree || this.medicaments[this.currentIndex].duree,
      };
      this.isPopupVisible = false;
    }
  }
}

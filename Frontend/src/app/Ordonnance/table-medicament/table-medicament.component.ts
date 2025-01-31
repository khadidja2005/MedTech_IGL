import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
<<<<<<< HEAD
import { MedicamentPageOrd } from '../ordonnance/ordonnance.component';
import { ModifierMedicamentComponent } from "../modifier-medicament/modifier-medicament.component";
=======
import { ModifierMedicamentComponent } from '../modifier-medicament/modifier-medicament.component';
import { MedicamentPageOrd } from '../ordonnance/ordonnance.component';
import { OrdonnancePageOrd } from '../ordonnance/ordonnance.component';
>>>>>>> ddf3e5d80710324dead3ffbada0b256c53cfd361

@Component({
  selector: 'app-table-medicament',
  standalone: true,
  imports: [CommonModule, ModifierMedicamentComponent],
  templateUrl: './table-medicament.component.html',
<<<<<<< HEAD
  styleUrls: ['./table-medicament.component.css']
=======
  styleUrls: ['./table-medicament.component.css'], // Fixed typo: `styleUrl` -> `styleUrls`
>>>>>>> ddf3e5d80710324dead3ffbada0b256c53cfd361
})
export class TableMedicamentComponent {
  @Input() medicaments: MedicamentPageOrd[] = [];
  @Input() role!: string;
<<<<<<< HEAD
  isPopupVisible = false;
  currentMedicament: MedicamentPageOrd | null = null;
  currentIndex: number | null = null;

  constructor() {
    this.loadFakeData();
  }
=======
  @Input() peutModifier!: boolean;
  @Input() ordonnanceId!: number;
  @Input() ordonnance!: OrdonnancePageOrd;
  index = 0;

  isPopupVisible = false;
  currentMedicament: MedicamentPageOrd | null = null; // Stores the medicament being modified
  currentIndex: number | null = null; // Stores the index of the medicament being modified
>>>>>>> ddf3e5d80710324dead3ffbada0b256c53cfd361

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
<<<<<<< HEAD
  updateMedicament(updatedMedicament: Partial<MedicamentPageOrd>): void {
=======
  updateMedicament(updatedMedicament: Partial<MedicamentPageOrd>) {
>>>>>>> ddf3e5d80710324dead3ffbada0b256c53cfd361
    if (this.currentIndex !== null && this.currentMedicament) {
      this.medicaments[this.currentIndex] = {
        ...this.medicaments[this.currentIndex],
        nom: updatedMedicament.nom || this.medicaments[this.currentIndex].nom,
<<<<<<< HEAD
        dosage: updatedMedicament.dosage || this.medicaments[this.currentIndex].dosage,
        duree: updatedMedicament.duree || this.medicaments[this.currentIndex].duree,
      };
      this.isPopupVisible = false;
=======
        dosage: updatedMedicament.dosage
          ? updatedMedicament.dosage
          : this.medicaments[this.currentIndex].dosage,
        duree: updatedMedicament.duree
          ? updatedMedicament.duree
          : this.medicaments[this.currentIndex].duree,
      };
      this.isPopupVisible = false; // Close the panel after saving the data
>>>>>>> ddf3e5d80710324dead3ffbada0b256c53cfd361
    }
  }
}

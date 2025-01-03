import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SaisirResultatComponent } from '../saisir-resultat/saisir-resultat.component';
import { Resultat } from '../bilan-bio/bilan-bio.component';
import { bilan } from '../bilan-bio/bilan-bio.component';
@Component({
  selector: 'app-table-param',
  imports: [SaisirResultatComponent, CommonModule],
  templateUrl: './table-param.component.html',
  styleUrl: './table-param.component.css',
})
export class TableParamComponent {
  @Input() params!: Resultat[];
  @Input() bilan!: bilan;
  @Input() laborantin!: number;
  @Input() user!: string;
  @Input() role!: string;
  index = 0;

  isPopupVisible = false;
  currentParam: Resultat | null = null; // Stores the param being modified
  currentIndex: number | null = null; // Stores the index of the param being modified

  /**
   * Opens the popup for modifying a medicament.
   * @param medicament The medicament to modify
   * @param index The index of the medicament in the list
   */
  openPopup(param: Resultat, index: number) {
    this.currentParam = { ...param }; // Clone the medicament to avoid direct mutation
    this.currentIndex = index;
    this.isPopupVisible = true;
  }

  /**
   * Closes the popup.
   */
  closePopup() {
    this.isPopupVisible = false;
    this.currentParam = null;
    this.currentIndex = null;
  }

  /**
   * Updates a medicament in the list.
   * @param updatedParam The updated medicament data
   */
  updateParam(updatedParam: Partial<Resultat>) {
    if (this.currentIndex !== null && this.currentParam) {
      this.params[this.currentIndex] = {
        ...this.params[this.currentIndex],
        norme: updatedParam.norme || this.params[this.currentIndex].norme,
        valeur_mesure:
          updatedParam.valeur_mesure ||
          this.params[this.currentIndex].valeur_mesure,
        laborantin: this.laborantin,
      };
      this.isPopupVisible = false; // Close the panel after saving the data
    }
  }
}

import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AjouterParamComponent } from '../ajouter-param/ajouter-param.component';
import { bilan, Resultat } from '../bilan-bio/bilan-bio.component';
@Component({
  selector: 'app-bilan-details',
  imports: [AjouterParamComponent, CommonModule],
  templateUrl: './bilan-details.component.html',
  styleUrl: './bilan-details.component.css',
})
export class BilanDetailsComponent {
  @Input() bilan!: bilan;
  @Input() params!: Resultat[];
  @Input() role!: string;

  isAddPanelVisible = false;
  isPopupVisible = false;
  terminate() {
    this.bilan.est_complet = true;
  }
  valider() {
    this.bilan.est_resultat = true;
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

  // Method to add a param (called when the new param is emitted from the form)
  addParam(newParam: Resultat) {
    this.params.push(newParam); // Add the new param to the list
    this.isAddPanelVisible = false; // Close the panel after adding
  }
}

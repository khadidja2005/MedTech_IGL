import { CommonModule } from '@angular/common';
import { Component,Input } from '@angular/core';
import { Ordonnance } from '../../../types/ordonance';
import { Medicament } from '../../../types/medicament';
import { AjouterMedicamentComponent } from '../ajouter-medicament/ajouter-medicament.component';

@Component({
  selector: 'app-ordonnace-details',
  imports: [CommonModule,AjouterMedicamentComponent],
  templateUrl: './ordonnace-details.component.html',
  styleUrl: './ordonnace-details.component.css'
})
export class OrdonnaceDetailsComponent {
  @Input() ordonnance !: Ordonnance;
  @Input() medicaments !: Medicament[];
  @Input() role !: string;
  isAddPanelVisible = false;
  isPopupVisible = false;
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
    addMedicament(newMedicament: Medicament) {
      newMedicament.id = ((this.medicaments.length)+1).toString();  // Example ID generation
      newMedicament.ordonnance = this.ordonnance.id;  // Set the hospitalisation ID
      this.medicaments.push(newMedicament);  // Add the new consultation to the list
      this.isAddPanelVisible = false;  // Close the panel after adding
    }


}

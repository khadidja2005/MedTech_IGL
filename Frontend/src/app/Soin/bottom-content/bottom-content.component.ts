import { Component, Input } from '@angular/core';
import { Soins } from '../../../types/soins';
import { CommonModule } from '@angular/common';
import { ModifierDetailsComponent } from '../modifier-details/modifier-details.component';

@Component({
  selector: 'app-bottom-content',
  imports: [CommonModule, ModifierDetailsComponent],
  templateUrl: './bottom-content.component.html',
  styleUrls: ['./bottom-content.component.css']
})
export class BottomContentComponent {
  @Input() soin!: Soins;
  @Input() role!: string;

  medicament: string = 'Medicament';
  dose: string = 'Dose';
  etat: string = 'Etat';
  description: string = 'Description';

  activeField: string | null = null; // Track which popup is visible
  currentDetail: string = ''; // Store the current detail being edited

  openPopup(field: string, detail: string) {
    this.activeField = field; // Set the active field
    this.currentDetail = detail; // Set the detail to display in the popup
  }

  closePopup() {
    this.activeField = null; // Clear the active field
    this.currentDetail = ''; // Reset the current detail
  }

  updateField(field: string, updatedData: Partial<String>) {
    if (!this.soin || !updatedData) return;

    // Update the relevant field in the `soin` object
    switch (field) {
      case 'medicament':
        this.soin.medicament = String(updatedData);
        break;
      case 'dose':
        this.soin.dose = String(updatedData);
        break;
      case 'etat':
        this.soin.etat_patient = String(updatedData);
        break;
      case 'description':
        this.soin.description = String(updatedData);
        break;
    }

    this.closePopup(); // Close the popup after updating
  }
}

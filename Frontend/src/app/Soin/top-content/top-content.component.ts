import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Soins } from '../../../types/soins';
import { FormsModule } from '@angular/forms';
import { ModifierSoinComponent } from '../modifier-soin/modifier-soin.component';
@Component({
  selector: 'app-top-content',
  imports: [CommonModule, FormsModule, ModifierSoinComponent],
  templateUrl: './top-content.component.html',
  styleUrl: './top-content.component.css'
})
export class TopContentComponent {
  @Input() soin!:Soins;
  @Input() role!: string;
    isAddPanelVisible = false;  // Flag to control the visibility of the "Add Consultation" panel
    isPopupVisible = false;
    @Input() infermiers: string[] = [];

    // Method to open the "Add Consultation" panel
    openAddPanel() {
      this.isAddPanelVisible = true;
    }

    // Method to close the "Add Consultation" panel
    closeAddPanel() {
      this.isAddPanelVisible = false;
    }

    openPopup() {
      this.isPopupVisible = true;
    }

    closePopup() {
      this.isPopupVisible = false;
    }

    // Method to update soin
    updateSoin(updatedData: Partial<Soins>) {
      this.soin = {
        ...this.soin,
        infermier: updatedData.infermier || this.soin.infermier,
        date: updatedData.date ? updatedData.date : this.soin.date,
        heure: updatedData.heure ? updatedData.heure : this.soin.heure,
        };
      this.isAddPanelVisible = false;  // Close the panel after saving the data
    }
}

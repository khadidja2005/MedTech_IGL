import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AjouterDPIComponent } from "../ajouter-dpi/ajouter-dpi.component";
import { DpiCards } from '../recherche/recherche.component';
import { Etab } from '../../Pharmacie/pharmacie/pharmacie.component';
import { ScannerComponent } from '../scanner/scanner.component';

@Component({
  selector: 'app-rech-header',
  imports: [CommonModule, AjouterDPIComponent,ScannerComponent],
  templateUrl: './rech-header.component.html',
  styleUrl: './rech-header.component.css'
})
export class RechHeaderComponent {
  @Input() dpis!: DpiCards[];
  @Input() etablissements!: Etab[];
  @Input() role!: string;
  @Input() isScannerPanelVisible!: boolean;

  isAddPanelVisible = false;
  isPopupVisible = false;

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
      addDpiCard(newDpiCard: DpiCards) {
        this.dpis.push(newDpiCard);  // Add the new consultation to the list
        this.isAddPanelVisible = false;  // Close the panel after adding
      }
      openScannerPanel() {
        this.isScannerPanelVisible = true;
      }

}

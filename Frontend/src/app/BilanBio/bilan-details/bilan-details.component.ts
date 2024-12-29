import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BilanBio } from '../../../types/bilanbio';
import { ResultatBio } from '../../../types/resultatbio';
import { AjouterParamComponent } from '../ajouter-param/ajouter-param.component';

@Component({
  selector: 'app-bilan-details',
  imports: [AjouterParamComponent,CommonModule],
  templateUrl: './bilan-details.component.html',
  styleUrl: './bilan-details.component.css'
})
export class BilanDetailsComponent {
  @Input() bilan!: BilanBio;
  @Input() params!: ResultatBio[];
  @Input() role!: string;

  isAddPanelVisible = false;
    isPopupVisible = false;
    terminate(){
      this.bilan.est_complet = true;
    }
    valider(){
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
      addParam(newParam: ResultatBio) {
        newParam.id = ((this.params.length)+1).toString();
        newParam.bilan_bio = this.bilan.id;  // Set the bilan ID
        this.params.push(newParam);  // Add the new param to the list
        this.isAddPanelVisible = false;  // Close the panel after adding
      }


}

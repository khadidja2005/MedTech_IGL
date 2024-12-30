import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BilanBio } from '../../../types/bilanbio';
import { ResultatBio } from '../../../types/resultatbio';
import { AjouterParamComponent } from '../ajouter-param/ajouter-param.component';
import { bilan, labo, Resultat } from '../bilan-bio/bilan-bio.component';
import { Etab } from '../../Pharmacie/pharmacie/pharmacie.component';
import { Patient } from '../../Ordonnance/ordonnance/ordonnance.component';
import { medecin } from '../../Hospitalisation/hospitalisation/hospitalisation.component';

@Component({
  selector: 'app-bilan-details',
  imports: [AjouterParamComponent,CommonModule],
  templateUrl: './bilan-details.component.html',
  styleUrl: './bilan-details.component.css'
})
export class BilanDetailsComponent {
  @Input() bilan!: bilan;
  @Input() params!: Resultat[];
  @Input() etablissements !: Etab[];
  @Input() labos!: labo[];
  @Input() patients!: Patient[];
  @Input() medecins!: medecin[];
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
      addParam(newParam: Resultat) {
        this.params.push(newParam);  // Add the new param to the list
        this.isAddPanelVisible = false;  // Close the panel after adding
      }

      getPatientName(patientId: number): string {
        return this.patients.find(p => p.id === patientId)?.nom || '';
      }
      getMedecinName(medecinId: number): string {
        return this.medecins.find(m => m.id === medecinId)?.nom || '';
      }
      getEtabName(etabId: number):string {
        return this.etablissements.find(e => e.id === etabId)?.nom || '';
      }


}

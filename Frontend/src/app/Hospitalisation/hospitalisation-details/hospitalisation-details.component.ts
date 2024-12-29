import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultaionsTableComponent } from '../consultaions-table/consultaions-table.component';
import { SoinsTableComponent } from '../soins-table/soins-table.component';
import { ModifierComponent } from '../modifier/modifier.component';
import { Hospitalisation } from '../../../types/hospitalisation';
import { Consultation } from '../../../types/consultation';
import { Soins } from '../../../types/soins';
import { AjouterConsultationComponent } from '../ajouter-consultation/ajouter-consultation.component';
import { AjouterSoinComponent } from '../ajouter-soin/ajouter-soin.component';

@Component({
  selector: 'app-hospitalisation-details',
  templateUrl: './hospitalisation-details.component.html',
  imports: [CommonModule, ConsultaionsTableComponent, SoinsTableComponent, ModifierComponent, AjouterConsultationComponent, AjouterSoinComponent],
  styleUrls: ['./hospitalisation-details.component.css']
})
export class HospitalisationDetailsComponent {
  @Input() role: string = 'medecinResponsable';
  selectedTab: string = 'consultations';
  isAddPanelVisible = false;  // Flag to control the visibility of the "Add Consultation" panel
  isPopupVisible = false;
  @Input() hospitalisation!: Hospitalisation;
  @Input() consultations!: Consultation[];  // This is the consultations array
  @Input() soins!: Soins[];
  @Input() medecins: string[] = [];
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

  // Method to add a consultation (called when the new consultation is emitted from the form)
  addConsultation(newConsultation: Consultation) {
    newConsultation.id = ((this.consultations.length)+1).toString();  // Example ID generation
    newConsultation.Hospitalisation = this.hospitalisation.id;  // Set the hospitalisation ID
    this.consultations.push(newConsultation);  // Add the new consultation to the list
    this.isAddPanelVisible = false;  // Close the panel after adding
  }
  addSoin(newSoin: Soins) {
    newSoin.id = ((this.soins.length)+1).toString();  // Example ID generation
    newSoin.hospitalisation = this.hospitalisation.id;  // Set the hospitalisation ID
    this.soins.push(newSoin);  // Add the new soin to the list
    this.isAddPanelVisible = false;  // Close the panel after adding
  }

  // Method to update hospitalisation (no changes needed here for consultation addition)
  updateHospitalisation(updatedData: Partial<Hospitalisation>) {
    this.hospitalisation = {
      ...this.hospitalisation,
      medecin_responsable: updatedData.medecin_responsable || this.hospitalisation.medecin_responsable,
      date_debut: updatedData.date_debut ? updatedData.date_debut : this.hospitalisation.date_debut,
      date_fin: updatedData.date_fin ? updatedData.date_fin : this.hospitalisation.date_fin,
      status: updatedData.status || this.hospitalisation.status
    };
    this.isAddPanelVisible = false;  // Close the panel after saving the data
  }
}

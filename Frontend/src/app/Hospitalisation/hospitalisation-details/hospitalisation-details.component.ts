import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultaionsTableComponent } from '../consultaions-table/consultaions-table.component';
import { SoinsTableComponent } from '../soins-table/soins-table.component';
import { ModifierComponent } from '../modifier/modifier.component';
import { AjouterConsultationComponent } from '../ajouter-consultation/ajouter-consultation.component';
import {
  AjouterSoinComponent,
  SoinPageAjouter,
} from '../ajouter-soin/ajouter-soin.component';
import {
  ConsultationPageHospitalisation,
  HospitalisationPage,
  medecin,
  SoinPageHospitalisation,
} from '../hospitalisation/hospitalisation.component';

@Component({
  selector: 'app-hospitalisation-details',
  templateUrl: './hospitalisation-details.component.html',
  imports: [
    CommonModule,
    ConsultaionsTableComponent,
    SoinsTableComponent,
    ModifierComponent,
    AjouterConsultationComponent,
    AjouterSoinComponent,
  ],
  styleUrls: ['./hospitalisation-details.component.css'],
})
export class HospitalisationDetailsComponent {
  @Input() role: string = 'medecinResponsable';
  selectedTab: string = 'consultations';
  isAddPanelVisible = false; // Flag to control the visibility of the "Add Consultation" panel
  isPopupVisible = false;
  @Input() hospitalisation!: HospitalisationPage;
  @Input() consultations!: ConsultationPageHospitalisation[]; // This is the consultations array
  @Input() soins!: SoinPageHospitalisation[]; // This is the soins array
  @Input() medecins!: medecin[];

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

  getStatus() {
    if (this.hospitalisation.date_fin == null) {
      return 'En cours';
    }
    return 'fini';
  }
  nom = 'infermier'; //localStorage
  // Method to add a consultation (called when the new consultation is emitted from the form)
  addConsultation(newConsultation: ConsultationPageHospitalisation) {
    this.consultations.push(newConsultation); // Add the new consultation to the list
    this.isAddPanelVisible = false; // Close the panel after adding
  }
  addSoin(newSoin: SoinPageAjouter) {
    const soin: SoinPageHospitalisation = {
      id: newSoin.id,
      type_soins: newSoin.type,
      infermier: newSoin.infermier,
      date: newSoin.date,
      heure: newSoin.heure,
    };
    this.soins.push(soin); // Add the new soin to the list
    this.isAddPanelVisible = false; // Close the panel after adding
  }

  // Method to update hospitalisation (no changes needed here for consultation addition)
  updateHospitalisation(updatedData: Partial<HospitalisationPage>) {
    this.hospitalisation = {
      ...this.hospitalisation,
      medecin: updatedData.medecin || this.hospitalisation.medecin,
      date_debut: updatedData.date_debut
        ? updatedData.date_debut
        : this.hospitalisation.date_debut,
      date_fin: updatedData.date_fin
        ? updatedData.date_fin
        : this.hospitalisation.date_fin,
    };
    this.isAddPanelVisible = false; // Close the panel after saving the data
  }
}

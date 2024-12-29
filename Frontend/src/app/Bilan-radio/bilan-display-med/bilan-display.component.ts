import { Component } from '@angular/core';
import { ResultatBio } from '../../../types/resultatbio';
import { ResultatRadio } from '../../../types/resultatradio';
import { BilanRadio } from '../../../types/bilanRadio';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bilan-display',
  imports: [CommonModule, FormsModule],
  templateUrl: './bilan-display.component.html',
  styleUrl: './bilan-display.component.css'
})
export class BilanDisplayComponent {

  user1 = {
    Admin: true,
    name: "Mohamed Reda",
    id: 'USER-051',
    profession: 'medecin'
  };


  bilan: BilanRadio = {
    id: '1',
    description: "This is a comprehensive description of the bilan, providing detailed insights into the patient's radio diagnosis process.",
    date_debut: '2024-12-01',
    date_fin: '2024-12-10',
    type_radio: 'RADIO',
    est_complet: true,
    est_resultat: true,
    medecin: 'Sarah Bensaid',
    Consultation: 'description',
    resultat_id: 'R1',
    etablissement: 'Clinique El-Amel',
    patient: 'Amina khelifi'
  };

  result: ResultatRadio = {
    id: 'R1',
    description: 'The radiology report indicates a mild inflammation in the lower chest region.',
    piece_jointe: 'report.pdf',
    date: '2024-12-11',
    compte_rendu: 'Further tests are recommended to confirm the diagnosis.',
    radiologue_compte_rendu: 'Reviewed by Dr. Amine Mansouri',
    radiologue: 'Dr. Amine Mansouri',
    
  };

showTypeModal = false;
showResumeModal = false;
showViewModal = false;  // New variable for view-only modal
addTypeModalMode: 'add' | 'view' = 'add';
editedDescription: string = '';
viewOnlyDescription: string = '';  // New variable for view-only content

// View-only modal functions
openViewDescription() {
  if (!this.caneditBilanMed()) {
    this.viewOnlyDescription = this.bilan.description;
    this.showViewModal = true;
  }
}

closeViewModal() {
  this.showViewModal = false;
}

// Original functions remain the same...
deleteBilan() {
  console.log("Bilan deleted");
}

modifyType() {
  this.addTypeModalMode = 'add';
  this.showTypeModal = true;
}

deleteType() {
  this.bilan.type_radio = 'RADIO';
}

modifyDescription() {
  if (this.caneditBilanMed()) {
    this.editedDescription = this.bilan.description;
    this.showResumeModal = true;
  }
}

deleteDescription() {
  this.bilan.description = '';
}

toggleTypeModal() {
  this.showTypeModal = !this.showTypeModal;
}

showDescriptionModal(mode: 'edit' | 'view'): boolean {
  return mode === 'edit' ? this.showResumeModal : false;
}

saveDescription() {
  this.bilan.description = this.editedDescription;
  this.showResumeModal = false;
}

addType() {
  if (this.bilan.type_radio) {
    this.bilan.type_radio = this.bilan.type_radio;
    this.showTypeModal = false;
  }
}

saveBilan() {
  console.log("Saving bilan...");
}

caneditBilanMed() {
  return (this.user1.profession === 'medecin' && this.bilan.est_resultat);
}

canNOTeditBilanMed() {
  return (this.user1.profession === 'medecin' && !this.bilan.est_resultat);
}
}

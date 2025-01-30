import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export type TypeRadio = 'RADIO' | 'SCANNER' | 'IRM';

export interface BilanRadio {
  id: number;
  date_debut: string; // ISO date string
  date_fin: string; // ISO date string
  type_radio: TypeRadio;
  est_complet: boolean;
  est_resultat: boolean;
  description: string;
  Consultation: string; // Foreign key to Consultation, nullable
  resultat_id: number | null;
  etablissement: number;
  medecin: string;
  patient: string;
}
export interface ResultatRadio {
  id: number;
  description: string;
  piece_jointe: string;
  date: string; // ISO date string
  compte_rendu: string;
  radiologue_compte_rendu: number | null; // Foreign key to PersonnelMedical
  radiologue: number | null; // Foreign key to PersonnelMedical
}

@Component({
  selector: 'app-bilan-display',
  imports: [CommonModule, FormsModule],
  templateUrl: './bilan-display.component.html',
  styleUrl: './bilan-display.component.css',
})
export class BilanDisplayComponent {
  @Input() bilan!: BilanRadio;
  @Input() medecin!: number;

  user1 = {
    Admin: localStorage.getItem('role') == 'ADMIN',
    name: localStorage.getItem('nom_complet'),
    id: localStorage.getItem('id'),
    profession: localStorage.getItem('role')?.toLowerCase(),
  };

  showTypeModal = false;
  showResumeModal = false;
  showViewModal = false; // New variable for view-only modal
  addTypeModalMode: 'add' | 'view' = 'add';
  editedDescription: string = '';
  viewOnlyDescription: string = ''; // New variable for view-only content

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
    console.log('Bilan deleted');
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
    console.log('Saving bilan...');
  }

  caneditBilanMed() {
    return (
      this.user1.profession === 'medecin' &&
      !this.bilan.est_resultat &&
      this.bilan.medecin === this.user1.name &&
      this.medecin === parseInt(this.user1.id || '0')
    );
  }

  canNOTeditBilanMed() {
    return this.user1.profession === 'medecin' && this.bilan.est_resultat;
  }

  ngOnInit() {
    if (!this.bilan) {
      this.bilan = {
        id: 0,
        description: 'This is a comprehensive description...',
        date_debut: '2024-12-01',
        date_fin: '2024-12-10',
        type_radio: 'RADIO',
        est_complet: false,
        est_resultat: false,
        medecin: 'Sarah Bensaid',
        Consultation: 'description',
        resultat_id: 0,
        etablissement: 2,
        patient: 'Amina khelifi',
      };
    }
  }
}

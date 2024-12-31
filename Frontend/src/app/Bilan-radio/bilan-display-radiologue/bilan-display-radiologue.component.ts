import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes } from '@angular/router';
import { PageBilanComponent } from '../page-bilan/page-bilan.component';



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
  medecin:string;
  patient:string;

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
  selector: 'app-bilan-display-radiologue',
  imports: [CommonModule, FormsModule],
  templateUrl: './bilan-display-radiologue.component.html',
  styleUrl: './bilan-display-radiologue.component.css'
})
export class BilanDisplayRadiologueComponent {


  @Input() bilan!: BilanRadio ;
  @Input() result!: ResultatRadio;



  showViewModal = false;
  showEditModal = false;
  viewMode: 'description' | 'compteRendu' = 'description';
  viewOnlyDescription = '';
  viewOnlyCompteRendu:string|null = '';
  editedCompteRendu  = '';
  selectedPDF: File | null = null;
  importedPDF = false;

  // Remove HttpClient from constructor since we don't need it
  constructor() {}

  ImporterPDF(event: any): void {
    const file = event.target.files[0];

    if (!file) {
      alert('Aucun fichier sélectionné');
      return;
    }

    if (file.type !== 'application/pdf') {
      alert('Veuillez sélectionner un fichier PDF valide');
      return;
    }

    try {
      // Store the PDF locally
      this.selectedPDF = file;

      // Update local state
      this.result.piece_jointe = file.name;
      this.bilan.est_complet = true;
      this.importedPDF = true;

      // Optional: Show success message
      alert('PDF importé avec succès');

    } catch (error) {
      console.error('Error handling PDF:', error);
      this.resetPDFState();
      alert('Erreur lors du traitement du PDF');
    }
  }

  private resetPDFState(): void {
    this.selectedPDF = null;
    this.importedPDF = false;
    this.result.piece_jointe = '';
    this.bilan.est_complet = false;
  }

  viewPDF(): void {
    if (this.selectedPDF) {
      const fileURL = URL.createObjectURL(this.selectedPDF);
      window.open(fileURL, '_blank');
    }
  }

  BilanNonValid(): boolean {
    return !this.bilan.est_resultat;
  }

  BilanNonComplet(): boolean {
    return !this.bilan.est_complet || !this.result.piece_jointe;
  }

  ValiderBilan(): void {
    if (!this.BilanNonComplet()) {
      this.bilan.est_resultat = true;
      // Optional: Show success message
      alert('Bilan validé avec succès');
    } else {
      alert('Veuillez importer un PDF avant de valider le bilan');
    }
  }

  // Compte rendu functions
  saveCompteRendu(): void {
    this.result.compte_rendu = this.editedCompteRendu;
    this.closeEditModal();
  }

  deleteCompteRendu(): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce compte rendu ?')) {
      this.result.compte_rendu = '';
    }
  }

  // Modal functions remain the same
  openViewDescription(): void {
    this.viewMode = 'description';
    this.viewOnlyDescription = this.bilan.description;
    this.showViewModal = true;
  }

  openViewCompteRendu(): void {
    this.viewMode = 'compteRendu';
    this.viewOnlyCompteRendu = this.result.compte_rendu || '';
    this.showViewModal = true;
  }

  closeViewModal(): void {
    this.showViewModal = false;
    this.viewOnlyDescription = '';
    this.viewOnlyCompteRendu = '';
  }

  modifyCompteRendu(): void {
    this.editedCompteRendu = this.result.compte_rendu || '';
    this.showEditModal = true;
  }

  closeEditModal(): void {
    this.showEditModal = false;
    this.editedCompteRendu = '';
  }


  ngOnInit() {
    if (!this.bilan || !this.result) {
      this.bilan = {
        id: 0,
        description: "This is a comprehensive description...",
        date_debut: '2024-12-01',
        date_fin: '2024-12-10',
        type_radio: 'RADIO',
        est_complet: false,
        est_resultat: false,
        medecin: 'Sarah Bensaid',
        Consultation: 'description',
        resultat_id: 0,
        etablissement: 2,
        patient: 'Amina khelifi'
      };

      this.result = {
        id: 0,
        description: 'The radiology report...',
        piece_jointe: '',
        date: '2024-12-11',
        compte_rendu: 'Further tests...',
        radiologue_compte_rendu: 1,
        radiologue: 2,
      };
    }
  }
}

}

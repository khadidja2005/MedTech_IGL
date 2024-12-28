import { Component } from '@angular/core';
import { BilanRadio } from '../../../types/bilanRadio';
import { ResultatRadio } from '../../../types/resultatradio';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bilan-display-radiologue',
  imports: [CommonModule, FormsModule],
  templateUrl: './bilan-display-radiologue.component.html',
  styleUrl: './bilan-display-radiologue.component.css'
})
export class BilanDisplayRadiologueComponent {
  bilan: BilanRadio = {
    id: '1',
    description: "This is a comprehensive description of the bilan, providing detailed insights into the patient's radio diagnosis process.",
    date_debut: '2024-12-01',
    date_fin: '2024-12-10',
    type_radio: 'RADIO',
    est_complet: false,  // Initially false until PDF is uploaded
    est_resultat: false,
    medecin: 'Sarah Bensaid',
    Consultation: 'description',
    resultat_id: 'R1',
    etablissement: 'Clinique El-Amel',
    patient: 'Amina khelifi'
  };

  result: ResultatRadio = {
    id: 'R1',
    description: 'The radiology report indicates a mild inflammation in the lower chest region.',
    piece_jointe: '',  // Initially empty until PDF is uploaded
    date: '2024-12-11',
    compte_rendu: 'Further tests are recommended to confirm the diagnosis.',
    radiologue_compte_rendu: 'Reviewed by Dr. Amine Mansouri',
    radiologue: 'Amine Mansouri',
  };

  showViewModal = false;
  showEditModal = false;
  viewMode: 'description' | 'compteRendu' = 'description';
  viewOnlyDescription = '';
  viewOnlyCompteRendu = '';
  editedCompteRendu = '';
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
    this.viewOnlyCompteRendu = this.result.compte_rendu;
    this.showViewModal = true;
  }

  closeViewModal(): void {
    this.showViewModal = false;
    this.viewOnlyDescription = '';
    this.viewOnlyCompteRendu = '';
  }

  modifyCompteRendu(): void {
    this.editedCompteRendu = this.result.compte_rendu;
    this.showEditModal = true;
  }

  closeEditModal(): void {
    this.showEditModal = false;
    this.editedCompteRendu = '';
  }
}
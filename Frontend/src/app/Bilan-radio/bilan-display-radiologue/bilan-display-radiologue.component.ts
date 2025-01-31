import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import axios from 'axios';
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
  piece_jointe: string;
  date: string;
  description: string;
  compte_rendu: string;
  radiologue_compte_rendu: number | null;
  radiologue_compte_rendu_nom: string | null;
  radiologue: number | null;
  radiologue_nom: string | null;
}

@Component({
  selector: 'app-bilan-display-radiologue',
  imports: [CommonModule, FormsModule],
  templateUrl: './bilan-display-radiologue.component.html',
  styleUrl: './bilan-display-radiologue.component.css',
})
export class BilanDisplayRadiologueComponent {
  @Input() bilan!: BilanRadio;
  @Input() result!: ResultatRadio;

  showViewModal = false;
  showEditModal = false;
  viewMode: 'description' | 'compteRendu' = 'description';
  viewOnlyDescription = '';
  viewOnlyCompteRendu: string | null = '';
  editedCompteRendu = '';
  selectedPDF: File | null = null;
  importedPDF = false;
  ngOnInit() {
    if (this.result.piece_jointe) {
      const base64String = this.result.piece_jointe;

      // Check if the base64 string is valid (basic regex check)
      const base64Pattern = /^[A-Za-z0-9+/=]+$/;
      if (base64Pattern.test(base64String)) {
        // It's valid, proceed with the decoding
        const byteCharacters = atob(base64String);
        const byteNumbers = new Array(byteCharacters.length)
          .fill(0)
          .map((_, i) => byteCharacters.charCodeAt(i));
        const byteArray = new Uint8Array(byteNumbers);

        // Reconstruction du Blob
        this.selectedPDF = new File([byteArray], 'imported.pdf', {
          type: 'application/pdf',
          lastModified: Date.now(),
        });
        this.importedPDF = true;
      }
      // If not valid, do nothing
    }
  }
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
      this.importedPDF = true;

      // Optional: Show success message
      alert('PDF importé avec succès');
      let reader = new FileReader();
      reader.readAsDataURL(file); // Convert file to Base64
      reader.onload = () => {
        let base64String =
          typeof reader.result === 'string' ? reader.result.split(',')[1] : ''; // Remove header
        axios
          .post('http://localhost:8000/bilanradio/ajouter/resultat/pdf', {
            pdf: base64String,
            bilan_id: this.bilan.id,
            radiologue_id: localStorage.getItem('id'),
          })
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      };
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
      axios
        .post('http://localhost:8000/bilanradio/valider', {
          bilan_id: this.bilan.id,
          radiologue_id: localStorage.getItem('id'),
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert('Veuillez importer un PDF avant de valider le bilan');
    }
  }

  // Compte rendu functions
  saveCompteRendu(): void {
    this.result.compte_rendu = this.editedCompteRendu;
    axios
      .post('http://localhost:8000/bilanradio/ajouter/resultat/compte-rendu', {
        compte_rendu: this.editedCompteRendu,
        bilan_id: this.bilan.id,
        radiologue_id: localStorage.getItem('id'),
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    this.closeEditModal();
  }

  deleteCompteRendu(): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce compte rendu ?')) {
      this.result.compte_rendu = '';
      axios
        .delete(
          `http://localhost:8000/bilanradio/supprimer/resultat/compte-rendu/${this.bilan.id}`,
          {
            params: {
              radiologue_id: localStorage.getItem('id'),
            },
          }
        )
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
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
}

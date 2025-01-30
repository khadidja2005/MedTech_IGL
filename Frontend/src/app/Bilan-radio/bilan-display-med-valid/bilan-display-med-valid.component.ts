import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

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
  selector: 'app-bilan-display-med-valid',
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './bilan-display-med-valid.component.html',
  styleUrl: './bilan-display-med-valid.component.css',
})
export class BilanDisplayMedValidComponent {
  @Input() bilan!: BilanRadio;
  @Input() result!: ResultatRadio;

  showCompteRenduModal = false;
  importedPDF = false;

  showDescriptionModal(type: 'edit' | 'view'): boolean {
    return type === 'edit' ? this.showCompteRenduModal : this.showViewModal;
  }

  // Modal states
  showViewModal = false;
  showEditModal = false;
  viewMode: 'description' | 'compteRendu' = 'description';

  // Modal content
  viewOnlyDescription = '';
  viewOnlyCompteRendu: string | null = null;
  editedCompteRendu = '';
  // View Modal Functions
  openViewDescription(): void {
    this.viewMode = 'description';
    this.viewOnlyDescription = this.bilan.description;
    this.showViewModal = true;
  }

  openViewCompteRendu(): void {
    this.viewMode = 'compteRendu';
    this.viewOnlyCompteRendu = this.result.compte_rendu ?? '';
    this.showViewModal = true;
  }

  closeViewModal(): void {
    this.showViewModal = false;
    this.viewOnlyDescription = '';
    this.viewOnlyCompteRendu = '';
  }

  // Edit Modal Functions
  modifyCompteRendu(): void {
    this.editedCompteRendu = this.result.compte_rendu ?? '';
    this.showEditModal = true;
  }

  closeEditModal(): void {
    this.showEditModal = false;
    this.editedCompteRendu = '';
  }

  async saveCompteRendu(): Promise<void> {
    try {
      // Update local state
      this.result.compte_rendu = this.editedCompteRendu;

      // Update backend
      await this.http
        .patch(`YOUR_API_ENDPOINT/resultats/${this.result.id}`, {
          compte_rendu: this.editedCompteRendu,
        })
        .toPromise();

      // Close modal after successful save
      this.closeEditModal();
    } catch (error) {
      console.error('Error saving compte rendu:', error);
      // Handle error (you might want to add error handling UI)
    }
  }

  async deleteCompteRendu(): Promise<void> {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce compte rendu ?')) {
      try {
        // Update local state
        this.result.compte_rendu = '';

        // Update backend
        await this.http
          .patch(`YOUR_API_ENDPOINT/resultats/${this.result.id}`, {
            compte_rendu: '',
          })
          .toPromise();
      } catch (error) {
        console.error('Error deleting compte rendu:', error);
        // Handle error (you might want to add error handling UI)
      }
    }
  }

  selectedPDF: File | null = null;

  constructor(private http: HttpClient) {}

  async ImporterPDF(event: any): Promise<void> {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      try {
        this.selectedPDF = file;
        const formData = new FormData();
        formData.append('pdf', file);

        formData.append('bilanId', this.bilan.id.toString()); // Convert ID to string for FormData

        await this.http
          .post('YOUR_API_ENDPOINT/upload-pdf', formData)
          .toPromise();

        this.result.piece_jointe = file.name;

        await this.http
          .patch(`YOUR_API_ENDPOINT/bilans/${this.bilan.id}`, {
            est_complet: true,
            piece_jointe: file.name,
          })
          .toPromise();

        this.bilan.est_complet = true;
        this.importedPDF = true;
      } catch (error) {
        console.error('Error uploading PDF:', error);
        this.selectedPDF = null;
        this.importedPDF = false;
        this.result.piece_jointe = '';
        this.bilan.est_complet = false;
        alert('Erreur lors du téléchargement du PDF. Veuillez réessayer.');
      }
    } else {
      alert('Veuillez sélectionner un fichier PDF valide');
    }
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

  async ValiderBilan(): Promise<void> {
    if (!this.BilanNonComplet()) {
      // Check if bilan is complete
      try {
        this.bilan.est_resultat = true;

        await this.http
          .patch(`YOUR_API_ENDPOINT/bilans/${this.bilan.id}`, {
            est_resultat: true,
          })
          .toPromise();
      } catch (error) {
        console.error('Error validating bilan:', error);
        this.bilan.est_resultat = false;
        alert('Erreur lors de la validation du bilan');
      }
    } else {
      alert('Veuillez importer un PDF avant de valider le bilan');
    }
  }

  ngOnInit() {
    if (!this.bilan || !this.result) {
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

      this.result = {
        id: 0,
        description: 'The radiology report...',
        piece_jointe: '',
        date: '2024-12-11',
        compte_rendu: 'Further tests...',
        radiologue_compte_rendu: 1,
        radiologue: 2,
        radiologue_nom: 'Dr. Radiologue',
        radiologue_compte_rendu_nom: 'Dr. Radiologue',
      };
    }
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
      } else {
        console.log('pdf not valid');
      }
    }
  }
}

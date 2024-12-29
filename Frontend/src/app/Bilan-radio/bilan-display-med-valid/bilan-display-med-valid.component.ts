import { Component } from '@angular/core';
import { BilanRadio } from '../../../types/bilanRadio';
import { ResultatRadio } from '../../../types/resultatradio';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-bilan-display-med-valid',
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './bilan-display-med-valid.component.html',
  styleUrl: './bilan-display-med-valid.component.css'
})
export class BilanDisplayMedValidComponent {

bilan: BilanRadio = {
    id: '1',
    description: "This is a comprehensive description of the bilan, providing detailed insights into the patient's radio diagnosis process.",
    date_debut: '2024-12-01',
    date_fin: '2024-12-10',
    type_radio: 'RADIO',
    est_complet: true,
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
    piece_jointe: 'report.pdf',
    date: '2024-12-11',
    compte_rendu: 'Further tests are recommended to confirm the diagnosis.',
    radiologue_compte_rendu: 'Reviewed by Dr. Amine Mansouri',
    radiologue: 'Amine Mansouri',
  };

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
 viewOnlyCompteRendu = '';
 editedCompteRendu = '';

 // View Modal Functions
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

 // Edit Modal Functions
 modifyCompteRendu(): void {
   this.editedCompteRendu = this.result.compte_rendu;
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
     await this.http.patch(`YOUR_API_ENDPOINT/resultats/${this.result.id}`, {
       compte_rendu: this.editedCompteRendu
     }).toPromise();

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
       await this.http.patch(`YOUR_API_ENDPOINT/resultats/${this.result.id}`, {
         compte_rendu: ''
       }).toPromise();
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
        formData.append('bilanId', this.bilan.id);
  
        // Upload the PDF file first
        await this.http.post('YOUR_API_ENDPOINT/upload-pdf', formData).toPromise();
  
        // Only update the local state after successful upload
        this.result.piece_jointe = file.name;
        
        // Update the bilan status
        await this.http.patch(`YOUR_API_ENDPOINT/bilans/${this.bilan.id}`, {
          est_complet: true,
          piece_jointe: file.name
        }).toPromise();
  
        // Update local state last
        this.bilan.est_complet = true;
        this.importedPDF = true;
  
      } catch (error) {
        console.error('Error uploading PDF:', error);
        // Reset states on error
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
  
  async viewPDF(): Promise<void> {
    if (this.importedPDF || this.result.piece_jointe) {  // Changed condition
      try {
        const response = await this.http.get(
          `YOUR_API_ENDPOINT/pdf/${this.bilan.id}`,
          { responseType: 'blob' }
        ).toPromise();
        
        if (response) {
          const blob = new Blob([response], { type: 'application/pdf' });
          const url = window.URL.createObjectURL(blob);
          window.open(url, '_blank');
        }
      } catch (error) {
        console.error('Error fetching PDF:', error);
        alert('Erreur lors du chargement du PDF');
      }
    }
  }

  BilanNonValid(): boolean {
    return !this.bilan.est_resultat;
  }

  BilanNonComplet(): boolean {
    return !this.bilan.est_complet || !this.result.piece_jointe;
  }

  async ValiderBilan(): Promise<void> {
    if (!this.BilanNonComplet()) {  // Check if bilan is complete
      try {
        this.bilan.est_resultat = true;
        
        await this.http.patch(`YOUR_API_ENDPOINT/bilans/${this.bilan.id}`, {
          est_resultat: true
        }).toPromise();
      } catch (error) {
        console.error('Error validating bilan:', error);
        this.bilan.est_resultat = false;
        alert('Erreur lors de la validation du bilan');
      }
    } else {
      alert('Veuillez importer un PDF avant de valider le bilan');
    }
  }
}

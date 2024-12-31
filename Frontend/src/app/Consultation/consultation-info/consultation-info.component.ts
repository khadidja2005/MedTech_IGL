import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Ordonnance {
  id: number;
  estValide: boolean;
  estTerminer: boolean;
  consultation: number;
  pharmacien_id: number | null;
  etablissement: number;
  date: string;
}

export interface BaseBilan {
  id: number;
  date_debut: string;
  date_fin: string; 
  est_complet: boolean;
  est_resultat: boolean;
  medecin: string;
  Consultation: number | null;
  etablissement: number;
  patient: string;
}

export type TypeRadio = 'RADIO' | 'SCANNER' | 'IRM';

export interface BilanRadio extends BaseBilan {
  type_radio: TypeRadio;
  description: string;
  resultat_id: number | null;
}

export interface BilanBio extends BaseBilan {
  parametres: string;
}

export type CombinedBilan = 
  | (BilanRadio & { type: 'radio' })
  | (BilanBio & { type: 'bio' });

export interface BilanRadio extends BaseBilan {
  type_radio: TypeRadio;
  description: string;
  resultat_id: number | null;
}


    @Component({
      selector: 'app-consultation-info',
      standalone: true,
      templateUrl: './consultation-info.component.html',
      imports: [CommonModule, FormsModule],
      styleUrls: ['./consultation-info.component.css']
    })
    export class ConsultationInfoComponent implements OnInit {
      consultation = {
        id: 1,
        resume: "Patient presented with mild symptoms of fever and headache.",
        date: "2024-12-24T10:30:00Z",
        Ordonnance: 12345,
        Medecin: "Mohamed Reda"
      };
    
      medecins = ["Amine Bensalem", "Leila Hamdi", "Yacine Belkacem", "Souad Khelifi", "Mohamed Reda"];
      pharmaciens = ["Amine Bensalem", "Leila Hamdi", "Yacine Belkacem", "Souad Khelifi", "Mohamed Reda"];
      sontValides = ["Validé", "Non validé"];
    
      user1 = {
        Admin: true,
        name: "Mohamed Reda",
        id: 51,
        profession: 'infermier'
      };
    
      // UI state properties
      showModifyModal = false;
      showMedecinDropdown = false;
      selectedMedecin: string | null = null;
      selectedDate: string | undefined;
      showModal = false;
      selectedMenu = 1;
      editedResume = '';
      showResumeModal = false;
    
      // Ordonnance state
      showOrdonnanceModal = false;
      addOrdonnanceModalMode: 'add' | 'view' = 'add';
      selectedOrdonnance: Ordonnance | null = null;
      OrdonnanceValidationErrors: Record<string, string> = {};
    
      // Bilan state
      showBilanModal = false;
      addBilanModalMode: 'add' | 'view' = 'add';
      selectedBilan: CombinedBilan | null = null;
      BilanValidationErrors: Record<string, string> = {};
    
      // Data collections
      Ordonnances: Ordonnance[] = [
        {
          id: 1,
          date: '2024-12-24T10:30:00Z',
          estValide: true,
          consultation: 1,
          pharmacien_id: 1,
          estTerminer: false,
          etablissement: 0
        },
        {
          id: 2,
          date: '2024-12-24T11:30:00Z',
          estValide: false,
          consultation: 1,
          pharmacien_id: 2,
          estTerminer: false,
          etablissement: 0
        }
      ];
    
      combinedBilans: CombinedBilan[] = [];
    
      private readonly staticRadioBilans: BilanRadio[] = [/* ... existing data ... */];
      private readonly staticBioBilans: BilanBio[] = [/* ... existing data ... */];
    
      newOrdonnance: Partial<Ordonnance> = this.getInitialOrdonnance();
      newBilan: Partial<CombinedBilan> = this.getInitialBilan();
    
      // Initialization methods
      private getInitialOrdonnance(): Partial<Ordonnance> {
        return {
          id: 0,
          date: '',
          estValide: false,
          consultation: 0,
          pharmacien_id: 0
        };
      }
    
      private getInitialBilan(): Partial<CombinedBilan> {
        return {
          id: 0,
          date_debut: '',
          date_fin: '',
          est_complet: false,
          est_resultat: false,
          medecin: '',
          Consultation: 0
        };
      }
    
      // Consultation methods
      deleteConsultation(): void {
        if (confirm('Êtes-vous sûr de vouloir supprimer cette Consultation ?')) {
          // TODO: Implement actual deletion logic
          alert('Consultation supprimée avec succès');
        }
      }
    
      modifyConsultation(): void {
        this.selectedDate = this.consultation.date.slice(0, 16);
        this.showModifyModal = true;
      }
    
      toggleMedecinDropdown(event?: MouseEvent): void {
        if (event) {
          event.stopPropagation();
        }
        this.showMedecinDropdown = !this.showMedecinDropdown;
      }
    
      selectMedecin(medecin: string): void {
        this.selectedMedecin = medecin;
        this.showMedecinDropdown = false;
      }
    
      saveModifications(): void {
        if (!this.validateModifications()) {
          return;
        }
    
        this.consultation.Medecin = this.selectedMedecin!;
        this.consultation.date = new Date(this.selectedDate!).toISOString();
        
        alert('Consultation modifiée avec succès');
        this.closeModifyModal();
      }
    
      private validateModifications(): boolean {
        if (!this.selectedMedecin) {
          alert('Veuillez sélectionner un médecin');
          return false;
        }
    
        if (!this.selectedDate) {
          alert('Veuillez sélectionner une date');
          return false;
        }
    
        return true;
      }
    
      // Resume methods
      modifyResume(): void {
        this.editedResume = this.consultation.resume;
        this.showResumeModal = true;
      }
    
      saveResume(): void {
        if (!this.editedResume.trim()) {
          alert('Le résumé ne peut pas être vide');
          return;
        }
    
        this.consultation.resume = this.editedResume;
        alert('Résumé modifié avec succès');
        this.closeResumeModal();
      }
    
      deleteResume(): void {
        if (confirm('Êtes-vous sûr de vouloir supprimer ce résumé ?')) {
          this.consultation.resume = '';
          alert('Résumé supprimé avec succès');
        }
      }
    
      // Ordonnance methods
      toggleOrdonnanceModal(mode: 'add' | 'view' = 'add', ordonnance?: Ordonnance): void {
        this.addOrdonnanceModalMode = mode;
        this.OrdonnanceValidationErrors = {};
    
        if (mode === 'view' && ordonnance) {
          this.selectedOrdonnance = ordonnance;
          this.newOrdonnance = { ...ordonnance };
        } else {
          this.selectedOrdonnance = null;
          this.newOrdonnance = this.getInitialOrdonnance();
          this.newOrdonnance.consultation = this.consultation?.id || 0;
        }
    
        this.showOrdonnanceModal = !this.showOrdonnanceModal;
      }
    
      validateOrdonnance(): boolean {
        this.OrdonnanceValidationErrors = {};
        let isValid = true;
    
        if (!this.newOrdonnance.pharmacien_id) {
          this.OrdonnanceValidationErrors['pharmacien_id'] = 'Le pharmacien est requis';
          isValid = false;
        }
    
        if (!this.newOrdonnance.date) {
          this.OrdonnanceValidationErrors['date'] = 'La date est requise';
          isValid = false;
        }
    
        return isValid;
      }
    
      addOrdonnance(): void {
        if (!this.validateOrdonnance()) {
          return;
        }
    
        const ordonnance: Ordonnance = {
          ...this.getInitialOrdonnance(),
          date: this.newOrdonnance.date!,
          estValide: this.newOrdonnance.estValide || false,
          consultation: this.consultation.id,
          pharmacien_id: this.newOrdonnance.pharmacien_id!,
          id: this.getNextOrdonnanceId(),
          estTerminer: false,
          etablissement: 0
        };
    
        this.Ordonnances.push(ordonnance);
        alert('Ordonnance ajoutée avec succès');
        this.toggleOrdonnanceModal();
      }
    
      // Bilan methods
      private createNewBilan(type: 'bio' | 'radio', data: Partial<CombinedBilan>): CombinedBilan {
        const baseBilan: BaseBilan = {
          id: data.id || 0,
          date_debut: data.date_debut || '',
          date_fin: data.date_fin || '', // Default to empty string instead of null
          est_complet: data.est_complet || false,
          est_resultat: data.est_resultat || false,
          medecin: data.medecin || '',
          Consultation: data.Consultation || null,
          etablissement: 0,
          patient: ''
        };
      
        if (type === 'bio') {
          return {
            ...baseBilan,
            type: 'bio' as const,
            parametres: ''
          };
        }
      
        return {
          ...baseBilan,
          type: 'radio' as const,
          type_radio: 'RADIO',
          description: '',
          resultat_id: null
        };
      }
    
      toggleBilanModal(mode: 'add' | 'view' = 'add', bilan?: CombinedBilan): void {
        this.addBilanModalMode = mode;
        this.BilanValidationErrors = {};
        
        if (mode === 'view' && bilan) {
          this.selectedBilan = bilan;
          this.newBilan = { ...bilan };
        } else {
          this.selectedBilan = null;
          this.newBilan = this.getInitialBilan();
        }
    
        this.showBilanModal = !this.showBilanModal;
      }
    
      validateBilan(): boolean {
        this.BilanValidationErrors = {};
        if (!this.newBilan.type) {
          this.BilanValidationErrors['type'] = 'Le type est requis';
          return false;
        }
        return true;
      }
      
      addBilan(): void {
        if (!this.validateBilan()) {
          return;
        }
    
        const newId = this.getNextBilanId(this.newBilan.type as 'bio' | 'radio');
        const bilan = this.createNewBilan(
          this.newBilan.type as 'bio' | 'radio',
          { ...this.newBilan, id: newId }
        );
        
        this.combinedBilans.push(bilan);
        alert('Bilan ajouté avec succès');
        this.toggleBilanModal();
      }
    
      // Utility methods
      getBilanTypeStyle(type: 'radio' | 'bio'): { color: string; backgroundColor: string } {
        return type === 'bio' 
          ? { color: '#FF34A0', backgroundColor: '#FF34A033' }
          : { color: '#0CF045', backgroundColor: '#0CF04533' };
      }
    
      getBilanDisplayType(bilan: CombinedBilan): string {
        return bilan.type === 'bio' ? 'Biologique' : 'Radiologique';
      }
    
      getOrdonnances(consultationId: number): Ordonnance[] {
        return this.Ordonnances.filter(ord => ord.consultation === consultationId);
      }
    
      getBilan(consultationId: number): CombinedBilan[] {
        return this.combinedBilans.filter(bilan => bilan.Consultation === consultationId);
      }
    
      canEditConsultation(): boolean {
        return this.user1?.Admin || this.user1?.profession === 'médecin';
      }
    
      canEditOrdonnance(): boolean {
        return this.user1?.Admin || this.user1?.profession === 'pharmacien';
      }
    
      closeModifyModal(): void {
        this.showModifyModal = false;
        this.selectedMedecin = null;
      }
    
      closeResumeModal(): void {
        this.showResumeModal = false;
        this.editedResume = '';
      }
    
      selectMenu(menuNumber: number): void {
        this.selectedMenu = menuNumber;
      }
    
      toggleModal(): void {
        this.showModal = !this.showModal;
      }
    
      private getNextBilanId(type: 'bio' | 'radio'): number {
        const existingIds = this.combinedBilans
          .filter(bilan => bilan.type === type)
          .map(bilan => bilan.id);
        
        return Math.max(0, ...existingIds) + 1;
      }
    
      private getNextOrdonnanceId(): number {
        const existingIds = this.Ordonnances.map(ord => ord.id);
        return Math.max(0, ...existingIds) + 1;
      }
    
      @HostListener('document:click', ['$event'])
      onDocumentClick(event: MouseEvent): void {
        const target = event.target as HTMLElement;
        const dropdown = document.querySelector('.medecin-dropdown');
        if (dropdown && !dropdown.contains(target)) {
          this.showMedecinDropdown = false;
        }
      }
    
      ngOnInit(): void {
        const radioBilans: CombinedBilan[] = this.staticRadioBilans.map(bilan => ({
          ...bilan,
          type: 'radio' as const,
          date_fin: bilan.date_fin || '' // Ensure date_fin is always a string
        }));
      
        const bioBilans: CombinedBilan[] = this.staticBioBilans.map(bilan => ({
          ...bilan,
          type: 'bio' as const,
          date_fin: bilan.date_fin || '' // Ensure date_fin is always a string
        }));
      
        this.combinedBilans = [...radioBilans, ...bioBilans];
      }
    }
import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import axios from 'axios';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-consultation-info',
  standalone: true,
  templateUrl: './consultation-info.component.html',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./consultation-info.component.css'],
})
export class ConsultationInfoComponent implements OnInit {
  consultation: any = {};
  Ordonnances: any[] = [];
  combinedBilans: any[] = [];
  medecins: string[] = [];
  pharmaciens: string[] = [];

  // States
  showModifyModal = false;
  showResumeModal = false;
  showOrdonnanceModal = false;
  showBilanModal = false;
  selectedMenu = 1;
  showMedecinDropdown = false;

  // Fields for modals
  selectedMedecin: string | null = null;
  selectedDate: string | undefined;
  editedResume = '';
  newOrdonnance: any = {};
  newBilan: any = {};
  consultationId!: number;
  // Validation errors
  BilanValidationErrors: Record<string, string> = {};
  OrdonnanceValidationErrors: Record<string, string> = {};
  addOrdonnanceModalMode: 'add' | 'view' = 'add';
  addBilanModalMode: 'add' | 'view' = 'add';
  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.consultationId = parseInt(params['id']);
      // Use the ID to fetch data or whatever you need
    });
    this.loadConsultation(this.consultationId);
  }

  async loadConsultation(id: number): Promise<void> {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/consultation/${id}`
      );
      this.consultation = response.data;
      this.Ordonnances = response.data.ordonnances || [];
      this.combinedBilans = [
        ...response.data.bilans_bio,
        ...response.data.bilans_radio,
      ];
    } catch (error) {
      console.error('Error loading consultation:', error);
    }
  }

  async saveModifications(): Promise<void> {
    try {
      const data = {
        consultation_id: this.consultation.id,
        date: this.selectedDate,
        medecin_id: this.selectedMedecin,
      };
      await axios.post(
        `http://127.0.0.1:8000/api/consultation/modifier/`,
        data
      );
      alert('Consultation modifiée avec succès');
      this.showModifyModal = false;
      this.loadConsultation(this.consultation.id);
    } catch (error) {
      console.error('Error modifying consultation:', error);
    }
  }

  async saveResume(): Promise<void> {
    try {
      const data = {
        consultation_id: this.consultation.id,
        resume: this.editedResume,
      };
      await axios.post(
        `http://127.0.0.1:8000/api/consultation/modifier/resume/`,
        data
      );
      alert('Résumé modifié avec succès');
      this.showResumeModal = false;
      this.consultation.resume = this.editedResume;
    } catch (error) {
      console.error('Erreur lors de la modification du résumé:', error);
    }
  }

  async addOrdonnance(): Promise<void> {
    try {
      const data = {
        consultation_id: this.consultation.id,
        ...this.newOrdonnance,
      };
      const response = await axios.post(
        `http://127.0.0.1:8000/api/consultation/ajouter/ordonnance/`,
        data
      );
      this.Ordonnances.push(response.data);
      alert('Ordonnance ajoutée avec succès');
      this.showOrdonnanceModal = false;
    } catch (error) {
      console.error('Erreur lors de l’ajout d’une ordonnance:', error);
    }
  }

  async addBilan(): Promise<void> {
    try {
      const data = {
        consultation_id: this.consultation.id,
        ...this.newBilan,
      };
      const response = await axios.post(
        `http://127.0.0.1:8000/api/consultation/ajouter/bilan/`,
        data
      );
      this.combinedBilans.push(response.data);
      alert('Bilan ajouté avec succès');
      this.showBilanModal = false;
    } catch (error) {
      console.error('Erreur lors de l’ajout d’un bilan:', error);
    }
  }

  // Utility methods
  getBilanTypeStyle(type: 'radio' | 'bio'): {
    color: string;
    backgroundColor: string;
  } {
    return type === 'bio'
      ? { color: '#FF34A0', backgroundColor: '#FF34A033' }
      : { color: '#0CF045', backgroundColor: '#0CF04533' };
  }

  getBilanDisplayType(bilan: any): string {
    return bilan.type === 'bio' ? 'Biologique' : 'Radiologique';
  }

  selectMenu(menuNumber: number): void {
    this.selectedMenu = menuNumber;
  }

  toggleOrdonnanceModal(mode: 'add' | 'view' = 'add', ordonnance?: any): void {
    this.addOrdonnanceModalMode = mode;
    this.OrdonnanceValidationErrors = {};

    if (mode === 'view' && ordonnance) {
      this.newOrdonnance = { ...ordonnance };
    } else {
      this.newOrdonnance = {};
    }

    this.showOrdonnanceModal = !this.showOrdonnanceModal;
  }

  toggleBilanModal(mode: 'add' | 'view' = 'add', bilan?: any): void {
    this.addBilanModalMode = mode;
    this.BilanValidationErrors = {};

    if (mode === 'view' && bilan) {
      this.newBilan = { ...bilan };
    } else {
      this.newBilan = {};
    }

    this.showBilanModal = !this.showBilanModal;
  }

  canEditConsultation(): boolean {
    return true; // Replace with actual logic
  }

  modifyConsultation(): void {
    this.selectedDate = this.consultation.date.slice(0, 16);
    this.showModifyModal = true;
  }

  deleteConsultation(): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette Consultation ?')) {
      // TODO: Implement actual deletion logic
      alert('Consultation supprimée avec succès');
    }
  }

  closeModifyModal(): void {
    this.showModifyModal = false;
    this.selectedMedecin = null;
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

  modifyResume(): void {
    this.editedResume = this.consultation.resume;
    this.showResumeModal = true;
  }

  deleteResume(): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce résumé ?')) {
      this.consultation.resume = '';
      alert('Résumé supprimé avec succès');
    }
  }

  canEditOrdonnance(): boolean {
    return true; // Replace with actual logic
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const dropdown = document.querySelector('.medecin-dropdown');
    if (dropdown && !dropdown.contains(target)) {
      this.showMedecinDropdown = false;
    }
  }
}

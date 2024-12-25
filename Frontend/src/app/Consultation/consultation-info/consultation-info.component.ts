import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Ordonnance } from '../../../types/ordonance';
import { BilanRadio } from '../../../types/bilanRadio';
import { BilanBio } from '../../../types/bilanbio';

interface BaseBilan {
  id: string;
  date_debut: string;
  date_fin: string;
  est_complet: boolean;
  est_resultat: boolean;
  medecin: string;
  Consultation: string | null;
}

type TypeRadio = 'RADIO' | 'SCANNER' | 'IRM';

type CombinedBilan = 
  | (BaseBilan & {
      type: 'radio';
      type_radio: TypeRadio;
      description: string;
      resultat_id: string;
    })
  | (BaseBilan & {
      type: 'bio';
      parametres: string;
    });

@Component({
  selector: 'app-consultation-info',
  templateUrl: './consultation-info.component.html',
  imports: [CommonModule, FormsModule],
  styleUrl: './consultation-info.component.css'
})
export class ConsultationInfoComponent {
  // Base properties
  consultation = {
    id: "1",
    resume: "Patient presented with mild symptoms of fever and headache.",
    date: "2024-12-24T10:30:00Z",
    Ordonnance: "H12345",
    Medecin: "Mohamed Reda"
  };

  medecins = ["Amine Bensalem", "Leila Hamdi", "Yacine Belkacem", "Souad Khelifi", "Mohamed Reda"];
  pharmaciens = ["Amine Bensalem", "Leila Hamdi", "Yacine Belkacem", "Souad Khelifi", "Mohamed Reda"];
  sontValides = ["Validé", "Non validé"];

  user1 = {
    Admin: true,
    name: "Mohamed Reda",
    id: 'USER-051',
    profession: 'infermier'
  };

  // UI control properties
  showModifyModal = false;
  showMedecinDropdown = false;
  selectedMedecin: string | null = null;
  selectedDate: string | undefined;
  showModal = false;
  selectedMenu = 1;
  editedResume = '';
  showResumeModal = false;

  // Consultation modification methods
  deleteConsultation() {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette Consultation ?')) {
      alert('Consultation supprimée avec succès');
    }
  }

  modifyConsultation() {
    this.selectedDate = this.consultation.date.slice(0, 16);
    this.showModifyModal = true;
  }

  toggleMedecinDropdown(event?: MouseEvent) {
    if (event) {
      event.stopPropagation();
    }
    this.showMedecinDropdown = !this.showMedecinDropdown;
  }

  selectMedecin(medecin: string) {
    this.selectedMedecin = medecin;
    this.showMedecinDropdown = false;
  }

  saveModifications() {
    if (!this.selectedMedecin) {
      alert('Veuillez sélectionner un médecin');
      return;
    }

    if (!this.selectedDate) {
      alert('Veuillez sélectionner une date');
      return;
    }

    this.consultation.Medecin = this.selectedMedecin;
    this.consultation.date = new Date(this.selectedDate).toISOString();
    
    alert('Consultation modifiée avec succès');
    this.showModifyModal = false;
    this.selectedMedecin = null;
  }

  // Resume methods
  modifyResume() {
    this.editedResume = this.consultation.resume;
    this.showResumeModal = true;
  }

  saveResume() {
    if (this.editedResume.trim()) {
      this.consultation.resume = this.editedResume;
      alert('Résumé modifié avec succès');
    } else {
      alert('Le résumé ne peut pas être vide');
      return;
    }
    this.showResumeModal = false;
  }

  deleteResume() {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce résumé ?')) {
      this.consultation.resume = '';
      alert('Résumé supprimé avec succès');
    }
  }

  // Ordonnance properties and methods
  showOrdonnanceModal = false;
  addOrdonnanceModalMode: 'add' | 'view' = 'add';
  selectedOrdonnance: Ordonnance | null = null;
  OrdonnanceValidationErrors: { date?: string; pharmacien_id?: string; } = {};

  Ordonnances: Ordonnance[] = [
    {
      id: '1',
      date: '2024-12-24T10:30:00Z',
      estValide: true,
      consultation: '1',
      pharmacien_id: 'Amine Bensalem'
    },
    {
      id: '2',
      date: '2024-12-24T11:30:00Z',
      estValide: false,
      consultation: '1',
      pharmacien_id: 'Leila Hamdi'
    }
  ];

  newOrdonnance: Partial<Ordonnance> = {
    id: '',
    date: '',
    estValide: false,
    consultation: '',
    pharmacien_id: ''
  };

  toggleOrdonnanceModal(mode: 'add' | 'view' = 'add', ordonnance?: Ordonnance) {
    if (!this.showOrdonnanceModal) {
      this.addOrdonnanceModalMode = mode;
      this.OrdonnanceValidationErrors = {
        date: '',
        pharmacien_id: ''
      };

      if (mode === 'view' && ordonnance) {
        this.selectedOrdonnance = ordonnance;
        this.newOrdonnance = { ...ordonnance };
      } else {
        this.selectedOrdonnance = null;
        this.newOrdonnance = {
          id: '',
          date: '',
          estValide: false,
          consultation: this.consultation?.id || '',
          pharmacien_id: ''
        };
      }
    } else {
      this.selectedOrdonnance = null;
      this.newOrdonnance = {
        id: '',
        date: '',
        estValide: false,
        consultation: '',
        pharmacien_id: ''
      };
    }
    this.showOrdonnanceModal = !this.showOrdonnanceModal;
  }

  validateOrdonnance(): boolean {
    this.OrdonnanceValidationErrors = {
      date: '',
      pharmacien_id: ''
    };
    let isValid = true;

    if (!this.newOrdonnance.pharmacien_id?.trim()) {
      this.OrdonnanceValidationErrors['pharmacien_id'] = 'Le pharmacien est requis';
      isValid = false;
    }

    if (!this.newOrdonnance.date) {
      this.OrdonnanceValidationErrors['date'] = 'La date est requise';
      isValid = false;
    }

    return isValid;
  }

  addOrdonnance() {
    if (this.validateOrdonnance()) {
      const newId = (this.Ordonnances.length + 1).toString();
      const ordonnance: Ordonnance = {
        id: newId,
        date: this.newOrdonnance.date!,
        estValide: this.newOrdonnance.estValide || false,
        consultation: this.consultation.id,
        pharmacien_id: this.newOrdonnance.pharmacien_id!
      };

      this.Ordonnances.push(ordonnance);
      alert('Ordonnance ajoutée avec succès');
      this.toggleOrdonnanceModal();
    }
  }

  getOrdonnances(consultationId: string) {
    return this.Ordonnances.filter(ord => ord.consultation === consultationId);
  }

  // Bilan properties and methods
  private staticRadioBilans: BilanRadio[] = [
    {
      id: 'RAD001',
      date_debut: '2024-01-15',
      date_fin: '2024-01-16',
      type_radio: 'IRM',
      est_complet: true,
      est_resultat: true,
      description: 'IRM cérébrale standard',
      medecin: 'Dr. Amine Bensalem',
      Consultation: 'CONS001',
      resultat_id: 'RES001'
    },
    {
      id: 'RAD002',
      date_debut: '2024-02-01',
      date_fin: '2024-02-01',
      type_radio: 'SCANNER',
      est_complet: false,
      est_resultat: false,
      description: 'Scanner thoracique',
      medecin: 'Dr. Leila Hamdi',
      Consultation: 'CONS002',
      resultat_id: 'RES002'
    }
  ];

  private staticBioBilans: BilanBio[] = [
    {
      id: 'BIO001',
      date_debut: '2024-01-20',
      date_fin: '2024-01-21',
      est_complet: true,
      est_resultat: true,
      parametres: 'Glycémie, HbA1c, Créatinine',
      medecin: 'Dr. Souad Khelifi',
      Consultation: 'CONS004'
    },
    {
      id: 'BIO002',
      date_debut: '2024-02-15',
      date_fin: '2024-02-16',
      est_complet: false,
      est_resultat: true,
      parametres: 'NFS, Plaquettes, VS',
      medecin: 'Dr. Mohamed Reda',
      Consultation: 'CONS005'
    }
  ];

  combinedBilans: CombinedBilan[] = [];
  showBilanModal = false;
  addBilanModalMode: 'add' | 'view' = 'add';
  selectedBilan: CombinedBilan | null = null;
  BilanValidationErrors: { type?: string } = {};

  newBilan: Partial<CombinedBilan> = {
    id: '',
    date_debut: '',
    date_fin: '',
    est_complet: false,
    est_resultat: false,
    medecin: '',
    Consultation: ''
  };

  private createNewBilanRadio(data: Partial<CombinedBilan>): CombinedBilan {
    return {
      id: data.id || '',
      date_debut: data.date_debut || '',
      date_fin: data.date_fin || '',
      est_complet: data.est_complet || false,
      est_resultat: data.est_resultat || false,
      medecin: data.medecin || '',
      Consultation: data.Consultation || null,
      type: 'radio',
      type_radio: 'RADIO',
      description: '',
      resultat_id: ''
    };
  }

  private createNewBilanBio(data: Partial<CombinedBilan>): CombinedBilan {
    return {
      id: data.id || '',
      date_debut: data.date_debut || '',
      date_fin: data.date_fin || '',
      est_complet: data.est_complet || false,
      est_resultat: data.est_resultat || false,
      medecin: data.medecin || '',
      Consultation: data.Consultation || null,
      type: 'bio',
      parametres: ''
    };
  }

  addBilan() {
    if (this.validateBilan()) {
      const newId = this.getNextBilanId(this.newBilan.type as 'bio' | 'radio');
      const bilan = this.newBilan.type === 'bio' 
        ? { ...this.createNewBilanBio(this.newBilan), id: newId }
        : { ...this.createNewBilanRadio(this.newBilan), id: newId };
      
      this.combinedBilans.push(bilan);
      alert('Bilan ajouté avec succès');
      this.toggleBilanModal();
    }
  }

  validateBilan(): boolean {
    this.BilanValidationErrors = { type: '' };
    if (!this.newBilan.type) {
      this.BilanValidationErrors.type = 'Le type est requis';
      return false;
    }
    return true;
  }

  toggleBilanModal(mode: 'add' | 'view' = 'add', bilan?: CombinedBilan) {
    if (!this.showBilanModal) {
      this.addBilanModalMode = mode;
      this.BilanValidationErrors = { type: '' };
      
      if (mode === 'view' && bilan) {
        this.selectedBilan = bilan;
        this.newBilan = { ...bilan };
      } else {
        this.selectedBilan = null;
        this.newBilan = {
          id: '',
          date_debut: '',
          date_fin: '',
          est_complet: false,
          est_resultat: false,
          medecin: '',
          Consultation: ''
        };
      }
    } else {
      this.selectedBilan = null;
      this.newBilan = {
        id: '',
        date_debut: '',
        date_fin: '',
        est_complet: false,
        est_resultat: false,
        medecin: '',
        Consultation: ''
      };
    }
    this.showBilanModal = !this.showBilanModal;
  }

  // Utility methods
  getBilanTypeStyle(type: 'radio' | 'bio') {
    return type === 'bio' 
      ? { color: '#FF34A0', backgroundColor: '#FF34A033' }
      : { color: '#0CF045', backgroundColor: '#0CF04533' };
  }

  getBilanDisplayType(bilan: CombinedBilan): string {
    return bilan.type === 'bio' ? 'Biologique' : 'Radiologique';
  }

  getBilan(consultationId: string) {
    return this.combinedBilans.filter(bilan => bilan.Consultation === consultationId);
  }

  canEditConsultation(): boolean {
    return this.user1?.Admin || this.user1?.profession === 'médecin';
  }

  canEditOrdonnance(): boolean {
    return this.user1?.Admin || this.user1?.profession === 'pharmacien';
  }

  closeModifyModal() {
    this.showModifyModal = false;
    this.selectedMedecin = null;
  }

  closeResumeModal() {
    this.showResumeModal = false;
    this.editedResume = '';
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const dropdown = document.querySelector('.medecin-dropdown');
    if (dropdown && !dropdown.contains(target)) {
      this.showMedecinDropdown = false;
    }
  }

  // Fixed selectMenu method
  selectMenu(menuNumber: number): void {
    this.selectedMenu = menuNumber;
  }

  // Fixed toggleModal method
  toggleModal(): void {
    this.showModal = !this.showModal;
  }
  ngOnInit() {
    this.combinedBilans = [
      ...this.staticRadioBilans.map(bilan => ({
        ...bilan,
        type: 'radio' as const
      })),
      ...this.staticBioBilans.map(bilan => ({
        ...bilan,
        type: 'bio' as const  
      }))
    ];
  }
 
  private getNextBilanId(type: 'bio' | 'radio'): string {
    const prefix = type === 'bio' ? 'BIO' : 'RAD';
    const existingIds = this.combinedBilans
      .filter(bilan => bilan.type === type)
      .map(bilan => parseInt(bilan.id.replace(prefix, ''), 10));
    
    const maxId = Math.max(0, ...existingIds);
    const nextNumber = (maxId + 1).toString().padStart(3, '0');
    return `${prefix}${nextNumber}`;
  }
}
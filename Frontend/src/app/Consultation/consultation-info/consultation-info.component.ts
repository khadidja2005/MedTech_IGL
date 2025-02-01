import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import axios from 'axios';
import { ActivatedRoute, Router } from '@angular/router';
interface response {
  medecin: string;
  resume: string;
  date: string;
  ordonnances: any[];
  bilans_bio: any[];
  bilans_radio: any[];
}
interface medecin {
  id: number;
  nom_complet: string;
}
interface medecinres {
  medecins: medecin[];
}
interface ordres {
  message: string;
  ordonnance: any;
}
interface resBilan {
  message: string;
  bilan: any;
}
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
  medecins: medecin[] = [];
  // States
  showModifyModal = false;
  showResumeModal = false;
  showOrdonnanceModal = false;
  showBilanModal = false;
  selectedMenu = 1;
  showMedecinDropdown = false;

  // Fields for modals
  selectedMedecin: medecin | null = null;
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
  constructor(private route: ActivatedRoute, private routenon: Router) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.consultationId = parseInt(params['id']);
      // Use the ID to fetch data or whatever you need
    });
    this.loadConsultation(this.consultationId);
  }

  async loadConsultation(id: number): Promise<void> {
    try {
      await axios
        .get<response>(`http://localhost:8000/consultation/`, {
          params: {
            consultation_id: id,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.consultation.medecin = response.data.medecin;
          this.consultation.resume = response.data.resume;
          this.consultation.date = response.data.date;
          this.consultation.id = id;
          this.Ordonnances = response.data.ordonnances;
          this.combinedBilans = response.data.bilans_bio;
          this.combinedBilans.push(...response.data.bilans_radio);
        });
    } catch (error) {
      console.error('Error loading consultation:', error);
    }
    try {
      await axios
        .get<medecinres>(`http://localhost:8000/consultation/medecins/`, {
          params: {
            consultation_id: id,
          },
        })
        .then((response) => {
          this.medecins = response.data.medecins;
        });
    } catch (error) {
      console.error('Error loading medecins:', error);
    }
  }

  async saveModifications(): Promise<void> {
    try {
      const data = {
        consultation_id: this.consultation.id,
        date: this.selectedDate
          ? new Date(this.selectedDate).toISOString().split('T')[0]
          : '',
        medecin_id: this.selectedMedecin?.id,
      };
      await axios.post(`http://127.0.0.1:8000/consultation/modifier/`, data);
      alert('Consultation modifiée avec succès');
      this.showModifyModal = false;
      this.loadConsultation(this.consultation.id);
    } catch (error) {
      console.error('Error modifying consultation:', error);
    }
  }

  async saveResume(): Promise<void> {
    let data: any;
    try {
      if (!this.editedResume) {
        data = {
          consultation_id: this.consultation.id,
          resume: 'vide',
        };
      } else {
        data = {
          consultation_id: this.consultation.id,
          resume: this.editedResume,
        };
      }
      await axios.post(
        `http://127.0.0.1:8000/consultation/modifier/resume/`,
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
      await axios
        .post<ordres>(
          `http://127.0.0.1:8000/consultation/ajouter/ordonnance/`,
          {
            consultation_id: this.consultation.id,
          }
        )
        .then((response) => {
          this.Ordonnances.push(response.data.ordonnance);
          console.log(this.Ordonnances);
          alert('Ordonnance ajoutée avec succès');
        });
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
      await axios
        .post<resBilan>(
          `http://127.0.0.1:8000/consultation/ajouter/bilan/`,
          data
        )
        .then((response) => {
          console.log(response.data);
          const bilan = {
            id: response.data.bilan,
            type: this.newBilan.type,
            etat: 'non finis',
          };
          this.combinedBilans.push(bilan);
          console.log(this.combinedBilans);
        });
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
    return bilan.type === 'bio' ? 'bio' : 'radio';
  }

  selectMenu(menuNumber: number): void {
    this.selectedMenu = menuNumber;
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
    return (
      this.consultation.medecin_id ==
      parseInt(localStorage.getItem('id') || '0')
    );
  }

  modifyConsultation(): void {
    this.selectedDate = this.consultation.date.slice(0, 16);
    this.showModifyModal = true;
  }

  deleteConsultation(): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette Consultation ?')) {
      axios
        .delete('http://localhost:8000/consultation/supprimer/', {
          params: { consultation_id: this.consultation.id },
        })
        .then((response) => {
          console.log(response.data);
        });
      alert('Consultation supprimée avec succès');
      this.routenon.navigate(['/recherche']);
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

  selectMedecin(medecin: medecin): void {
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

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const dropdown = document.querySelector('.medecin-dropdown');
    if (dropdown && !dropdown.contains(target)) {
      this.showMedecinDropdown = false;
    }
  }
  consulterBilan(bilan: any): void {
    if (bilan.type === 'bio') {
      this.routenon.navigate([`bilan-bio/${bilan.id}`]);
    } else {
      this.routenon.navigate([`bilan-radio/${bilan.id}`]);
    }
  }
  consulterOrdonnance(ordonnance: any): void {
    this.routenon.navigate([`ordannace/${ordonnance.ordonnance_id}`]);
  }
}

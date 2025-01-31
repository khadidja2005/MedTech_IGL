import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import axios from 'axios';
<<<<<<< HEAD

// Fake data pour le fallback
const FAKE_CONSULTATION = {
  id: 1,
  date: '2025-01-30T10:00:00',
  resume: 'Consultation de routine. Le patient présente des symptômes de grippe légère.',
  Medecin: 'Dr. Jean Dupont',
  ordonnances: [
    { id: 1, estValide: true, pharmacien_id: 'Dr. Marie Lambert' },
    { id: 2, estValide: false, pharmacien_id: 'Dr. Pierre Martin' }
  ],
  bilans_bio: [
    { id: 1, type: 'bio', est_resultat: true, est_complet: true },
    { id: 2, type: 'bio', est_resultat: false, est_complet: false }
  ],
  bilans_radio: [
    { id: 3, type: 'radio', est_resultat: true, est_complet: true },
    { id: 4, type: 'radio', est_resultat: false, est_complet: false }
  ]
};

const FAKE_MEDECINS = [
  'Dr. Jean Dupont',
  'Dr. Marie Lambert',
  'Dr. Pierre Martin',
  'Dr. Sophie Bernard'
];

const FAKE_PHARMACIENS = [
  {
    id: 1,
    nom_complet: 'Dr. Marie Lambert',
    etablissements: ['Hôpital Central', 'Clinique du Parc']
  },
  {
    id: 2,
    nom_complet: 'Dr. Pierre Martin',
    etablissements: ['Hôpital Central']
  }
];

const API_URL = 'http://127.0.0.1:8000/api';

=======
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
>>>>>>> ddf3e5d80710324dead3ffbada0b256c53cfd361
@Component({
  selector: 'app-consultation-info',
  standalone: true,
  templateUrl: './consultation-info.component.html',
<<<<<<< HEAD
  imports: [CommonModule, FormsModule]
=======
  imports: [CommonModule, FormsModule],
  styleUrls: ['./consultation-info.component.css'],
>>>>>>> ddf3e5d80710324dead3ffbada0b256c53cfd361
})
export class ConsultationInfoComponent implements OnInit {
  consultation: any = {};
  Ordonnances: any[] = [];
  combinedBilans: any[] = [];
<<<<<<< HEAD
  medecins: string[] = [];
  pharmaciens: any[] = [];
  selectedPharmacien: number | null = null;
  showPharmacienDropdown = false;
  isUsingFakeData = false;

=======
  medecins: medecin[] = [];
>>>>>>> ddf3e5d80710324dead3ffbada0b256c53cfd361
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
<<<<<<< HEAD
    this.loadData();
  }

  async loadData(): Promise<void> {
    try {
      await this.loadConsultation(1);
      await this.loadMedecins();
      await this.loadPharmaciens();
    } catch (error) {
      console.warn('Erreur lors du chargement des données API, utilisation des données fictives', error);
      this.loadFakeData();
    }
=======
    this.route.params.subscribe((params) => {
      this.consultationId = parseInt(params['id']);
      // Use the ID to fetch data or whatever you need
    });
    this.loadConsultation(this.consultationId);
>>>>>>> ddf3e5d80710324dead3ffbada0b256c53cfd361
  }

  async loadConsultation(id: number): Promise<void> {
    try {
<<<<<<< HEAD
      const response = await axios.get(`${API_URL}/consultation/${id}/`);
      this.consultation = response.data;
      this.Ordonnances = response.data.ordonnances || [];
      this.combinedBilans = [...response.data.bilans_bio, ...response.data.bilans_radio];
=======
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
>>>>>>> ddf3e5d80710324dead3ffbada0b256c53cfd361
    } catch (error) {
      if (!this.isUsingFakeData) {
        throw error;
      }
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

  async loadMedecins(): Promise<void> {
    try {
      const response = await axios.get(`${API_URL}/consultation/medecins/`, {
        params: { consultation_id: this.consultation.id }
      });
      this.medecins = response.data.medecins.map((m: any) => m.nom_complet);
    } catch (error) {
      if (!this.isUsingFakeData) {
        throw error;
      }
    }
  }

  async loadPharmaciens(): Promise<void> {
    try {
      const response = await axios.get(`${API_URL}/pharmacie/pharmaciens/`);
      this.pharmaciens = response.data.pharmaciens;
    } catch (error) {
      if (!this.isUsingFakeData) {
        throw error;
      }
    }
  }

  loadFakeData(): void {
    this.isUsingFakeData = true;
    this.consultation = FAKE_CONSULTATION;
    this.Ordonnances = FAKE_CONSULTATION.ordonnances;
    this.combinedBilans = [...FAKE_CONSULTATION.bilans_bio, ...FAKE_CONSULTATION.bilans_radio];
    this.medecins = FAKE_MEDECINS;
    this.pharmaciens = FAKE_PHARMACIENS;
  }

  async saveModifications(): Promise<void> {
    try {
<<<<<<< HEAD
      if (!this.isUsingFakeData) {
        const data = {
          consultation_id: this.consultation.id,
          date: this.selectedDate,
          medecin_id: this.selectedMedecin
        };
        await axios.post(`${API_URL}/consultation/modifier/`, data);
        await this.loadConsultation(this.consultation.id);
      } else {
        this.consultation.date = this.selectedDate;
        this.consultation.Medecin = this.selectedMedecin;
      }
=======
      const data = {
        consultation_id: this.consultation.id,
        date: this.selectedDate
          ? new Date(this.selectedDate).toISOString().split('T')[0]
          : '',
        medecin_id: this.selectedMedecin?.id,
      };
      await axios.post(`http://127.0.0.1:8000/consultation/modifier/`, data);
>>>>>>> ddf3e5d80710324dead3ffbada0b256c53cfd361
      alert('Consultation modifiée avec succès');
      this.showModifyModal = false;
    } catch (error) {
      console.error('Erreur lors de la modification:', error);
      if (!this.isUsingFakeData) {
        this.loadFakeData();
      }
    }
  }

  async saveResume(): Promise<void> {
    let data: any;
    try {
<<<<<<< HEAD
      if (!this.isUsingFakeData) {
        const data = {
          consultation_id: this.consultation.id,
          resume: this.editedResume
        };
        await axios.post(`${API_URL}/consultation/modifier/resume/`, data);
        await this.loadConsultation(this.consultation.id);
      } else {
        this.consultation.resume = this.editedResume;
      }
=======
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
>>>>>>> ddf3e5d80710324dead3ffbada0b256c53cfd361
      alert('Résumé modifié avec succès');
      this.showResumeModal = false;
    } catch (error) {
      console.error('Erreur lors de la modification du résumé:', error);
      if (!this.isUsingFakeData) {
        this.loadFakeData();
      }
    }
  }

  async addOrdonnance(): Promise<void> {
    if (!this.selectedPharmacien) {
      this.OrdonnanceValidationErrors['pharmacien'] = 'Veuillez sélectionner un pharmacien';
      return;
    }

    try {
<<<<<<< HEAD
      if (!this.isUsingFakeData) {
        const data = {
          consultation_id: this.consultation.id,
          pharmacien_id: this.selectedPharmacien
        };
        const response = await axios.post(`${API_URL}/consultation/ajouter/ordonnance/`, data);
        this.Ordonnances.push(response.data);
      } else {
        const newOrd = {
          id: this.Ordonnances.length + 1,
          estValide: false,
          pharmacien_id: this.pharmaciens.find(p => p.id === this.selectedPharmacien)?.nom_complet
        };
        this.Ordonnances.push(newOrd);
      }
      alert('Ordonnance ajoutée avec succès');
      this.showOrdonnanceModal = false;
      this.selectedPharmacien = null;
=======
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
>>>>>>> ddf3e5d80710324dead3ffbada0b256c53cfd361
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'ordonnance:', error);
      if (!this.isUsingFakeData) {
        this.loadFakeData();
      }
    }
  }

  async addBilan(): Promise<void> {
    try {
<<<<<<< HEAD
      if (!this.isUsingFakeData) {
        const data = {
          consultation_id: this.consultation.id,
          type: this.newBilan.type === 'bio' ? 'Biologique' : 'Radiologique'
        };
        const response = await axios.post(`${API_URL}/consultation/ajouter/bilan/`, data);
        this.combinedBilans.push(response.data);
      } else {
        const newBilan = {
          id: this.combinedBilans.length + 1,
          type: this.newBilan.type,
          est_resultat: false,
          est_complet: false
        };
        this.combinedBilans.push(newBilan);
      }
=======
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
>>>>>>> ddf3e5d80710324dead3ffbada0b256c53cfd361
      alert('Bilan ajouté avec succès');
      this.showBilanModal = false;
    } catch (error) {
      console.error('Erreur lors de l\'ajout du bilan:', error);
      if (!this.isUsingFakeData) {
        this.loadFakeData();
      }
    }
  }

<<<<<<< HEAD
  // Méthodes utilitaires qui restent inchangées
  getBilanTypeStyle(type: 'radio' | 'bio'): { color: string; backgroundColor: string } {
    return type === 'bio' 
=======
  // Utility methods
  getBilanTypeStyle(type: 'radio' | 'bio'): {
    color: string;
    backgroundColor: string;
  } {
    return type === 'bio'
>>>>>>> ddf3e5d80710324dead3ffbada0b256c53cfd361
      ? { color: '#FF34A0', backgroundColor: '#FF34A033' }
      : { color: '#0CF045', backgroundColor: '#0CF04533' };
  }

  getBilanDisplayType(bilan: any): string {
    return bilan.type === 'bio' ? 'bio' : 'radio';
  }

  selectMenu(menuNumber: number): void {
    this.selectedMenu = menuNumber;
  }

<<<<<<< HEAD
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

=======
>>>>>>> ddf3e5d80710324dead3ffbada0b256c53cfd361
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
<<<<<<< HEAD
    return true;
  }

  canEditOrdonnance(): boolean {
    return true;
=======
    return (
      this.consultation.medecin_id ==
      parseInt(localStorage.getItem('id') || '0')
    );
>>>>>>> ddf3e5d80710324dead3ffbada0b256c53cfd361
  }

  modifyConsultation(): void {
    this.selectedDate = this.consultation.date.slice(0, 16);
    this.showModifyModal = true;
  }

  async deleteConsultation(): Promise<void> {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette Consultation ?')) {
<<<<<<< HEAD
      try {
        if (!this.isUsingFakeData) {
          await axios.delete(`${API_URL}/consultation/supprimer/`, {
            data: { consultation_id: this.consultation.id }
          });
        }
        alert('Consultation supprimée avec succès');
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        if (!this.isUsingFakeData) {
          this.loadFakeData();
        }
      }
=======
      axios
        .delete('http://localhost:8000/consultation/supprimer/', {
          params: { consultation_id: this.consultation.id },
        })
        .then((response) => {
          console.log(response.data);
        });
      alert('Consultation supprimée avec succès');
      this.routenon.navigate(['/recherche']);
>>>>>>> ddf3e5d80710324dead3ffbada0b256c53cfd361
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
    const medecinDropdown = document.querySelector('.medecin-dropdown');
    const pharmacienDropdown = document.querySelector('.pharmacien-dropdown');
    
    if (medecinDropdown && !medecinDropdown.contains(target)) {
      this.showMedecinDropdown = false;
    }
    
    if (pharmacienDropdown && !pharmacienDropdown.contains(target)) {
      this.showPharmacienDropdown = false;
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

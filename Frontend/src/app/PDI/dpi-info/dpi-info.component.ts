import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import QRCode from 'qrcode';
import { DPI } from '../../../types/dpi';
import { Etablissement } from '../../../types/etablissement';
import { Patient } from '../../../types/patient';
import { Antecedent } from '../../../types/antecedent';
import { Hospitalisation } from '../../../types/hospitalisation';


export interface Mutuelle {
  id: number;
  patient_id: number; // Foreign key to Patient
  nom: string;
  numero_adherent: number;
  type_couverture: string;
  telephone: number;
  email: string;
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
  selector: 'app-dpi-info',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dpi-info.component.html',
  styleUrls: ['./dpi-info.component.css']
})
export class DpiInfoComponent implements OnInit {
  selectedMenu: number = 1;
  editingField: string | null = null;
  tempValue: string = '';
  showGenderDropdown: boolean = false;  // Add this line
  mutuelleModalMode: any;
  dpiService: any;

  // Function to change the selected menu
  selectMenu(menuNumber: number): void {
    this.selectedMenu = menuNumber;
  }
  
  showModal = false; // Controls modal visibility


  dpi: DPI = {
    id: 1,
    createur_id: 1,
    date_creation: '2024-12-21',
    patient: 'Sam Mahmoudi',
    etablissement_id: 1
  };


  user1 = {
    Admin: true,
    name: 'Amina Benali',
    id: 1,
    profession: 'infermier' 
  };


  patient1: Patient = {
    id: 1,
    nss: '12345678901234',
    nom_complet: 'Sarah Benali',
    date_naissance: '1995-06-15',
    adresse: '45 Rue des Fleurs, Alger, Algeria',
    telephone: 213558123456,
    email: 'sarah.benali@example.com',
    password: 'securepassword123',
    lienPhoto: '',
    lieu_naissance: 'Oran, Algeria',
    genre: 'Femme',
    statueMatrimonial: 'Célibataire'
  };

   medecins :string[] = [
    "Amine Bensalem",
    "Leila Hamdi",
    "Yacine Belkacem",
    "Souad Khelifi",
    "Mohamed Reda",
    "Nadia Toumi",
    "Karim Moulay",
    "Sarah Meziane",
    "Fares Chebbi",
    "Salima Chabane"
];

  qrCodeDataUrl: string = '';
  showQrModal: boolean = false;
  showStatusDropdown: boolean = false;


  async ngOnInit() {
    await this.generateQRCode();
  }

  async generateQRCode() {
    const qrData = JSON.stringify({
      dpiId: this.dpi.id,
      createdBy: this.dpi.createur_id,
      establishment: this.dpi.etablissement_id,
      timestamp: new Date().toISOString()
    });

    try {
      this.qrCodeDataUrl = await QRCode.toDataURL(qrData, {
        width: 400,
        margin: 2,
        errorCorrectionLevel: 'M'
      });
    } catch (err) {
      console.error('Error generating QR code:', err);
    }
  }

  toggleQrModal() {
    this.showQrModal = !this.showQrModal;
  }



  canEditDPI(): boolean {
    return this.user1.Admin || this.user1.id === this.dpi.createur_id || this.user1.name === this.patient1.nom_complet;
  }


  // Status dropdown functionality
  toggleStatusDropdown() {
    this.showStatusDropdown = !this.showStatusDropdown;
  }

  getAvailableStatuses(): string[] {
    const allStatuts = ['Célibataire', 'Marié(e)', 'Divorcé(e)', 'Veuf/Veuve'];
    return allStatuts.filter(statut => statut !== this.patient1.statueMatrimonial);
  }

  updateStatus(newStatus: string) {
    this.patient1.statueMatrimonial = newStatus;
    this.showStatusDropdown = false;
  }

  // Add these new methods for gender dropdown
  toggleGenderDropdown() {
    this.showGenderDropdown = !this.showGenderDropdown;
  }

  getAvailableGenders(): string[] {
    const allGenders = ['Femme', 'Homme'];
    return allGenders.filter(gender => gender !== this.patient1.genre);
  }

  updateGender(newGender: string) {
    this.patient1.genre = newGender;
    this.showGenderDropdown = false;
  }

  errorMessage: string = ''; // Error message to show validation errors

  startEditing(field: string, currentValue: any) {
    this.editingField = field;
    this.tempValue = String(currentValue); // Ensure tempValue is always a string for editing
    this.errorMessage = ''; // Clear previous errors
  }

  saveEdit() {
    if (this.isFieldValid(this.editingField, this.tempValue)) {
      if (this.editingField) {
        if (this.editingField === 'telephone') {
          (this.patient1 as any)[this.editingField] = Number(this.tempValue); // Convert to number for telephone
        } else {
          (this.patient1 as any)[this.editingField] = this.tempValue;
        }
      }
      this.editingField = null;
      this.errorMessage = ''; // Clear any error messages
    } else {
      this.errorMessage = this.getErrorMessage(this.editingField);
    }
  }

  cancelEdit() {
    this.editingField = null;
    this.tempValue = '';
    this.errorMessage = ''; // Clear error messages on cancel
  }

  isFieldValid(field: string | null, value: string): boolean {
    if (!field) return false;

    switch (field) {
      case 'nom_complet':
        // Validate if both first and last names are provided
        const nameParts = value.trim().split(/\s+/);
        return nameParts.length >= 2 && nameParts.every(part => /^[a-zA-ZÀ-ſ\-]+$/.test(part));
      case 'email':
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value.trim());
      case 'date_naissance1':
        const today1 = new Date();
        const inputDate1 = new Date(value);
        return /^\d{4}-\d{2}-\d{2}$/.test(value.trim()) && !isNaN(inputDate1.getTime()) ;
        case 'date_naissance':
        const today = new Date();
        const inputDate = new Date(value);
        const minDate = new Date('1900-01-01');
        return inputDate <= today && inputDate >= minDate ;
      case 'lieu_naissance':
        return value.trim().length > 0;
      case 'adresse':
        return value.trim().length > 0;
      case 'telephone':
        return /^\d{10}$/.test(value.trim()); // Validate 10-digit number
      default:
        return false;
    }
  }

  getErrorMessage(field: string | null): string {
    switch (field) {
      case 'nom_complet':
        return 'Nom invalide. Veuillez entrer un nom valide.';
      case 'email':
        return 'Email invalide. Veuillez entrer un email valide.';
      case 'date_naissance1':
        return 'Date de naissance invalide. Utilisez le format AAAA-MM-JJ.';
        case 'date_naissance':
          return 'Date de naissance invalide';
      case 'lieu_naissance':
        return 'Lieu de naissance invalide. Ce champ ne peut pas être vide.';
      case 'adresse':
        return 'Adresse invalide. Ce champ ne peut pas être vide.';
      case 'telephone':
        return 'Téléphone invalide. Entrez un numéro de 10 chiffres.';
      default:
        return 'Valeur invalide.';
    }
  }

  antecedents: Antecedent [] = [
    {
      id: 1,
      type: 'Type 1',
      nom: 'Antécédent 1',
      description: 'Description 1',
      date_debut: '2023-01-01',
      date_fin: '2023-12-31',
      DPI_id: 1,
    },
    {
      id: 2,
      type: 'Type 2',
      nom: 'Antécédent 2',
      description: 'Description 2',
      date_debut: '2022-05-15',
      date_fin: '2022-10-20',
      DPI_id: 2,
    },
    {
      id: 3,
      type: 'Type 2',
      nom: 'Antécédent 3',
      description: 'Description 3',
      date_debut: '2020-02-25',
      date_fin: '2021-05-29',
      DPI_id: 3,
    },
  ];

  
  getTypeColor(type: string): string {
    const selectedType = this.BILAN_TYPES.find(t => t.value === type);
    return selectedType ? selectedType.color : '#000'; // Default to black if no type is selected
  }

  canEditAntecedant(): boolean {
    return this.user1.Admin || this.user1.profession === 'médecin';
  }

  
  newAntecedent: Partial<Antecedent> = {
    type: '',
    nom: '',
    description: '',
    date_debut: '',
    date_fin: '',
    DPI_id: this.dpi.id,
  };


 // Add to your component class
validationErrors: { [key: string]: string } = {
  nom: '',
  type: '',
  date_debut: '',
  date_fin: ''
};

addAntecedent() {
  // Reset validation errors
  this.validationErrors = {
    nom: '',
    type: '',
    date_debut: '',
    date_fin: ''
  };

    // Validate name (must contain only letters and spaces, at least 3 characters)
    if (!this.newAntecedent.nom) {
      this.validationErrors['nom'] = 'Le nom est requis.';
    } else if (!/^[a-zA-ZÀ-ÿ\s]{3,}$/.test(this.newAntecedent.nom)) {
      this.validationErrors['nom'] = 'Le nom doit contenir au moins 3 lettres et ne peut contenir que des lettres.';
    }
  
    // Validate type (must contain only letters and spaces, at least 3 characters)
    if (!this.newAntecedent.type) {
      this.validationErrors['type'] = 'Le type est requis.';
    } else if (!/^[a-zA-ZÀ-ÿ\s]{3,}$/.test(this.newAntecedent.type)) {
      this.validationErrors['type'] = 'Le type doit contenir au moins 3 lettres et ne peut contenir que des lettres.';
    }
  
    // Validate dates
    if (!this.newAntecedent.date_debut) {
      this.validationErrors['date_debut'] = 'La date de début est requise.';
    }
  
    if (!this.newAntecedent.date_fin) {
      this.validationErrors['date_fin'] = 'La date de fin est requise.';
    }
  
    // Compare dates if both are provided
    if (this.newAntecedent.date_debut && this.newAntecedent.date_fin) {
      const startDate = new Date(this.newAntecedent.date_debut);
      const endDate = new Date(this.newAntecedent.date_fin);
      
      if (endDate < startDate) {
        this.validationErrors['date_fin'] = 'La date de fin ne peut pas être antérieure à la date de début.';
      }
    }
  // Check if there are any validation errors
  const hasErrors = Object.values(this.validationErrors).some(error => error !== '');

  if (!hasErrors) {
    const newId = this.antecedents.length + 1;
    const antecedent: Antecedent = {
      id: newId,
      type: this.newAntecedent.type!,
      nom: this.newAntecedent.nom!,
      description: this.newAntecedent.description || '',
      date_debut: this.newAntecedent.date_debut!,
      date_fin: this.newAntecedent.date_fin!,
      DPI_id: this.dpi.id,
    };
    this.antecedents.push(antecedent);
    this.resetForm();
    this.toggleModal();
  }
}

  // Reset the form fields
  resetForm() {
    this.newAntecedent = {
      type: '',
      nom: '',
      description: '',
      date_debut: '',
      date_fin: '',
      DPI_id: this.dpi.id,
    };
  }
  // Add these new properties to your component class
modalMode: 'add' | 'view' | 'edit' = 'add';
selectedAntecedent: Antecedent | null = null;

// Modify the existing toggleModal function
toggleModal(mode: 'add' | 'view' | 'edit' = 'add', antecedent?: Antecedent) {
  this.modalMode = mode;
  if (mode === 'add') {
    this.resetForm();
  } else if (antecedent) {
    this.selectedAntecedent = antecedent;
    this.newAntecedent = {
      type: antecedent.type,
      nom: antecedent.nom,
      description: antecedent.description,
      date_debut: antecedent.date_debut,
      date_fin: antecedent.date_fin,
      DPI_id: antecedent.DPI_id
    };
  }
  this.showModal = !this.showModal;
}

// Add function to update antecedent
updateAntecedent() {
  // Perform the same validation as addAntecedent
  this.validationErrors = {
    nom: '',
    type: '',
    date_debut: '',
    date_fin: ''
  };

  if (!this.newAntecedent.nom) {
    this.validationErrors['nom'] = 'Le nom est requis.';
  } else if (!/^[a-zA-ZÀ-ÿ\s]{3,}$/.test(this.newAntecedent.nom)) {
    this.validationErrors['nom'] = 'Le nom doit contenir au moins 3 lettres et ne peut contenir que des lettres.';
  }

  if (!this.newAntecedent.type) {
    this.validationErrors['type'] = 'Le type est requis.';
  } else if (!/^[a-zA-ZÀ-ÿ\s]{3,}$/.test(this.newAntecedent.type)) {
    this.validationErrors['type'] = 'Le type doit contenir au moins 3 lettres et ne peut contenir que des lettres.';
  }

  if (!this.newAntecedent.date_debut) {
    this.validationErrors['date_debut'] = 'La date de début est requise.';
  }

  if (!this.newAntecedent.date_fin) {
    this.validationErrors['date_fin'] = 'La date de fin est requise.';
  }

  if (this.newAntecedent.date_debut && this.newAntecedent.date_fin) {
    const startDate = new Date(this.newAntecedent.date_debut);
    const endDate = new Date(this.newAntecedent.date_fin);
    
    if (endDate < startDate) {
      this.validationErrors['date_fin'] = 'La date de fin ne peut pas être antérieure à la date de début.';
    }
  }

  const hasErrors = Object.values(this.validationErrors).some(error => error !== '');

  if (!hasErrors && this.selectedAntecedent) {
    const index = this.antecedents.findIndex(a => a.id === this.selectedAntecedent!.id);
    if (index !== -1) {
      this.antecedents[index] = {
        ...this.selectedAntecedent,
        ...this.newAntecedent
      };
      this.toggleModal();
    }
  }
}

// Add function to delete antecedent
deleteAntecedent(id: number) {
  if (confirm('Êtes-vous sûr de vouloir supprimer cet antécédent ?')) {
    const index = this.antecedents.findIndex(a => a.id === id);
    if (index !== -1) {
      this.antecedents.splice(index, 1);
    }
  }
}

  Hospitalisations: Hospitalisation[] = [
    {
      id: 1,
      date_debut: '2024-12-01',
      date_fin: '',
      DPI: 1,
      medecin_responsable: 1,
    },
    {
      id: 2,
      date_debut: '2024-11-15',
      date_fin: '2024-11-20',
      DPI: 2,
      medecin_responsable: 2,
    },
    {
      id: 3,
      date_debut: '2024-10-01',
      date_fin: '2024-10-15',
      DPI: 3,
      medecin_responsable: 3,
    },
  ];

  bilans: BilanRadio[] = [
    {
      id: 1,
      date_debut: '2024-12-01',
      date_fin: '2024-12-05',
      type_radio: 'IRM',
      est_complet: true,
      est_resultat: true,
      description: 'IRM cérébrale pour évaluation neurologique',
      medecin: 'doc1',
      Consultation: 0,
      resultat_id: 1,
      etablissement: 0,
      patient: ''
    },
    {
      id: 2,
      date_debut: '2024-11-20',
      date_fin: '2024-11-22',
      type_radio: 'SCANNER',
      est_complet: false,
      est_resultat: false,
      description: 'Scanner thoracique pour diagnostic précoce',
      medecin: 'doc2',
      Consultation: 1,
      resultat_id: 2,
      etablissement: 0,
      patient: ''
    },
    {
      id: 3,
      date_debut: '2024-10-15',
      date_fin: '2024-10-18',
      type_radio: 'RADIO',
      est_complet: true,
      est_resultat: true,
      description: 'Radiographie abdominale pour contrôle postopératoire',
      medecin: 'MED003',
      Consultation: 2,
      resultat_id: 1,
      etablissement: 0,
      patient: ''
    },
  ];

  bilansBio: BilanBio[] = [
    {
      id: 1,
      date_debut: '2024-12-03',
      date_fin: '2024-12-04',
      parametres: 'Glycémie, Cholestérol, Créatinine',
      est_complet: true,
      est_resultat: true,
      medecin: 'MED001',
      Consultation: 2,
      etablissement: 1,
      patient: ''
    },
    {
      id: 2,
      date_debut: '2024-11-25',
      date_fin: '2024-11-26',
      parametres: 'Hémogramme complet',
      est_complet: false,
      est_resultat: false,
      medecin: 'MED003',
      Consultation: null,
      etablissement: 1,
      patient: ''
    },
    {
      id: 3,
      date_debut: '2024-10-10',
      date_fin: '2024-10-11',
      parametres: 'Tests hépatiques, Ionogramme',
      est_complet: true,
      est_resultat: true,
      medecin: 'MED002',
      Consultation: 1,
      etablissement: 2,
      patient: ''
    }
  ];

 
  showFilterModal = false;
  filterCriteria = {
    type: '',
    dateStart: '',
    dateEnd: ''
  };
  filter = {
    number: 0
  };

  readonly BILAN_TYPES = [
    { value: 'bio', label: 'Biologique', color: '#FF34A0' },
    { value: 'radio', label: 'Radiologique', color: '#0CF045' }
  ];

  constructor() {
    this.combineBilans();
    this.filteredBilans = this.combinedBilans;
  }

  combineBilans() {
    // Convert radio bilans
    const radioBilans = this.bilans.map(bilan => ({
      ...bilan,
      type: 'radio' as const
    }));

    // Convert bio bilans
    const bioBilans = this.bilansBio.map(bilan => ({
      ...bilan,
      type: 'bio' as const
    }));

    // Combine and shuffle
    this.combinedBilans = [...radioBilans, ...bioBilans]
      .sort(() => Math.random() - 0.5);
  }
  

  combinedBilans: CombinedBilan[] = [];
  filteredBilans: CombinedBilan[] = []; 


  getBilanTypeStyle(type: 'radio' | 'bio') {
    if (type === 'bio') {
      return {
        color: '#FF34A0',
        backgroundColor: '#FF34A033'
      };
    } else {
      return {
        color: '#0CF045',
        backgroundColor: '#0CF04533'
      };
    }
  }

  getBilanDisplayType(bilan: CombinedBilan): string {
    if (bilan.type === 'bio') {
      return 'Biologique';
    } else {
      return (bilan as BilanRadio).type_radio;
    }
  }

  // Updated filter methods
  toggleFilterModal() {
    if (!this.showFilterModal) {
      this.filterCriteria = {
        type: '',
        dateStart: '',
        dateEnd: ''
      };
    }
    this.showFilterModal = !this.showFilterModal;
  }

  applyFilters() {
    this.filteredBilans = this.combinedBilans.filter(bilan => {
      let matchesType = true;
      let matchesDate = true;
  
      // Check type filter
      if (this.filterCriteria.type) {
        matchesType = bilan.type === this.filterCriteria.type;
      }
  
      // Check only start date
      if (this.filterCriteria.dateStart) {
        const bilanDate = new Date(bilan.date_debut);
        const startDate = new Date(this.filterCriteria.dateStart);
        matchesDate = bilanDate >= startDate;
      }
  
      return matchesType && matchesDate;
    });
  
    // Update filter count (1 for type, 1 for date if set)
    this.filter.number = (this.filterCriteria.type ? 1 : 0) + 
                        (this.filterCriteria.dateStart ? 1 : 0);
  
    this.toggleFilterModal();
  }


  clearFilters() {
    this.filterCriteria = {
      type: '',
      dateStart: '',
      dateEnd: ''
    };
    this.filteredBilans = this.combinedBilans;
    this.filter.number = 0;
    this.toggleFilterModal();
  }

  mutuelles: Mutuelle[] = [
    {
      id: 1,
      patient_id: 1,
      nom: 'Mutuelle Santé Plus',
      numero_adherent: 12345678,
      type_couverture: 'Complète',
      telephone: 0o555123456,
      email: 'contact@mutuellesanteplus.dz',
    },
    {
      id: 2,
      patient_id: 2,
      nom: 'Assurance Maladie Universelle',
      numero_adherent: 87654321,
      type_couverture: 'Partielle',
      telephone: 0o666234567,
      email: 'info@amu.dz',
    },
    {
      id: 3,
      patient_id: 3,
      nom: 'Mutuelle Bien-Être',
      numero_adherent: 56781234,
      type_couverture: 'Spécialisée',
      telephone: 0o77734567 ,
      email: 'support@bienetre.dz',
    },
  ];

  showHospitalizationModal = false;
  hospitalizationModalMode: 'add' | 'view' = 'add';
  selectedHospitalization: Hospitalisation | null = null;
  newHospitalization: Partial<Hospitalisation> = {
    id: 0,
    date_debut: '',
    date_fin: '',
    DPI: 0,
    medecin_responsable: 0
  };
  
  hospitalizationValidationErrors: { [key: string]: string } = {
    medecin_responsable: '',
    date_debut: ''
  };

  // Toggle hospitalization modal
  toggleHospitalizationModal(mode: 'add' | 'view' = 'add', hospitalization?: Hospitalisation) {
    if (!this.showHospitalizationModal) {
      // Opening modal
      this.hospitalizationModalMode = mode;
      this.hospitalizationValidationErrors = {
        medecin_responsable: '',
        date_debut: ''
      };

      if (mode === 'view' && hospitalization) {
        // For viewing existing hospitalization
        this.selectedHospitalization = hospitalization;
        this.newHospitalization = { ...hospitalization };
      } else {
        // For adding new hospitalization
        this.selectedHospitalization = null;
        this.newHospitalization = {
          id: 0,
          date_debut: '',
          date_fin: '',
          DPI: this.dpi.id,
          medecin_responsable: 0
        };
      }
    } else {
      // Closing modal - reset everything
      this.selectedHospitalization = null;
      this.newHospitalization = {
        id: 0,
        date_debut: '',
        date_fin: '',
        DPI: 0,
        medecin_responsable: 0
      };
    }

    this.showHospitalizationModal = !this.showHospitalizationModal;
  }

  // Validate hospitalization
  validateHospitalization(): boolean {
    this.hospitalizationValidationErrors = {
      medecin_responsable: '',
      date_debut: ''
    };
    let isValid = true;

    if (!this.newHospitalization.medecin_responsable) {
      this.hospitalizationValidationErrors['medecin_responsable'] = 'Le médecin responsable est requis';
      isValid = false;
    }

    if (!this.newHospitalization.date_debut) {
      this.hospitalizationValidationErrors['date_debut'] = 'La date de début est requise';
      isValid = false;
    }

    return isValid;
  }

  // Add new hospitalization
  addHospitalization() {
    if (this.validateHospitalization()) {
      const newId = (this.Hospitalisations.length + 1);
      const hospitalization: Hospitalisation = {
        id: newId,
        date_debut: this.newHospitalization.date_debut!,
        date_fin: this.newHospitalization.date_fin || '',
        DPI: this.dpi.id,
        medecin_responsable: this.newHospitalization.medecin_responsable!
      };

      this.Hospitalisations.push(hospitalization);
      this.toggleHospitalizationModal();
    }
  }


// Update these properties in your component class
showMutuelleModal = false;
mutuelleValidationErrors: { [key: string]: string } = {
  nom: '',
  type_couverture: '',
  numero_adherent: '',
  email: '',
  telephone: ''
};

newMutuelle: Mutuelle = {
  nom: '',
  type_couverture: '',
  numero_adherent: 0,
  email: '',
  telephone: 0,
  id: 0,
  patient_id: 0
};

// Toggle modal function
toggleMutuelleModal() {
  if (!this.showMutuelleModal) {
      // Reset form when opening
      this.newMutuelle = {
          nom: '',
          type_couverture: '',
          numero_adherent: 0,
          email: '',
          telephone: 0,
          id: 0,
          patient_id: 0
      };
      this.mutuelleValidationErrors = {
          nom: '',
          type_couverture: '',
          numero_adherent: '',
          email: '',
          telephone: ''
      };
  }
  this.showMutuelleModal = !this.showMutuelleModal;
}

// Validate mutuelle data
validateMutuelle(): boolean {
  this.mutuelleValidationErrors = {
      nom: '',
      type_couverture: '',
      numero_adherent: '',
      email: '',
      telephone: ''
  };
  
  let isValid = true;

  if (!this.newMutuelle.nom?.trim()) {
      this.mutuelleValidationErrors['nom'] = 'Le nom est requis';
      isValid = false;
  }

  if (!this.newMutuelle.type_couverture) {
      this.mutuelleValidationErrors['type_couverture'] = 'Le type de couverture est requis';
      isValid = false;
  }

  if (!this.newMutuelle.numero_adherent) {
      this.mutuelleValidationErrors['numero_adherent'] = 'Le numéro d\'adhérent est requis';
      isValid = false;
  }

  if (!this.newMutuelle.email?.trim()) {
      this.mutuelleValidationErrors['email'] = 'L\'email est requis';
      isValid = false;
  } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(this.newMutuelle.email)) {
      this.mutuelleValidationErrors['email'] = 'Email invalide';
      isValid = false;
  }

  if (!this.newMutuelle.telephone) {
      this.mutuelleValidationErrors['telephone'] = 'Le téléphone est requis';
      isValid = false;
  } else if (!/^\d{10}$/.test(String(this.newMutuelle.telephone))) {
      this.mutuelleValidationErrors['telephone'] = 'Le téléphone doit contenir 10 chiffres';
      isValid = false;
  }

  return isValid;
}

// Fixed addMutuelle function
addMutuelle() {
  if (this.validateMutuelle()) {
      const newId = 0;
      
      // Create new mutuelle without spread operator to avoid property conflicts
      const mutuelle: Mutuelle = {
          id: newId,
          patient_id: this.patient1.id,
          nom: this.newMutuelle.nom,
          type_couverture: this.newMutuelle.type_couverture,
          numero_adherent: this.newMutuelle.numero_adherent,
          email: this.newMutuelle.email,
          telephone: this.newMutuelle.telephone
      };

      this.mutuelles.push(mutuelle);
      this.toggleMutuelleModal();
  }
}
showTypeDropdown = false;

toggleTypeDropdown() {
  this.showTypeDropdown = !this.showTypeDropdown;
}

selectType(type: string) {
  this.filterCriteria.type = type;
  this.showTypeDropdown = false;
}

getBilanTypeLabel(type: string): string {
  const foundType = this.BILAN_TYPES.find(t => t.value === type);
  return foundType ? foundType.label : 'Tous les types';
}

// Add click outside handler to close dropdown
@HostListener('document:click', ['$event'])
handleClick(event: MouseEvent) {
  const target = event.target as HTMLElement;
  if (!target.closest('.custom-dropdown')) {
    this.showTypeDropdown = false;
  }
}

 
  showModifyModal = false;
  showEtablissementDropdown = false;
  selectedEtablissement: Etablissement | null = null;

  deleteDPI() {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce DPI ?')) {
      // Call your service method to delete the DPI
      this.dpiService.deleteDPI(this.dpi.id).subscribe({
        next: () => {
          // Show success message
          alert('DPI supprimé avec succès');
          // Refresh the page or update the list
          window.location.reload();
        },
        error: (error: any) => {
          console.error('Error deleting DPI:', error);
          alert('Erreur lors de la suppression du DPI');
        }
      });
    }
  }

  modifyDPI() {
    this.showModifyModal = true;
  }

  toggleEtablissementDropdown(event?: MouseEvent) {
    if (event) {
      event.stopPropagation();
    }
    this.showEtablissementDropdown = !this.showEtablissementDropdown;
  }

  selectEtablissement(etablissement: Etablissement) {
    this.selectedEtablissement = etablissement;
    this.showEtablissementDropdown = false;
  }

  saveModifications() {
    if (!this.selectedEtablissement) {
      alert('Veuillez sélectionner un établissement');
      return;
    }
  
    // Create a new DPI object to trigger change detection
    this.dpi = {
      ...this.dpi,
      etablissement_id: this.selectedEtablissement.id
    };
    
    // Close the modal
    this.showModifyModal = false;
    this.selectedEtablissement = null;
  }
  

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const dropdown = document.querySelector('.etablissement-dropdown');

    if (dropdown && !dropdown.contains(target)) {
      this.showEtablissementDropdown = false;
    }
  }

  closeModifyModal() {
    this.showModifyModal = false;
  }


  etablissements: Etablissement[] = [
    {
      id: 1,
      nom_etablissement: 'Hôpital Central',
      adresse: '123 Rue de la Santé, Paris',
      telephone: 123456789,
      email: 'contact@hopitalcentral.fr',
      type: 'HOPITAL'
    },
    {
      id: 2,
      nom_etablissement: 'Clinique Sainte-Marie',
      adresse: '45 Avenue des Roses, Lyon',
      telephone: 987654321,
      email: 'info@cliniquesainte-marie.fr',
      type: 'HOPITAL'
    },
    {
      id: 3,
      nom_etablissement: 'Centre Médical du Nord',
      adresse: '78 Boulevard des Lumières, Lille',
      telephone: 564738291,
      email: 'contact@centremedicalnord.fr',
      type: 'HOPITAL'
    },
    {
      id: 4,
      nom_etablissement: 'Polyclinique de la Côte',
      adresse: '11 Rue des Vagues, Nice',
      telephone: 472836194,
      email: 'contact@polycliniquecote.fr',
      type: 'HOPITAL'
    },
    {
      id: 5,
      nom_etablissement: 'Hôpital Universitaire',
      adresse: '99 Campus Santé, Marseille',
      telephone: 741258963,
      email: 'info@hopitaluniversitaire.fr',
      type: 'HOPITAL'
    }]

  }
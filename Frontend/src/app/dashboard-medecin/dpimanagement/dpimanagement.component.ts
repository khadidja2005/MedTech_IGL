import { Component } from '@angular/core';
import { DPI } from '../../../types/dpi';
import { Patient } from '../../../types/patient';
import { Mutuelle } from '../../../types/mutuelle';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Etablissement } from '../../../types/etablissement';

@Component({
  selector: 'app-dpi-management',
  imports: [CommonModule, FormsModule],
  templateUrl: './dpimanagement.component.html',
  styleUrl: './dpimanagement.component.css'
})
export class DPIManagementComponent {
  // Current user (medical personnel)
  user = {
    id: 'USER-051',
    name: "Mohamed Reda",
    profession: 'medecin'
  };

  Etablissement: Etablissement={
    id: '001',
    nom_etablissement: '',
    adresse: '',
    telephone: 0,
    email: '',
    type: ''
  };

  user1 = {
    Admin: true,
    name: "Mohamed Reda",
    id: 'USER-051',
    profession: 'medecin'
  };
  

  canEditEtablissement(): boolean {
    return this.user1?.profession ==='medecin';
  }

  showDeleteConfirmation=false;
  itemToDelete: string | null = null;
  
  deleteEtablissement(): void {
    this.showDeleteConfirmation = true;
    this.itemToDelete = this.Etablissement.id;
  }

  // DPI list
  DPIList: DPI[] = [
    {
      id: '1',
      date_creation: '2024-01-01T08:30:00.000Z',
      patient: 'P001',
      etablissement_id: '001',
      createur_id: 'USER-051',
    },
    {
      id: '2',
      date_creation: '2024-01-10T09:45:00.000Z',
      patient: 'P002',
      etablissement_id: '001',
      createur_id: 'USER-051',
    },
    {
      id: '3',
      date_creation: '2024-02-15T14:20:00.000Z',
      patient: 'P003',
      etablissement_id: '001',
      createur_id: 'A002',
    }
  ];

  // Patient model for new DPI
  patient: Patient = {
    id: '',
    nss: '',
    nom_complet: '',
    date_naissance: '',
    adresse: '',
    telephone: 0,
    email: '',
    password: '',
    lienPhoto: '',
    lieu_naissance: '',
    genre: '',
    statueMatrimonial: ''
  };

  // New DPI model
  newDPI: DPI = {
    id: '',
    date_creation: new Date().toISOString(),
    patient: '',
    etablissement_id: '001', // Set to current establishment
    createur_id: this.user.id
  };

  // UI control flags
  showDPIModal = false;
  showMutuelleStep = false;
  showSuccessToast = false;
  showErrorToast = false;

  // Validation errors
  DPIValidationErrors: {
    patient?: string;
    date_naissance?: string;
    nss?: string;
    email?: string;
    telephone?: string;
    adresse?: string;
  } = {};

  // Mutuelle models
  mutuelle1: Mutuelle = {
    nom: '',
    email: '',
    telephone: 0,
    type_couverture: '',
    id: '',
    patient_id: '',
    numero_adherent: 0
  };

  mutuelle2: Mutuelle = {
    nom: '',
    email: '',
    telephone: 0,
    type_couverture: '',
    id: '',
    patient_id: '',
    numero_adherent: 0
  };

  // Get DPIs created by current user
  getUserDPIs(): DPI[] {
    return this.DPIList.filter(dpi => dpi.createur_id === this.user.id);
  }

  // Reset form
  resetDPIForm() {
    this.patient = {
      id: '',
      nss: '',
      nom_complet: '',
      date_naissance: '',
      adresse: '',
      telephone: 0,
      email: '',
      password: '',
      lienPhoto: '',
      lieu_naissance: '',
      genre: '',
      statueMatrimonial: ''
    };
    
    this.newDPI = {
      id: '',
      date_creation: new Date().toISOString(),
      patient: '',
      etablissement_id: '001',
      createur_id: this.user.id
    };
    
    this.DPIValidationErrors = {};
  }

  // Toggle DPI modal
  toggleDPIModal(action: string): void {
    if (action === 'add') {
      this.resetDPIForm();
    }
    this.showDPIModal = !this.showDPIModal;
    this.showMutuelleStep = false;
  }

  // Validate DPI form
  validateDPIForm(): boolean {
    this.DPIValidationErrors = {};
    let isValid = true;

    if (!this.patient.nom_complet?.trim()) {
      this.DPIValidationErrors.patient = "Le nom complet est requis";
      isValid = false;
    }

    if (!this.patient.date_naissance) {
      this.DPIValidationErrors.date_naissance = "La date de naissance est requise";
      isValid = false;
    }

    if (!this.patient.nss?.trim()) {
      this.DPIValidationErrors.nss = "Le NSS est requis";
      isValid = false;
    } else if (!/^\d{13,15}$/.test(this.patient.nss)) {
      this.DPIValidationErrors.nss = "Le NSS doit contenir entre 13 et 15 chiffres";
      isValid = false;
    }

    if (!this.patient.email?.trim()) {
      this.DPIValidationErrors.email = "L'email est requis";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.patient.email)) {
      this.DPIValidationErrors.email = "Format d'email invalide";
      isValid = false;
    }

    if (!this.patient.telephone) {
      this.DPIValidationErrors.telephone = "Le téléphone est requis";
      isValid = false;
    } else if (!/^\d{9,12}$/.test(this.patient.telephone.toString())) {
      this.DPIValidationErrors.telephone = "Format de téléphone invalide";
      isValid = false;
    }

    if (!this.patient.adresse?.trim()) {
      this.DPIValidationErrors.adresse = "L'adresse est requise";
      isValid = false;
    }

    return isValid;
  }

  // Next step in form
  nextStep() {
    if (this.validateDPIForm()) {
      this.showMutuelleStep = true;
    }
  }

  // Return to first step
  returnFirst() {
    this.showMutuelleStep = false;
  }

  // Cancel mutuelle step
  cancelMutuelle() {
    this.showMutuelleStep = false;
  }

  // Show success toast
  private showSuccess(): void {
    this.showSuccessToast = true;
    setTimeout(() => {
      this.showSuccessToast = false;
    }, 3000);
  }

  // Show error toast
  private showError(): void {
    this.showErrorToast = true;
    setTimeout(() => {
      this.showErrorToast = false;
    }, 3000);
  }

  // Submit new DPI
  submitNewDPI(): void {
    if (this.validateDPIForm()) {
      const newDPI = {
        ...this.newDPI,
        id: `DPI-${Date.now()}`,
        createur_id: this.user.id,
        date_creation: new Date().toISOString()
      };
      this.DPIList.push(newDPI);
      this.toggleDPIModal('');
      this.showSuccess();
    } else {
      this.showError();
    }
  }

  // Save DPI with mutuelle
  saveDPIWithMutuelle() {
    this.submitNewDPI();
    this.showMutuelleStep = false;
    this.showDPIModal = false;
  }
}
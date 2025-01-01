import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


export type PersonnelMedicalRole =
  | 'MEDECIN'
  | 'RADIOLOGUE'
  | 'LABORANTIN'
  | 'INFIRMIER'
  | 'PHARMACIEN';

export interface PersonnelMedical {
  id:number;
  lienPhoto: string;
  nom_complet: string;
  email: string;
  specialite: string;
  telephone: number;
  password: string;
  role: PersonnelMedicalRole;
}


@Component({
  selector: 'app-employe-inf',
  imports: [CommonModule, FormsModule],
  templateUrl: './employe-inf.component.html',
  styleUrl: './employe-inf.component.css'
})
export class EmployeInfComponent {

  user1 = {
    Admin: true,
    name: "Mohamed Reda",
    id: 'USER-051',
    profession: 'infermier'
  };
  
  personnels: PersonnelMedical[] = [
    {
      id:0,
      lienPhoto: 'assets/images/medecin1.jpg',
      nom_complet: 'Jean Dupont',
      email: 'jean.dupont@exemple.com',
      specialite: 'Cardiologie',
      telephone: 123456789,
      password: 'password123',
      role: 'MEDECIN',
    },
    {
      id:2,
      lienPhoto: 'assets/images/medecin2.jpg',
      nom_complet: 'Alice Martin',
      email: 'alice.martin@exemple.com',
      specialite: 'Radiologie',
      telephone: 987654321,
      password: 'password123',
      role: 'RADIOLOGUE',
    },
  ];
  
  private validateEmailFormat(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  private validatePhoneNumberFormat(phone: string): boolean {
    const phoneRegex = /^\d{10,15}$/;
    return phoneRegex.test(phone);
  }
  
  canEditEmploye(): boolean {
    return this.user1?.Admin;
  }
  
  // NEW PROPERTIES AND METHODS FOR PERSONNEL AND DPI
  showPersonnelModal = false;
  showDPIModal = false;
  editMode = false; // New property to track whether we're editing an employe
  
  defaultPersonnel: PersonnelMedical = {
    id:0,
    lienPhoto: '',
    nom_complet: '',
    email: '',
    specialite: '',
    telephone: 0,
    password: '',
    role: 'MEDECIN',
  };
  
  newPersonnel: PersonnelMedical = { ...this.defaultPersonnel };
  
  PersonnelValidationErrors: {

    lienPhoto?: string;
    nom_complet?: string;
    email?: string;
    specialite?: string;
    telephone?: string;
    password?: string;
    role?: string;
  } = {};
  
  resetNewPersonnel(): void {
    this.newPersonnel = { ...this.defaultPersonnel };
    this.PersonnelValidationErrors = {};
  }
  
  validateNewPersonnel(): boolean {
    this.PersonnelValidationErrors = {};
    let isValid = true;
  
    if (!this.newPersonnel.nom_complet?.trim()) {
      this.PersonnelValidationErrors.nom_complet = "Le nom complet est requis";
      isValid = false;
    }
  
    if (!this.newPersonnel.email?.trim()) {
      this.PersonnelValidationErrors.email = "L'email est requis";
      isValid = false;
    } else if (!this.validateEmailFormat(this.newPersonnel.email)) {
      this.PersonnelValidationErrors.email = "Le format de l'email est incorrect";
      isValid = false;
    }
  
    if (!this.newPersonnel.telephone || isNaN(this.newPersonnel.telephone)) {
      this.PersonnelValidationErrors.telephone = "Le téléphone est requis";
      isValid = false;
    }
  
    if (!this.newPersonnel.specialite?.trim()) {
      this.PersonnelValidationErrors.specialite = "La spécialité est requise";
      isValid = false;
    }
  
    if (!this.newPersonnel.role?.trim()) {
      this.PersonnelValidationErrors.role = "Le rôle est requis";
      isValid = false;
    }
  
    return isValid;
  }
  
  showSuccessToast = false;
  showErrorToast = false;
  showDeleteConfirmation = false;
  itemToDelete: string | null = null;
  
  private showSuccess(): void {
    this.showSuccessToast = true;
    setTimeout(() => {
      this.showSuccessToast = false;
    }, 3000);
  }
  
  private showError(): void {
    this.showErrorToast = true;
    setTimeout(() => {
      this.showErrorToast = false;
    }, 3000);
  }
  
  submitNewPersonnel(): void {
    if (this.validateNewPersonnel()) {
      this.togglePersonnelModal('');
      this.showPersonnelModal = false;
    } else {
      this.showError();
    }
  }
  
  showPersonnelSelectionModal = false;
  togglePersonnelSelectionModal(): void {
    this.showPersonnelSelectionModal = !this.showPersonnelSelectionModal;
    if (!this.showPersonnelSelectionModal) {
      this.showPersonnelModal = false;
    }
  }
  
  togglePersonnelModal(action: string, employe?: PersonnelMedical): void {
    if (action === 'add') {
      this.editMode = false;
      this.resetNewPersonnel();
      this.showPersonnelSelectionModal = false; // Changed this
      this.showPersonnelModal = true; // Changed this
    }
     else if (action === 'edit' && employe) {
      this.editMode = true;
      this.newPersonnel = { ...employe };
      this.showPersonnelSelectionModal = false;
      this.showPersonnelModal = true;
    } else if (action === 'back') {
      this.showPersonnelSelectionModal = false;
      this.showPersonnelModal = false;
    } else if (action === 'backToSelection') {
      this.showPersonnelModal = false;
      this.showPersonnelSelectionModal = true;
    }
  }
  
  createNewPersonnel(action: string, employe?: PersonnelMedical): void {
    this.togglePersonnelModal(action, employe);
  }
  
  deleteEmploye(id: number): void {
   
  }
}  
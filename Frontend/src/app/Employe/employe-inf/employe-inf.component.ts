import { Component , Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import axios from 'axios';
import { Notyf } from 'notyf';
import { Router } from '@angular/router';

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
  notyf: Notyf | undefined;
  user1 = {
    Admin: true,
    name: "Mohamed Reda",
    id: 'USER-051',
    profession: 'infermier'
  };
  
  personnels: PersonnelMedical[] = [

  ];
    constructor(@Inject(PLATFORM_ID) private platformId: Object , private router : Router) {
      if (isPlatformBrowser(this.platformId)) {
        this.notyf = new Notyf();
      }
    }
  async ngOnInit() {
    try {
     const response = await axios.get('http://localhost:8000/dashboard/personnel-medical/');
    // console.log(response.data);
     this.personnels = response.data;
    
    }catch(e){
      console.log(e); 
      if (this.notyf) {
        this.notyf.error('Erreur lors du chargement des employees');
      };
    }
  }


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
  
 async submitNewPersonnel(): Promise<void> {
    if (this.validateNewPersonnel()) {
      console.log(this.newPersonnel);
      try {
        console.log(this.newPersonnel);
        const response = await axios.post('http://localhost:8000/dashboard/personnel-medical/', {
          lienPhoto : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
          nom_complet: this.newPersonnel.nom_complet,
          role: this.newPersonnel.role,
          telephone: this.newPersonnel.telephone,
          email: this.newPersonnel.email,
          specialite: this.newPersonnel.specialite,
          password:Math.random().toString(36).substring(2, 10) ,
        });
        console.log(response.data);
        if (this.notyf){
          this.notyf?.success('emploee a ete ajouté avec succès');
          setTimeout(()=> {
          this.newPersonnel.id = this.personnels.length + 1;
        this.personnels.push({...this.newPersonnel});
          this.togglePersonnelModal('');
          this.showPersonnelModal = false;
          } , 2000)

        }
  
        
        } catch (e) {
          console.log(e);
          if (this.notyf) {
            this.notyf.error('Erreur lors de l\'ajout de l\'employee');
        }
      }
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
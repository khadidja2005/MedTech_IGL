import { Component , Inject, PLATFORM_ID } from '@angular/core';
import { Etablissement } from '../../../types/etablissement';
import { PersonnelMedical } from '../../../types/personnelMedical';
import { DPI } from '../../../types/dpi';
import { Patient } from '../../../types/patient';
import { Mutuelle } from '../../../types/mutuelle';
import { EtablissementPersonnelMedical } from '../../../types/etablissementPersonnelmedical';
//dashboard/etablissements/1/personnel/
import { FormsModule } from '@angular/forms';
import axios from 'axios';
import { Notyf } from 'notyf';
import { Router } from '@angular/router';
import { CommonModule, isPlatformBrowser, NgClass } from '@angular/common';


interface CompleteDPI {
  patient: {
    nom_complet: string;
    date_naissance: string;
    nss: string;
    email: string;
    telephone: number;
    adresse: string;
  };
  mutuelles: {
    mutuelle1: {
      nom: string;
      telephone: number;
      email: string;
      type_couverture: string;
    };
    mutuelle2: {
      nom: string;
      telephone: number;
      email: string;
      type_couverture: string;
    };
  };
}


@Component({
  selector: 'app-personnals-medicaux',
  imports: [CommonModule, FormsModule],
  templateUrl: './personnals-medicaux.component.html',
  styleUrl: './personnals-medicaux.component.css',
})
export class PersonnalsMedicauxComponent {
  notyf: Notyf | undefined;
  constructor(@Inject(PLATFORM_ID) private platformId: Object , private router : Router) {
    if (isPlatformBrowser(this.platformId)) {
      this.notyf = new Notyf();
    }
  }
  Etablissement: Etablissement = {
    id: 1,
    nom_etablissement: '',
    adresse: '',
    telephone: 0,
    email: '',
    type: 'HOPITAL',
  };

  user1 = {
    Admin: true,
    name: 'Mohamed Reda',
    id: 1,
    profession: 'infermier',
  };

  personnels: PersonnelMedical[] = [

  ];
  DPIList: {
    dpi_id: number,
    patient_id: number,
    nss: number,
    nom_complet: string,
    date_creation: string
  }[] = [
  ];
  async ngOnInit() {
    try {
     const response = await axios.get('http://localhost:8000/dashboard/etablissements/30/personnel/');
     //console.log(response.data);
     this.personnels = response.data.data;
    
    }catch(e){
      console.log(e); 
      if (this.notyf) {
        this.notyf.error('Erreur lors du chargement des employees');
      };
    }

    try {
      const response = await axios.get('http://localhost:8000/dashboard/etablissements/30/dpis/');
      //console.log(response.data);
      this.DPIList = response.data.data;
     
     }catch(e){
       console.log(e); 
       if (this.notyf) {
         this.notyf.error('Erreur lors du chargement des DPIs');
       };
     }
  }

  etablissementPersonnel: EtablissementPersonnelMedical[] = [
    { id: 1, etablissement: 1, personnel_medical: 1 },
    { id: 2, etablissement: 1, personnel_medical: 2 },
  ];

  showModifyModal = false;

  modifyEtablissement() {
    this.showModifyModal = true;
  }

  selectedMenu = 1;
  showModal = false;

  selectMenu(menuNumber: number): void {
    this.selectedMenu = menuNumber;
  }

  newEstablishment: Etablissement = {
    id: 0,
    nom_etablissement: '',
    adresse: '',
    telephone: 0,
    email: '',
    type: 'HOPITAL',
  };

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.resetNewEstablishment();
  }

  resetNewEstablishment(): void {
    this.newEstablishment = {
      id: 0,
      nom_etablissement: '',
      adresse: '',
      telephone: 0,
      email: '',
      type: 'HOPITAL',
    };
  }

  EtablissementValidationErrors: {
    id?: string;
    nom_etablissement?: string;
    adresse?: string;
    telephone?: string;
    email?: string;
    type?: string;
  } = {};

  validateNewEstablishment(): boolean {
    this.EtablissementValidationErrors = {
      nom_etablissement: '',
      adresse: '',
      email: '',
      telephone: '',
    };

    let isValid = true;

    if (!this.newEstablishment.nom_etablissement?.trim()) {
      this.EtablissementValidationErrors['nom_etablissement'] =
        "Le nom d'établissement est requis";
      isValid = false;
    }

    if (!this.newEstablishment.adresse?.trim()) {
      this.EtablissementValidationErrors['adresse'] = "L'adresse est requise";
      isValid = false;
    }

    if (!this.newEstablishment.email?.trim()) {
      this.EtablissementValidationErrors['email'] = "L'email est requis";
      isValid = false;
    } else if (!this.validateEmailFormat(this.newEstablishment.email)) {
      this.EtablissementValidationErrors['email'] =
        "Le format de l'email est incorrect";
      isValid = false;
    }

    const telephone = this.newEstablishment.telephone?.toString();
    if (!telephone?.trim()) {
      this.EtablissementValidationErrors['telephone'] =
        "Le téléphone d'établissement est requis";
      isValid = false;
    } else if (!this.validatePhoneNumberFormat(telephone)) {
      this.EtablissementValidationErrors['telephone'] =
        'Le numéro de téléphone est incorrect';
      isValid = false;
    }

    return isValid;
  }

  private validateEmailFormat(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private validatePhoneNumberFormat(phone: string): boolean {
    const phoneRegex = /^\d{10,15}$/;
    return phoneRegex.test(phone);
  }

  canEditEtablissement(): boolean {
    return this.user1?.Admin;
  }

  // NEW PROPERTIES AND METHODS FOR PERSONNEL AND DPI
  showPersonnelModal = false;
  showDPIModal = false;

  patient: Patient = {
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
    statueMatrimonial: 'Célibataire',
  };

  newDPI : {
    dpi_id: number,
    patient_id: number,
    nss: number,
    nom_complet: string,
    date_creation: string ,
    
  }= {
    dpi_id: 0,
    patient_id: 0,
    date_creation: new Date().toISOString(),
    nom_complet: '',
    nss : 0,
  };

  validateNewDPI(): boolean {
    this.DPIValidationErrors = {};
    let isValid = true;

    if (!this.newDPI.nom_complet?.trim()) {
      this.DPIValidationErrors['patient'] = 'Le patient est requis';
      isValid = false;
    }

    return isValid;
  }
  showSuccessToast = false;
  showErrorToast = false;
  showDeleteConfirmation = false;
  itemToDelete: number | null = null;

  private showSuccess(): void {
    this.showSuccessToast = true;
    setTimeout(() => {
      this.showSuccessToast = false;
    }, 3000);
  }

  // New method to show error toast
  private showError(): void {
    this.showErrorToast = true;
    setTimeout(() => {
      this.showErrorToast = false;
    }, 3000);
  }
  deleteEtablissement(): void {
    this.showDeleteConfirmation = true;
    this.itemToDelete = this.Etablissement.id;
  }

  // New confirmation methods for delete modal
  confirmDelete(): void {
    if (this.itemToDelete) {
      // Implement actual delete logic here
      console.log(`Deleting item with ID: ${this.itemToDelete}`);
      this.showSuccess();
    }
    this.cancelDelete();
  }

  cancelDelete(): void {
    this.showDeleteConfirmation = false;
    this.itemToDelete = null;
  }

  // Modified establishment modification method
  modifyEstablishment(): void {
    if (this.validateNewEstablishment()) {
      // Implement actual update logic here
      Object.assign(this.Etablissement, this.newEstablishment);
      this.showModifyModal = false;
      this.showSuccess();
    } else {
      this.showError();
    }
  }

  showExistingPersonnelModal = false;

  closeModifyModal(): void {
    this.showModifyModal = false;
    this.resetNewEstablishment();
  }

  selectExistingPersonnel(): void {
    this.showPersonnelSelectionModal = false;
    this.showExistingPersonnelModal = true;
  }

  // Update the role options to include all types
  roleOptions = [
    { value: 'MEDECIN', label: 'Médecin' },
    { value: 'RADIOLOGUE', label: 'Radiologue' },
    { value: 'LABORATIN', label: 'Laborantin' },
    { value: 'INFIRMIER', label: 'Infirmier' },
  ];

  showMutuelleStep = false;

  cancelMutuelle() {
    this.showMutuelleStep = false;
  }

  completeDPI: CompleteDPI = {
    patient: {
      nom_complet: '',
      date_naissance: '',
      nss: '',
      email: '',
      telephone: 0,
      adresse: ''
    },
    mutuelles: {
      mutuelle1: {
        nom: '',
        telephone: 0,
        email: '',
        type_couverture: ''
      },
      mutuelle2: {
        nom: '',
        telephone: 0,
        email: '',
        type_couverture: ''
      }
    }
  };


  saveDPIWithMutuelle() {
    // Sauvegarder les informations des mutuelles
    this.completeDPI.mutuelles = {
      mutuelle1: { ...this.mutuelle1 },
      mutuelle2: { ...this.mutuelle2 }
    };

    // Créer un nouveau DPI avec toutes les informations
    const newDPI = {
      dpi_id: Math.max(0, ...this.DPIList.map(d => d.dpi_id)) + 1,
      patient_id: Math.floor(Math.random() * 1000), // Simuler un ID unique
      nss: parseInt(this.completeDPI.patient.nss),
      nom_complet: this.completeDPI.patient.nom_complet,
      date_creation: new Date().toISOString()
    };

    // Ajouter le nouveau DPI à la liste
    this.DPIList.push(newDPI);

    // Réinitialiser le formulaire et fermer les modales
    this.resetCompleteDPIForm();
    this.showMutuelleStep = false;
    this.showDPIModal = false;

    // Afficher le message de succès
    if (this.notyf) {
      this.notyf.success('DPI créé avec succès');
    }
  }

  // Nouvelle méthode pour réinitialiser tout le formulaire
  resetCompleteDPIForm() {
    this.completeDPI = {
      patient: {
        nom_complet: '',
        date_naissance: '',
        nss: '',
        email: '',
        telephone: 0,
        adresse: ''
      },
      mutuelles: {
        mutuelle1: {
          nom: '',
          telephone: 0,
          email: '',
          type_couverture: ''
        },
        mutuelle2: {
          nom: '',
          telephone: 0,
          email: '',
          type_couverture: ''
        }
      }
    };
    
    this.resetDPIForm(); 
    this.mutuelle1 = {
      nom: '',
      email: '',
      telephone: 0,
      type_couverture: '',
      id: 0,
      patient_id: 0,
      numero_adherent: 0
    };
    this.mutuelle2 = {
      nom: '',
      email: '',
      telephone: 0,
      type_couverture: '',
      id: 0,
      patient_id: 0,
      numero_adherent: 0
    };
  }


  mutuelle1: Mutuelle = {
    nom: '',
    email: '',
    telephone: 0,
    type_couverture: '',
    id: 0,
    patient_id: 0,
    numero_adherent: 0,
  };

  mutuelle2: Mutuelle = {
    nom: '',
    email: '',
    telephone: 0,
    type_couverture: '',
    id: 0,
    patient_id: 0,
    numero_adherent: 0,
  };

  
  returnFirst() {
    this.showDPIModal = false;
    this.showMutuelleStep = false;
    this.resetCompleteDPIForm();
  }

  DPIValidationErrors: {
    patient?: string;
    date_naissance?: string;
    nss?: string;
    email?: string;
    telephone?: string;
    adresse?: string;
  } = {};

  resetDPIForm() {
    this.patient = {
      id: 0,
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
      statueMatrimonial: '',
    };

    this.newDPI = {
      dpi_id: 0,
      date_creation: new Date().toISOString(),
      patient_id: 0,
      nom_complet: '',
      nss: 0,
    };

    this.DPIValidationErrors = {};
  }

  toggleDPIModal(action: string): void {
    if (action === 'add') {
      this.resetDPIForm();
    }
    this.showDPIModal = !this.showDPIModal;
    this.showMutuelleStep = false;
  }

  validateDPIForm(): boolean {
    this.DPIValidationErrors = {};
    let isValid = true;

    if (!this.patient.nom_complet?.trim()) {
      this.DPIValidationErrors.patient = 'Le nom complet est requis';
      isValid = false;
    }

    if (!this.patient.date_naissance) {
      this.DPIValidationErrors.date_naissance =
        'La date de naissance est requise';
      isValid = false;
    }

    if (!this.patient.nss?.trim()) {
      this.DPIValidationErrors.nss = 'Le NSS est requis';
      isValid = false;
    } else if (!/^\d{13,15}$/.test(this.patient.nss)) {
      this.DPIValidationErrors.nss =
        'Le NSS doit contenir entre 13 et 15 chiffres';
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
      this.DPIValidationErrors.telephone = 'Le téléphone est requis';
      isValid = false;
    } else if (!/^\d{9,12}$/.test(this.patient.telephone.toString())) {
      this.DPIValidationErrors.telephone = 'Format de téléphone invalide';
      isValid = false;
    }

    if (!this.patient.adresse?.trim()) {
      this.DPIValidationErrors.adresse = "L'adresse est requise";
      isValid = false;
    }

    return isValid;
  }

  nextStep() {
    if (this.validateDPIForm()) {
      // Sauvegarder les informations du patient dans completeDPI
      this.completeDPI.patient = {
        nom_complet: this.patient.nom_complet,
        date_naissance: this.patient.date_naissance,
        nss: this.patient.nss,
        email: this.patient.email,
        telephone: this.patient.telephone,
        adresse: this.patient.adresse
      };
      this.showMutuelleStep = true;
    }
  }

  editMode = false; // New property to track whether we're editing an employe

  defaultPersonnel: PersonnelMedical = {
    id: 0,
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
    id?: string;
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
      this.PersonnelValidationErrors.nom_complet = 'Le nom complet est requis';
      isValid = false;
    }

    if (!this.newPersonnel.email?.trim()) {
      this.PersonnelValidationErrors.email = "L'email est requis";
      isValid = false;
    } else if (!this.validateEmailFormat(this.newPersonnel.email)) {
      this.PersonnelValidationErrors.email =
        "Le format de l'email est incorrect";
      isValid = false;
    }

    if (!this.newPersonnel.telephone || isNaN(this.newPersonnel.telephone)) {
      this.PersonnelValidationErrors.telephone = 'Le téléphone est requis';
      isValid = false;
    }

    if (!this.newPersonnel.specialite?.trim()) {
      this.PersonnelValidationErrors.specialite = 'La spécialité est requise';
      isValid = false;
    }

    if (!this.newPersonnel.role?.trim()) {
      this.PersonnelValidationErrors.role = 'Le rôle est requis';
      isValid = false;
    }

    return isValid;
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
      this.showPersonnelSelectionModal = false;
      this.showPersonnelModal = true;
    } else if (action === 'edit' && employe) {
      this.editMode = true;
      this.newPersonnel = { ...employe };
      this.showPersonnelSelectionModal = false;
      this.showPersonnelModal = true;
    } else if (action === 'back') {
      this.showPersonnelSelectionModal = false;
      this.showPersonnelModal = false;
    } else if (action === 'backToSelection') {
      if (this.editMode) {
        this.showPersonnelModal = false;
        this.showPersonnelSelectionModal = false;
      } else {
        this.showPersonnelModal = false;
        this.showPersonnelSelectionModal = true;
      }
    }
  }

  createNewPersonnel(action: string, employe?: PersonnelMedical): void {
    this.togglePersonnelModal(action, employe);
  }

  sselectedExistingPersonnel: number = 0; // For select dropdown
  existingPersonnelError: string = '';

  addExistingPersonnel(): void {
    if (!this.sselectedExistingPersonnel) {
      this.existingPersonnelError = 'Veuillez sélectionner un personnel';
      return;
    }

    const existingPerson = this.personnels.find(
      (p) => p.id === this.sselectedExistingPersonnel
    );
    const alreadyExists = this.personnels.some(
      (p) => p.id === this.sselectedExistingPersonnel
    );

    if (alreadyExists) {
      this.existingPersonnelError =
        "Ce personnel existe déjà dans l'établissement";
      return;
    }

    if (existingPerson) {
      this.personnels.push({ ...existingPerson });
      this.showPersonnelSelectionModal = false;
      this.showSuccessToast = true;
      setTimeout(() => (this.showSuccessToast = false), 3000);
    }
  }
  getPersonnelsForCurrentEtablissement(): PersonnelMedical[] {
    return this.personnels
  }

  // Obtenir les DPIs de l'établissement courant
  getDPIsForCurrentEtablissement(){
    return this.DPIList
  }

  // Méthode pour ajouter un personnel à l'établissement
  addPersonnelToEtablissement(personnelId: number) {
    const newLink: EtablissementPersonnelMedical = {
      id: 0, // Générer un ID unique
      personnel_medical: 0,
      etablissement: 0,
    };
    this.etablissementPersonnel.push(newLink);
  }

  async submitNewPersonnel(): Promise<void> {
    if (this.validateNewPersonnel()) {
      if (this.editMode) {
        const index = this.personnels.findIndex(
          (person) => person.id === this.newPersonnel.id
        );
        if (index > -1) {
          this.personnels[index] = { ...this.newPersonnel };
        }
      } else {
        // Get the next available ID
        const maxId = Math.max(0, ...this.personnels.map((p) => p.id));
        const newId = maxId + 1;
      
        // Create new personnel with the new ID
        this.newPersonnel.id = newId;
        this.personnels.push({ ...this.newPersonnel });
        try {
          const response = await axios.post('http://localhost:8000/dashboard/etablissements/30/personnel/add/', {
            lienPhoto: this.newPersonnel.lienPhoto || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
            nom_complet: this.newPersonnel.nom_complet,
            role: this.newPersonnel.role,
            telephone: this.newPersonnel.telephone,
            email: this.newPersonnel.email,
            specialite: this.newPersonnel.specialite,
            password: Math.random().toString(36).substring(2, 10),
          });
          console.log(response.data);
          if (this.notyf) {
            this.notyf.success('Employee a été ajouté avec succès');
            setTimeout(() => {
              this.newPersonnel.id = response.data.id; // Use the ID from the response
              this.personnels.push({ ...this.newPersonnel });
              this.togglePersonnelModal('');
              this.showPersonnelModal = false;
            }, 2000);
          }
        }catch (e){
          console.log(e);
          if (this.notyf) {
            this.notyf.error('Erreur lors de l\'ajout de l\'employee');
        }
        }
        // Add the link with establishment - now passing the new ID
        this.addPersonnelToEtablissement(newId);
      }

      this.showSuccess();
      this.togglePersonnelModal('');
      this.showPersonnelModal = false;
    } else {
      this.showError();
    }
  }

  // Modifier la méthode deleteEmploye
  deleteEmploye(id: number): void {
    // Supprimer le lien avec l'établissement
    const linkIndex = this.etablissementPersonnel.findIndex(
      (link) =>
        link.etablissement === this.Etablissement.id &&
        link.personnel_medical === id
    );
    if (linkIndex > -1) {
      this.etablissementPersonnel.splice(linkIndex, 1);
      this.showSuccessToast = true;
      setTimeout(() => {
        this.showSuccessToast = false;
      }, 3000);
    }
  }

  // Modifier la méthode submitNewDPI
  submitNewDPI(): void {
    if (this.validateNewDPI()) {
      const newDPI = {
        ...this.newDPI,
        etablissement_id: this.Etablissement.id, // Lier le DPI à l'établissement courant
        createur_id: this.user1.id,
        date_creation: new Date().toISOString(),
      };
      this.DPIList.push(newDPI);
      this.toggleDPIModal('');
      this.showSuccess();
    } else {
      this.showError();
    }
  }
}

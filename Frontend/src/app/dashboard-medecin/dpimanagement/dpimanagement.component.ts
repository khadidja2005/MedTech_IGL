import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Patient } from '../../../types/patient';
import { Mutuelle } from '../../../types/mutuelle';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Etablissement } from '../../../types/etablissement';
import { DPI } from '../../../types/dpi';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { HeaderPDIComponent } from '../../components/header-pdi/header-pdi.component';
import { Notyf } from 'notyf';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';


@Component({
  selector: 'app-dpi-management',
  imports: [CommonModule, FormsModule, SidebarComponent, HeaderPDIComponent],
  templateUrl: './dpimanagement.component.html',
  styleUrl: './dpimanagement.component.css',
})
export class DPIManagementComponent {
  notyf: Notyf | undefined;
  id: number | undefined;

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
    profession: 'medecin',
  };

  canEditEtablissement(): boolean {
    return this.user1?.profession === 'medecin';
  }

  showDeleteConfirmation = false;
  itemToDelete: Number | null = null;

  deleteEtablissement(): void {
    this.showDeleteConfirmation = true;
    this.itemToDelete = this.Etablissement.id;
  }

  // DPI list
  DPIList: DPI[] = [
    // {
    //   id: 1,
    //   date_creation: '2024-01-01T08:30:00.000Z',
    //   patient: 1,
    //   etablissement_id: 1,
    //   createur_id: 1,
    // },
    // {
    //   id: 2,
    //   date_creation: '2024-01-10T09:45:00.000Z',
    //   patient: 2,
    //   etablissement_id: 1,
    //   createur_id: 2,
    // },
    // {
    //   id: 3,
    //   date_creation: '2024-02-15T14:20:00.000Z',
    //   patient: 3,
    //   etablissement_id: 1,
    //   createur_id: 3,
    // },
  ];

    constructor(
      @Inject(PLATFORM_ID) private platformId: Object,
      private router: Router,
      private route: ActivatedRoute
    ) {
      if (isPlatformBrowser(this.platformId)) {
        this.notyf = new Notyf();
      }
    }
    async ngOnInit() {
      // Get the ID once
      this.route.params.subscribe((params) => {
      this.id = params['id'];
        // Use the ID to fetch data or whatever you need
      })
      try {
       const response = await axios.get(`http://localhost:8000/soins/etablissements/${this.id}/dpis`)
       //console.log( response.data)
       this.DPIList = (response.data as any[]).map((dpi: any) => {
        //console.log('Processing DPI:', dpi); // Debug log
        return {
          date_creation : dpi.date_creation,
          id : dpi.id ,
          etablissement_id : dpi.etablissement?.id || 0,
          createur_id : dpi.createur ? dpi.createur?.id : dpi.medecin?.id ,
          patient : dpi.patient_id?.id ,
        };
      });
        //console.log(this.DPIList)
       if(this.notyf){
       this.notyf.success(" chargement du dpis avec success") 
       }
       
      }catch(e){
        console.log("error" , e)
        if(this.notyf){
         this.notyf.error("erreur durant le chargement du dpis") 
        }
        

      }
      
    }
  // Patient model for new DPI
  patient: Patient = {
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

  // New DPI model
  newDPI: DPI = {
    id: 0,
    date_creation: new Date().toISOString(),
    patient: 0,
    etablissement_id: 1, // Set to current establishment
    createur_id: this.user1.id,
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


  // Reset form
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
      id: 0,
      date_creation: new Date().toISOString(),
      patient: 0,
      etablissement_id: 1,
      createur_id: this.user1.id,
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
        id: 0,
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

  // Save DPI with mutuelle
  saveDPIWithMutuelle() {
    this.submitNewDPI();
    this.showMutuelleStep = false;
    this.showDPIModal = false;
  }
  navigateToDPI(id: number) {
    this.router.navigate([`dpi/${id}`]);
  }
}

import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Etablissement } from '../../../types/etablissement';
import axios from 'axios';
import { Notyf } from 'notyf';
import { Router } from '@angular/router';

@Component({
  selector: 'app-establishments',
  templateUrl: './establishments.component.html',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./establishments.component.css'],
})
export class EstablishmentsComponent implements OnInit {
  isAdmin: boolean = true;
  notyf: Notyf | undefined;
  searchTerm: string = '';
  showModal: boolean = false;
  currentPage: number = 1;
  establishmentsPerPage: number = 6;

  establishments: Etablissement[] = [];

  newEstablishment: Etablissement = {
    id: 0,
    nom_etablissement: '',
    adresse: '',
    telephone: 0,
    email: '',
    type: 'HOPITAL',
  };

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.notyf = new Notyf();
    }
  }
  get filteredEstablishments(): Etablissement[] {
    return this.establishments.filter((est) =>
      est.nom_etablissement
        .toLowerCase()
        .includes(this.searchTerm.toLowerCase())
    );
  }

  get currentEstablishments(): Etablissement[] {
    const indexOfLastEstablishment =
      this.currentPage * this.establishmentsPerPage;
    const indexOfFirstEstablishment =
      indexOfLastEstablishment - this.establishmentsPerPage;
    return this.filteredEstablishments.slice(
      indexOfFirstEstablishment,
      indexOfLastEstablishment
    );
  }

  get pageCount(): number {
    return Math.ceil(
      this.filteredEstablishments.length / this.establishmentsPerPage
    );
  }

  async ngOnInit() {
    const role = localStorage.getItem('role');
    this.isAdmin = role === 'ADMIN' ? true : false;
    try {
      const response = await axios.get(
        'http://localhost:8000/dashboard/etablissements',
        {
          params: { id: localStorage.getItem('id') },
        }
      );
      //console.log(response.data);
      this.establishments = response.data.data;
    } catch (e) {
      console.log(e);
      if (this.notyf) {
        this.notyf.error('Erreur lors du chargement des établissements');
      }
    }
  }

  onSearch(event: any): void {
    this.searchTerm = event.target.value;
    this.currentPage = 1;
  }

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

  async addEstablishment(): Promise<void> {
    if (this.validateNewEstablishment()) {
      try {
        console.log(this.newEstablishment);
        const response = await axios.post(
          'http://localhost:8000/dashboard/etablissements/create/user/',
          {
            nom_etablissement: this.newEstablishment.nom_etablissement,
            adresse: this.newEstablishment.adresse,
            telephone: this.newEstablishment.telephone,
            email: this.newEstablishment.email,
          }
        );
        console.log(response.data);
        if (this.notyf) {
          this.notyf?.success('Etablissement ajouté avec succès');
          setTimeout(() => {
            this.newEstablishment.id = this.establishments.length + 1;
            this.establishments.push({ ...this.newEstablishment });
            this.closeModal();
          }, 2000);
        }
      } catch (e) {
        console.log(e);
        if (this.notyf) {
          this.notyf.error("Erreur lors de l'ajout de l'établissement");
        }
      }
    }
  }

  EtablissementValidationErrors: {
    id?: string;
    nom_etablissement?: string;
    adresse?: string;
    telephone?: string; // Change type to string for storing error messages
    email?: string;
    type?: string;
  } = {};

  validateNewEstablishment(): boolean {
    // Initialize error messages
    this.EtablissementValidationErrors = {
      nom_etablissement: '',
      adresse: '',
      email: '',
      telephone: '',
    };

    let isValid = true;

    // Validate nom_etablissement
    if (!this.newEstablishment.nom_etablissement?.trim()) {
      this.EtablissementValidationErrors['nom_etablissement'] =
        "Le nom d'établissement est requis";
      isValid = false;
    }

    // Validate adresse
    if (!this.newEstablishment.adresse?.trim()) {
      this.EtablissementValidationErrors['adresse'] = "L'adresse est requise";
      isValid = false;
    }

    // Validate email
    if (!this.newEstablishment.email?.trim()) {
      this.EtablissementValidationErrors['email'] = "L'email est requis";
      isValid = false;
    } else if (!this.validateEmailFormat(this.newEstablishment.email)) {
      this.EtablissementValidationErrors['email'] =
        "Le format de l'email est incorrect";
      isValid = false;
    }

    // Validate telephone
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

  // Helper function to validate email format
  private validateEmailFormat(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Standard email regex
    return emailRegex.test(email);
  }

  // Helper function to validate phone number format
  private validatePhoneNumberFormat(phone: string): boolean {
    const phoneRegex = /^\d{10,15}$/; // Accepts numbers with 10 to 15 digits
    return phoneRegex.test(phone);
  }

  setPage(page: number): void {
    this.currentPage = page;
  }

  getPageArray(): number[] {
    return Array.from({ length: this.pageCount }, (_, i) => i + 1);
  }
}

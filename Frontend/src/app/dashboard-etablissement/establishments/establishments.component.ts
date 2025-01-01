import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Etablissement } from '../../../types/etablissement';

@Component({
  selector: 'app-establishments',
  templateUrl: './establishments.component.html',
  imports :[CommonModule, FormsModule],
  styleUrls: ['./establishments.component.css']
})
export class EstablishmentsComponent implements OnInit {
  searchTerm: string = '';
  showModal: boolean = false;
  currentPage: number = 1;
  establishmentsPerPage: number = 6;
  
  establishments: Etablissement[] = [
    {
      id: 1,
      nom_etablissement: 'Etablissement 1',
      adresse: '8 W. South St.Buford, GA 30518',
      telephone: 123456789,
      email: 'email@gmail.com',
      type: 'HOPITAL',

    }
    
  ];

  newEstablishment: Etablissement = {
    id: 0,
    nom_etablissement: '',
    adresse: '',
    telephone: 0,
    email: '',
    type: 'HOPITAL',
  };

  get filteredEstablishments(): Etablissement[] {
    return this.establishments.filter(est => 
      est.nom_etablissement.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  get currentEstablishments(): Etablissement[] {
    const indexOfLastEstablishment = this.currentPage * this.establishmentsPerPage;
    const indexOfFirstEstablishment = indexOfLastEstablishment - this.establishmentsPerPage;
    return this.filteredEstablishments.slice(
      indexOfFirstEstablishment,
      indexOfLastEstablishment
    );
  }

  get pageCount(): number {
    return Math.ceil(this.filteredEstablishments.length / this.establishmentsPerPage);
  }

  ngOnInit(): void {
    // Initialize component
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

  addEstablishment(): void {
    if (this.validateNewEstablishment()) {
      this.newEstablishment.id = this.establishments.length + 1;
      this.establishments.push({...this.newEstablishment});
      this.closeModal();
    }
  }
  
  EtablissementValidationErrors: { 
    id?: string,
    nom_etablissement?: string,
    adresse?: string,
    telephone?: string, // Change type to string for storing error messages
    email?: string,
    type?: string,
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
      this.EtablissementValidationErrors['nom_etablissement'] = "Le nom d'établissement est requis";
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
      this.EtablissementValidationErrors['email'] = "Le format de l'email est incorrect";
      isValid = false;
    }
  
    // Validate telephone
    const telephone = this.newEstablishment.telephone?.toString();
    if (!telephone?.trim()) {
      this.EtablissementValidationErrors['telephone'] = "Le téléphone d'établissement est requis";
      isValid = false;
    } else if (!this.validatePhoneNumberFormat(telephone)) {
      this.EtablissementValidationErrors['telephone'] = "Le numéro de téléphone est incorrect";
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
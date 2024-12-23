import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import QRCode from 'qrcode';
import { DPI } from '../../../types/dpi';
import { Etablissement } from '../../../types/etablissement';
import { Patient } from '../../../types/patient';
import { Antecedent } from '../../../types/antecedent';

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

  // Function to change the selected menu
  selectMenu(menuNumber: number): void {
    this.selectedMenu = menuNumber;
  }

  dpi: DPI = {
    id: 'DPI-001',
    createur_id: 'USER-001',
    date_creation: '2024-12-21',
    patient: '',
    etablissement_id: ''
  };

  user1 = {
    Admin: true,
    name: 'John Doe',
    id: 'USER-051'
  };

  etablissement: Etablissement = {
    id: 'ETAB-001',
    nom_etablissement: 'Hôpital Central',
    adresse: '',
    telephone: 0,
    email: '',
    type: ''
  };

  patient1: Patient = {
    id: 'P12345',
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

  qrCodeDataUrl: string = '';
  showQrModal: boolean = false;
  showStatusDropdown: boolean = false;

  constructor() {}

  async ngOnInit() {
    await this.generateQRCode();
  }

  async generateQRCode() {
    const qrData = JSON.stringify({
      dpiId: this.dpi.id,
      createdBy: this.dpi.createur_id,
      establishment: this.etablissement.id,
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

  modifyDPI() {
    console.log('Modifying DPI:', this.dpi.id);
  }

  deleteDPI() {
    console.log('Deleting DPI:', this.dpi.id);
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
      id: '1',
      type: 'Type 1',
      nom: 'Antécédent 1',
      description: 'Description 1',
      date_debut: '2023-01-01',
      date_fin: '2023-12-31',
      DPI_id: 'DPI123',
    },
    {
      id: '2',
      type: 'Type 2',
      nom: 'Antécédent 2',
      description: 'Description 2',
      date_debut: '2022-05-15',
      date_fin: '2022-10-20',
      DPI_id: 'DPI123',
    },
  ];

}
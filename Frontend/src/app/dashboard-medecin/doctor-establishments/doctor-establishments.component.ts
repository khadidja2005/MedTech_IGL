// doctor-establishments.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PersonnelMedical } from '../../../types/personnelMedical';
import { Etablissement } from '../../../types/etablissement';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { HeaderPDIComponent } from "../../components/header-pdi/header-pdi.component";



interface EtablissementPersonnelMedical {
  id: number;
  etablissement: number; 
  personnel_medical: number; 
}

@Component({
  selector: 'app-doctor-establishments',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent, HeaderPDIComponent],
  templateUrl: './doctor-establishments.component.html',
  styleUrls: ['./doctor-establishments.component.css']
})
export class DoctorEstablishmentsComponent implements OnInit {
  searchTerm: string = '';
  currentPage: number = 1;
  establishmentsPerPage: number = 6;
  showModal: boolean = false;
  
  currentDoctor: PersonnelMedical = {
    id: 1,
    lienPhoto: 'assets/images/doctor.png',
    nom_complet: 'laila hadid',
    email: 'doctor@example.com',
    specialite: 'Cardiology',
    telephone: 123456789,
    password: '',
    role: 'MEDECIN'
  };

 
  establishments: Etablissement[] = [];
  doctorEstablishments: EtablissementPersonnelMedical[] = [];
  
  get filteredEstablishments(): Etablissement[] {
    const doctorEstablishmentIds = this.doctorEstablishments
      .filter(de => de.personnel_medical === this.currentDoctor.id)
      .map(de => de.etablissement);
    
    // Filter establishments by search term and doctor's associations
    return this.establishments
      .filter(est => doctorEstablishmentIds.includes(est.id))
      .filter(est => 
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

  constructor() {
    this.loadDoctorEstablishments();
  }

  ngOnInit(): void {
    if (this.currentDoctor.role !== 'MEDECIN') {
      console.error('Unauthorized access - This page is only for doctors');

      return;
    }
  }

  private loadDoctorEstablishments(): void {
    this.establishments = [
      {
        id: 1,
        nom_etablissement: 'Hopital Central',
        adresse: '123 Rue Principale',
        telephone: 123456789,
        email: 'hopital@example.com',
        type: 'HOPITAL'
      },
      {
        id: 3,
        nom_etablissement: 'Hôpital Central',
        adresse: '123 Rue Principale',
        telephone: 123456789,
        email: 'hopital@example.com',
        type: 'HOPITAL'
      },
      {
        id: 5,
        nom_etablissement: 'Hôpital Central',
        adresse: '123 Rue Principale',
        telephone: 123456789,
        email: 'hopital@example.com',
        type: 'HOPITAL'
      }
      
    ];

    this.doctorEstablishments = [
      {
        id: 2,
        etablissement: 1,
        personnel_medical: 1
      }
     
    ];
  }

  onSearch(event: any): void {
    this.searchTerm = event.target.value;
    this.currentPage = 1;
  }

  setPage(page: number): void {
    this.currentPage = page;
  }

  getPageArray(): number[] {
    return Array.from({ length: this.pageCount }, (_, i) => i + 1);
  }
}
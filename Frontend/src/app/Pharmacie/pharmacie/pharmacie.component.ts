import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { HeaderPDIComponent } from '../../components/header-pdi/header-pdi.component';
import { PharmaHeaderComponent } from '../pharma-header/pharma-header.component';
import { OrdonnanceCardComponent } from '../ordonnance-card/ordonnance-card.component';
import axios from 'axios';
import { Router } from '@angular/router';
export interface OrdonnancePharma {
  id: number;
  date_debut: string;
  etablissement: number;
}
export interface Etab {
  nom: string;
  id: number;
}
interface ord {
  id: number;
  date: string;
  etablissement_id: number;
  etablissement: string;
}
interface data {
  ordonnances: ord[];
}

@Component({
  selector: 'app-pharmacie',
  imports: [
    SidebarComponent,
    HeaderPDIComponent,
    PharmaHeaderComponent,
    OrdonnanceCardComponent,
    CommonModule,
  ],
  templateUrl: './pharmacie.component.html',
  styleUrl: './pharmacie.component.css',
})
export class PharmacieComponent {
  constructor(private router: Router) {}
  role = 'pharmacien';
  activeItem = 'Ordonnance';
  pharmacien = localStorage.getItem('id');
  getNameEtablissemnt(id: number): string {
    return this.etablissements.find((e) => e.id === id)?.nom || 'Inconnu';
  }

  etablissements: Etab[] = [];

  ordonnances: OrdonnancePharma[] = [];
  filteredOrdonnances: OrdonnancePharma[] = [...this.ordonnances];
  ngOnInit(): void {
    this.onPageLoad();
  }
  // Fonction exécutée au chargement
  async onPageLoad(): Promise<void> {
    console.log('Pharmacien:', this.pharmacien);
    try {
      const response = await axios.get<data>(
        'http://localhost:8000/pharmacie/home',
        {
          params: { pharmacien: this.pharmacien },
        }
      );
      for (const ord of response.data.ordonnances) {
        this.ordonnances.push({
          id: ord.id,
          date_debut: ord.date,
          etablissement: ord.etablissement_id,
        });
        if (!this.etablissements.some((e) => e.id === ord.etablissement_id)) {
          this.etablissements.push({
            id: ord.etablissement_id,
            nom: ord.etablissement,
          });
        }
      }
      this.filteredOrdonnances = [...this.ordonnances];
    } catch (error) {
      console.error('Error:', error);
    }
  }

  // Holds the filtered results
  pageSize = 12; // Items per page
  currentPage = 1;

  onFilterApply(filterValues: any) {
    this.filteredOrdonnances = this.ordonnances.filter((ordonnance) => {
      let matchesDateDebut = false;
      let matchesDateFin = false;
      let matchesEtablissement = false;

      // If no filters are applied, show all
      if (
        !filterValues.date_debut &&
        !filterValues.date_fin &&
        !filterValues.etablissement
      ) {
        return true;
      }

      if (filterValues.date_fin) {
        matchesDateFin = ordonnance.date_debut === filterValues.date_fin;
      }
      if (filterValues.date_debut) {
        matchesDateDebut = ordonnance.date_debut === filterValues.date_debut;
      }
      if (filterValues.etablissement?.trim()) {
        matchesEtablissement =
          this.getNameEtablissemnt(ordonnance.etablissement).toLowerCase() ==
          filterValues.etablissement.toLowerCase();
      }

      return matchesDateDebut || matchesDateFin || matchesEtablissement;
    });
    this.currentPage = 1;
  }

  get paginatedOrdonnances() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.filteredOrdonnances.slice(startIndex, endIndex); // Use filtered data
  }

  changePage(page: number) {
    this.currentPage = page;
  }

  get totalPages() {
    return Math.ceil(this.filteredOrdonnances.length / this.pageSize);
  }

  onResetFilter() {
    this.filteredOrdonnances = [...this.ordonnances];
    this.currentPage = 1; // Reset to first page
  }
  navigateOrd(id: number) {
    this.router.navigate([`ordannace//${id}`]);
  }
}

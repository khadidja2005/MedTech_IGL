import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { HeaderPDIComponent } from '../../components/header-pdi/header-pdi.component';
import { OrdonnancePharma } from '../../Pharmacie/pharmacie/pharmacie.component';
import { OrdonnanceCardComponent } from '../../Pharmacie/ordonnance-card/ordonnance-card.component';
import { Etab } from '../../Pharmacie/pharmacie/pharmacie.component';
import { ArchiveHeaderComponent } from '../archive-header/archive-header.component';
import axios from 'axios';
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
  selector: 'app-archive',
  imports: [
    SidebarComponent,
    HeaderPDIComponent,
    ArchiveHeaderComponent,
    OrdonnanceCardComponent,
    CommonModule,
  ],
  templateUrl: './archive.component.html',
  styleUrl: './archive.component.css',
})
export class ArchiveComponent {
  role = 'pharmacien';
  activeItem = 'Ordonnance';
  pharmacien = 1295; //locale storage
  etablissements: Etab[] = [];

  ordonnances: OrdonnancePharma[] = [];
  getNameEtablissemnt(id: number): string {
    return this.etablissements.find((e) => e.id === id)?.nom || 'Inconnu';
  }
  filteredOrdonnances: OrdonnancePharma[] = [...this.ordonnances];
  ngOnInit(): void {
    this.onPageLoad();
  }
  // Fonction exécutée au chargement
  async onPageLoad(): Promise<void> {
    try {
      const response = await axios.get<data>(
        'http://localhost:8000/pharmacie/archive',
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

      if (filterValues.date_debut) {
        matchesDateDebut = ordonnance.date_debut === filterValues.date_debut;
      }

      if (filterValues.date_fin) {
        matchesDateFin = ordonnance.date_debut === filterValues.date_fin;
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
}

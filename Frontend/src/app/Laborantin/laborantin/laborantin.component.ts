import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { HeaderPDIComponent } from '../../components/header-pdi/header-pdi.component';
import { LaboHeaderComponent } from '../labo-header/labo-header.component';
import { BilanBioCardComponent } from '../bilan-bio-card/bilan-bio-card.component';
import { Etab } from '../../Pharmacie/pharmacie/pharmacie.component';
import axios from 'axios';
export interface BilanLabo {
  id: number;
  date_debut: string;
  etablissement: number;
}
interface ord {
  id: number;
  date: string;
  etablissement_id: number;
  etablissement: string;
}
interface data {
  bilans: ord[];
}

@Component({
  selector: 'app-laborantin',
  imports: [
    SidebarComponent,
    HeaderPDIComponent,
    LaboHeaderComponent,
    CommonModule,
    BilanBioCardComponent,
  ],
  templateUrl: './laborantin.component.html',
  styleUrl: './laborantin.component.css',
})
export class LaborantinComponent {
  role = 'radiologue';
  activeItem = 'Bilans';
  laborantin = localStorage.getItem('id') || '';
  getNameEtablissemnt(id: number): string {
    return this.etablissements.find((e) => e.id === id)?.nom || 'Inconnu';
  }

  etablissements: Etab[] = [];

  bilans: BilanLabo[] = [];
  filteredBilans: BilanLabo[] = [...this.bilans]; // Holds the filtered results
  ngOnInit(): void {
    this.onPageLoad();
  }
  // Fonction exécutée au chargement
  async onPageLoad(): Promise<void> {
    try {
      const response = await axios.get<data>(
        'http://localhost:8000/laboratoire/home',
        {
          params: { laborantin: this.laborantin },
        }
      );
      console.log(response.data);
      for (const ord of response.data.bilans) {
        this.bilans.push({
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
      this.filteredBilans = [...this.bilans];
    } catch (error) {
      console.error('Error:', error);
    }
  }
  pageSize = 12; // Items per page
  currentPage = 1;
  onFilterApply(filterValues: any) {
    this.filteredBilans = this.bilans.filter((bilan) => {
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
        matchesDateDebut = bilan.date_debut === filterValues.date_debut;
      }

      if (filterValues.date_fin) {
        matchesDateFin = bilan.date_debut === filterValues.date_fin;
      }

      if (filterValues.etablissement?.trim()) {
        matchesEtablissement =
          this.getNameEtablissemnt(bilan.etablissement).toLowerCase() ==
          filterValues.etablissement.toLowerCase();
      }

      return matchesDateDebut || matchesDateFin || matchesEtablissement;
    });

    this.currentPage = 1;
  }

  get paginatedBilans() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.filteredBilans.slice(startIndex, endIndex); // Use filtered data
  }

  changePage(page: number) {
    this.currentPage = page;
  }

  get totalPages() {
    return Math.ceil(this.filteredBilans.length / this.pageSize);
  }
  onResetFilter() {
    this.filteredBilans = [...this.bilans];
    this.currentPage = 1; // Reset to first page
  }
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { BilanBioCardComponent } from '../../Laborantin/bilan-bio-card/bilan-bio-card.component';
import { HeaderPDIComponent } from '../../components/header-pdi/header-pdi.component';
import { ArchiveHeaderComponent } from '../archive-header/archive-header.component';
import { Etab } from '../../Pharmacie/pharmacie/pharmacie.component';
import { BilanLabo } from '../../Laborantin/laborantin/laborantin.component';
import axios from 'axios';
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
  selector: 'app-archive',
  imports: [
    SidebarComponent,
    CommonModule,
    BilanBioCardComponent,
    HeaderPDIComponent,
    ArchiveHeaderComponent,
  ],
  templateUrl: './archive.component.html',
  styleUrl: './archive.component.css',
})
export class ArchiveComponent {
  role = 'radiologue';
  activeItem = 'Bilans';

  getNameEtablissemnt(id: number): string {
    return this.etablissements.find((e) => e.id === id)?.nom || 'Inconnu';
  }
  laborantin = localStorage.getItem('id') || '';
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
        'http://localhost:8000/laboratoire/archive',
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

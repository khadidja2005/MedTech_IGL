import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { HeaderPDIComponent } from '../../components/header-pdi/header-pdi.component';
import { LaboHeaderComponent } from '../labo-header/labo-header.component';
import { BilanBio } from '../../../types/bilanbio';
import { BilanBioCardComponent } from '../bilan-bio-card/bilan-bio-card.component';

@Component({
  selector: 'app-laborantin',
  imports: [SidebarComponent, HeaderPDIComponent, LaboHeaderComponent,CommonModule, BilanBioCardComponent],
  templateUrl: './laborantin.component.html',
  styleUrl: './laborantin.component.css'
})
export class LaborantinComponent {
  role='laborantin';
  activeItem='Bilans';
  bilans : BilanBio[]= [
    {
      id: '1',
    date_debut: '01/12/2024',
    date_fin: '25/12/2024',
    parametres: '',
    est_complet: false,
    est_resultat: false,
    medecin: '',
    Consultation:  null,
    etablissement: 'CHU'
    },
    {
      id: '1',
    date_debut: '02/12/2024',
    date_fin: '25/12/2024',
    parametres: '',
    est_complet: false,
    est_resultat: false,
    medecin: '',
    Consultation:  null,
    etablissement: 'CHU'
    },
    {
      id: '1',
    date_debut: '03/12/2024',
    date_fin: '25/12/2024',
    parametres: '',
    est_complet: false,
    est_resultat: false,
    medecin: '',
    Consultation:  null,
    etablissement: 'CHU'
    },
    {
      id: '1',
    date_debut: '04/12/2024',
    date_fin: '25/12/2024',
    parametres: '',
    est_complet: false,
    est_resultat: false,
    medecin: '',
    Consultation:  null,
    etablissement: 'CHU'
    },
    {
      id: '1',
    date_debut: '05/12/2024',
    date_fin: '25/12/2024',
    parametres: '',
    est_complet: false,
    est_resultat: false,
    medecin: '',
    Consultation:  null,
    etablissement: 'CHU'
    },
    {
      id: '1',
    date_debut: '06/12/2024',
    date_fin: '25/12/2024',
    parametres: '',
    est_complet: false,
    est_resultat: false,
    medecin: '',
    Consultation:  null,
    etablissement: 'CHU'
    },
    {
      id: '1',
    date_debut: '07/12/2024',
    date_fin: '25/12/2024',
    parametres: '',
    est_complet: false,
    est_resultat: false,
    medecin: '',
    Consultation:  null,
    etablissement: 'CHU'
    },
    {
      id: '1',
    date_debut: '08/12/2024',
    date_fin: '25/12/2024',
    parametres: '',
    est_complet: false,
    est_resultat: false,
    medecin: '',
    Consultation:  null,
    etablissement: 'CHU'
    },
    {
      id: '1',
    date_debut: '09/12/2024',
    date_fin: '25/12/2024',
    parametres: '',
    est_complet: false,
    est_resultat: false,
    medecin: '',
    Consultation:  null,
    etablissement: 'CHU'
    },
    {
      id: '1',
    date_debut: '10/12/2024',
    date_fin: '25/12/2024',
    parametres: '',
    est_complet: false,
    est_resultat: false,
    medecin: '',
    Consultation:  null,
    etablissement: 'CHU'
    },
    {
      id: '1',
    date_debut: '11/12/2024',
    date_fin: '25/12/2024',
    parametres: '',
    est_complet: false,
    est_resultat: false,
    medecin: '',
    Consultation:  null,
    etablissement: 'CHU'
    },
    {
      id: '1',
    date_debut: '12/12/2024',
    date_fin: '25/12/2024',
    parametres: '',
    est_complet: false,
    est_resultat: false,
    medecin: '',
    Consultation:  null,
    etablissement: 'CHU'
    },
    {
      id: '1',
    date_debut: '08/12/2024',
    date_fin: '25/12/2024',
    parametres: '',
    est_complet: false,
    est_resultat: false,
    medecin: '',
    Consultation:  null,
    etablissement: 'CHU'
    },
    {
      id: '1',
    date_debut: '09/12/2024',
    date_fin: '25/12/2024',
    parametres: '',
    est_complet: false,
    est_resultat: false,
    medecin: '',
    Consultation:  null,
    etablissement: 'CHU'
    },
    {
      id: '1',
    date_debut: '10/12/2024',
    date_fin: '25/12/2024',
    parametres: '',
    est_complet: false,
    est_resultat: false,
    medecin: '',
    Consultation:  null,
    etablissement: 'CHU'
    },
    {
      id: '1',
    date_debut: '11/12/2024',
    date_fin: '25/12/2024',
    parametres: '',
    est_complet: false,
    est_resultat: false,
    medecin: '',
    Consultation:  null,
    etablissement: 'CHU'
    },
    {
      id: '1',
    date_debut: '12/12/2024',
    date_fin: '25/12/2024',
    parametres: '',
    est_complet: false,
    est_resultat: false,
    medecin: '',
    Consultation:  null,
    etablissement: 'CHU'
    }
  ];
  filteredBilans: BilanBio[] = [...this.bilans]; // Holds the filtered results

    pageSize = 12; // Items per page
    currentPage = 1;
    onFilterApply(filterValues: any) {
      this.filteredBilans = this.bilans.filter(bilan => {
        let matchesDateDebut = false;
        let matchesDateFin = false;
        let matchesEtablissement = false;

        // If no filters are applied, show all
        if (!filterValues.date_debut && !filterValues.date_fin && !filterValues.etablissement) {
          return true;
        }

        if (filterValues.date_debut) {
          matchesDateDebut = bilan.date_debut === filterValues.date_debut;
        }

        if (filterValues.date_fin) {
          matchesDateFin = bilan.date_fin === filterValues.date_fin;
        }

        if (filterValues.etablissement?.trim()) {
          matchesEtablissement = bilan.etablissement
            .toLowerCase()
            .includes(filterValues.etablissement.toLowerCase().trim());
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

}

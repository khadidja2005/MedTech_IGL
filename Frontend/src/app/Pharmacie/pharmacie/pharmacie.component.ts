import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { HeaderPDIComponent } from '../../components/header-pdi/header-pdi.component';
import { PharmaHeaderComponent } from '../pharma-header/pharma-header.component';
import { OrdonnanceCardComponent } from "../ordonnance-card/ordonnance-card.component";

export interface OrdonnancePharma {
  date_debut: string;
  date_fin: string;
  etablissement : number;

}
export interface Etab {
  nom : string;
  id : number;
}


@Component({
  selector: 'app-pharmacie',
  imports: [SidebarComponent, HeaderPDIComponent, PharmaHeaderComponent, OrdonnanceCardComponent,CommonModule],
  templateUrl: './pharmacie.component.html',
  styleUrl: './pharmacie.component.css'
})
export class PharmacieComponent {

  role = 'pharmacien';
  activeItem='Ordonnance'

  getNameEtablissemnt(id : number) : string {
    return this.etablissements.find(e => e.id === id)?.nom || 'Inconnu';
  }

  etablissements : Etab[] = [
    {
      nom : 'Etablissement 1',
      id : 1
    },
    {
      nom : 'Etablissement 2',
      id : 2
    },
    {
      nom : 'Etablissement 3',
      id : 3
    },
    {
      nom : 'Etablissement 4',
      id : 4
    },
    {
      nom : 'Etablissement 5',
      id : 5
    },
    {
      nom : 'Etablissement 6',
      id : 6
    },
    {
      nom : 'Etablissement 7',
      id : 7
    }
  ];

  ordonnances : OrdonnancePharma[] = [
    {
      date_debut : '01/12/2024',
      date_fin : '25/12/2024',
      etablissement : 1,
    },
    {
      date_debut : '02/12/2024',
      date_fin : '25/12/2024',
      etablissement : 2,
    },
    {
      date_debut : '03/12/2024',
      date_fin : '25/12/2024',
      etablissement : 1,
    },
    {
      date_debut : '04/12/2024',
      date_fin : '25/12/2024',
      etablissement : 2,
    },
    {
      date_debut : '05/12/2024',
      date_fin : '25/12/2024',
      etablissement : 3,
    },
    {
      date_debut : '06/12/2024',
      date_fin : '25/12/2024',
      etablissement : 3,
    },
    {
      date_debut : '07/12/2024',
      date_fin : '25/12/2024',
      etablissement : 3,
    },
    {
      date_debut : '08/12/2024',
      date_fin : '25/12/2024',
      etablissement : 4,
    },
    {
      date_debut: '09/12/2024',
      date_fin: '25/12/2024',
      etablissement : 5,
    },
    {
      date_debut: '10/12/2024',
      date_fin: '25/12/2024',
      etablissement : 1,
    },
    {
      date_debut: '11/12/2024',
      date_fin: '25/12/2024',
      etablissement : 6,
    },
    {
      date_debut: '12/12/2024',
      date_fin: '25/12/2024',
      etablissement : 7,
    },
    {
      date_debut: '13/12/2024',
      date_fin: '25/12/2024',
      etablissement : 7
    },
    {
      date_debut: '14/12/2024',
      date_fin: '24/12/2024',
      etablissement : 6
    },
    {
      date_debut: '15/12/2024',
      date_fin: '25/12/2024',
      etablissement : 5
    },
    {
      date_debut: '16/12/2024',
      date_fin: '25/12/2024',
      etablissement : 4
    },
  ];

  filteredOrdonnances: OrdonnancePharma[] = [...this.ordonnances]; // Holds the filtered results

  pageSize = 12; // Items per page
  currentPage = 1;

  onFilterApply(filterValues: any) {
    this.filteredOrdonnances = this.ordonnances.filter(ordonnance => {
      let matchesDateDebut = false;
      let matchesDateFin = false;
      let matchesEtablissement = false;

      // If no filters are applied, show all
      if (!filterValues.date_debut && !filterValues.date_fin && !filterValues.etablissement) {
        return true;
      }

      if (filterValues.date_debut) {
        matchesDateDebut = ordonnance.date_debut === filterValues.date_debut;
      }

      if (filterValues.date_fin) {
        matchesDateFin = ordonnance.date_fin === filterValues.date_fin;
      }

      if (filterValues.etablissement?.trim()) {
        matchesEtablissement = this.getNameEtablissemnt(ordonnance.etablissement).toLowerCase()==filterValues.etablissement.toLowerCase();
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
    this.currentPage = 1;  // Reset to first page

  }

}

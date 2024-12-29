import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { HeaderPDIComponent } from '../../components/header-pdi/header-pdi.component';
import { Ordonnance } from '../../../types/ordonance';
import { OrdonnanceCardComponent } from "../../Pharmacie/ordonnance-card/ordonnance-card.component";
import { ArchiveHeaderComponent } from '../archive-header/archive-header.component';

@Component({
  selector: 'app-archive',
  imports: [SidebarComponent, HeaderPDIComponent, ArchiveHeaderComponent, OrdonnanceCardComponent,CommonModule],
  templateUrl: './archive.component.html',
  styleUrl: './archive.component.css'
})
export class ArchiveComponent {
   role = 'pharmacien';
    activeItem='Ordonnance'

    ordonnances : Ordonnance[] = [
      {
        id: '1',
        date_debut: '01/12/2024',
        date_fin: '25/12/2024',
        estValide: false,
        consultation: '1',
        pharmacien_id: 'Khelifati Amine',
        patient_id: 'Khelifati Amine',
        medecin_id: 'Khelifati Amine',
        termine : false,
        etablissement : 'EHS'
      },
      {
        id: '1',
        date_debut: '02/12/2024',
        date_fin: '25/12/2024',
        estValide: false,
        consultation: '1',
        pharmacien_id: 'Khelifati Amine',
        patient_id: 'Khelifati Amine',
        medecin_id: 'Khelifati Amine',
        termine : false,
        etablissement : 'EHS'
      },
      {
        id: '1',
        date_debut: '03/12/2024',
        date_fin: '25/12/2024',
        estValide: false,
        consultation: '1',
        pharmacien_id: 'Khelifati Amine',
        patient_id: 'Khelifati Amine',
        medecin_id: 'Khelifati Amine',
        termine : false,
        etablissement : 'EHS'
      },
      {
        id: '1',
        date_debut: '04/12/2024',
        date_fin: '25/12/2024',
        estValide: false,
        consultation: '1',
        pharmacien_id: 'Khelifati Amine',
        patient_id: 'Khelifati Amine',
        medecin_id: 'Khelifati Amine',
        termine : false,
        etablissement : 'EHS'
      },
      {
        id: '1',
        date_debut: '05/12/2024',
        date_fin: '25/12/2024',
        estValide: false,
        consultation: '1',
        pharmacien_id: 'Khelifati Amine',
        patient_id: 'Khelifati Amine',
        medecin_id: 'Khelifati Amine',
        termine : false,
        etablissement : 'EHS'
      },
      {
        id: '1',
        date_debut: '06/12/2024',
        date_fin: '25/12/2024',
        estValide: false,
        consultation: '1',
        pharmacien_id: 'Khelifati Amine',
        patient_id: 'Khelifati Amine',
        medecin_id: 'Khelifati Amine',
        termine : false,
        etablissement : 'EHS'
      },
      {
        id: '1',
        date_debut: '07/12/2024',
        date_fin: '25/12/2024',
        estValide: false,
        consultation: '1',
        pharmacien_id: 'Khelifati Amine',
        patient_id: 'Khelifati Amine',
        medecin_id: 'Khelifati Amine',
        termine : false,
        etablissement : 'EHS'
      },
      {
        id: '1',
        date_debut: '08/12/2024',
        date_fin: '25/12/2024',
        estValide: false,
        consultation: '1',
        pharmacien_id: 'Khelifati Amine',
        patient_id: 'Khelifati Amine',
        medecin_id: 'Khelifati Amine',
        termine : false,
        etablissement : 'EHS'
      },
      {
        id: '1',
        date_debut: '09/12/2024',
        date_fin: '25/12/2024',
        estValide: false,
        consultation: '1',
        pharmacien_id: 'Khelifati Amine',
        patient_id: 'Khelifati Amine',
        medecin_id: 'Khelifati Amine',
        termine : false,
        etablissement : 'EHS'
      },
      {
        id: '1',
        date_debut: '10/12/2024',
        date_fin: '25/12/2024',
        estValide: false,
        consultation: '1',
        pharmacien_id: 'Khelifati Amine',
        patient_id: 'Khelifati Amine',
        medecin_id: 'Khelifati Amine',
        termine : false,
        etablissement : 'EHS'
      },
      {
        id: '1',
        date_debut: '11/12/2024',
        date_fin: '25/12/2024',
        estValide: false,
        consultation: '1',
        pharmacien_id: 'Khelifati Amine',
        patient_id: 'Khelifati Amine',
        medecin_id: 'Khelifati Amine',
        termine : false,
        etablissement : 'EHS'
      },
      {
        id: '1',
        date_debut: '12/12/2024',
        date_fin: '25/12/2024',
        estValide: false,
        consultation: '1',
        pharmacien_id: 'Khelifati Amine',
        patient_id: 'Khelifati Amine',
        medecin_id: 'Khelifati Amine',
        termine : false,
        etablissement : 'EHS'
      },
      {
        id: '1',
        date_debut: '13/12/2024',
        date_fin: '25/12/2024',
        estValide: false,
        consultation: '1',
        pharmacien_id: 'Khelifati Amine',
        patient_id: 'Khelifati Amine',
        medecin_id: 'Khelifati Amine',
        termine : false,
        etablissement : 'EHS'
      },
      {
        id: '1',
        date_debut: '14/12/2024',
        date_fin: '24/12/2024',
        estValide: false,
        consultation: '1',
        pharmacien_id: 'Khelifati Amine',
        patient_id: 'Khelifati Amine',
        medecin_id: 'Khelifati Amine',
        termine : false,
        etablissement : 'EHS'
      },
      {
        id: '1',
        date_debut: '15/12/2024',
        date_fin: '25/12/2024',
        estValide: false,
        consultation: '1',
        pharmacien_id: 'Khelifati Amine',
        patient_id: 'Khelifati Amine',
        medecin_id: 'Khelifati Amine',
        termine : false,
        etablissement : 'EHS'
      },
      {
        id: '1',
        date_debut: '16/12/2024',
        date_fin: '25/12/2024',
        estValide: false,
        consultation: '1',
        pharmacien_id: 'Khelifati Amine',
        patient_id: 'Khelifati Amine',
        medecin_id: 'Khelifati Amine',
        termine : false,
        etablissement : 'EHS'
      },
    ];

    filteredOrdonnances: Ordonnance[] = [...this.ordonnances]; // Holds the filtered results

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
          matchesEtablissement = ordonnance.etablissement
            .toLowerCase()
            .includes(filterValues.etablissement.toLowerCase().trim());
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

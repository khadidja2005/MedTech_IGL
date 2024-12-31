import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BilanBio } from '../../../types/bilanbio';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { BilanBioCardComponent } from '../../Laborantin/bilan-bio-card/bilan-bio-card.component';
import { HeaderPDIComponent } from '../../components/header-pdi/header-pdi.component';
import { ArchiveHeaderComponent } from '../archive-header/archive-header.component';
import { Etab } from '../../Pharmacie/pharmacie/pharmacie.component';
import { BilanLabo } from '../../Laborantin/laborantin/laborantin.component';
@Component({
  selector: 'app-archive',
  imports: [SidebarComponent,CommonModule, BilanBioCardComponent, HeaderPDIComponent, ArchiveHeaderComponent],
  templateUrl: './archive.component.html',
  styleUrl: './archive.component.css'
})
export class ArchiveComponent {
  role='radiologue';
      activeItem='Bilans';

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

      bilans: BilanLabo[] = [
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
      filteredBilans: BilanLabo[] = [...this.bilans]; // Holds the filtered results

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
                matchesEtablissement = this.getNameEtablissemnt(bilan.etablissement).toLowerCase()==filterValues.etablissement.toLowerCase();

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
            this.currentPage = 1;  // Reset to first page

          }

}

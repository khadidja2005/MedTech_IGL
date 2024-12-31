import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RechHeaderComponent } from "../rech-header/rech-header.component";
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { HeaderPDIComponent } from '../../components/header-pdi/header-pdi.component';
import { Etab } from '../../Pharmacie/pharmacie/pharmacie.component';
import { PatientCardComponent } from "../patient-card/patient-card.component";

export interface DpiCards {
  nss : string;
  etablissement : number;
};

@Component({
  selector: 'app-recherche',
  imports: [RechHeaderComponent, SidebarComponent, HeaderPDIComponent, PatientCardComponent, CommonModule],
  templateUrl: './recherche.component.html',
  styleUrl: './recherche.component.css'
})
export class RechercheComponent {
  role = 'medecin';
  activeItem = 'DPI';
  dpis : DpiCards[] = [
    {nss: '123456789', etablissement: 1},
    {nss: '987654321', etablissement: 2},
    {nss: '123123123', etablissement: 3},
    {nss: '987987987', etablissement: 1},
    {nss: '123456666', etablissement: 2},
    {nss: '777777777', etablissement: 3},
    {nss: '575757575', etablissement: 1},
    {nss: '989898989', etablissement: 2},
    {nss: '121212121', etablissement: 3},
    {nss: '363636363', etablissement: 1},
  ];
  etablissements : Etab[] = [
    {id: 1, nom: 'Etablissement 1'},
    {id: 2, nom: 'Etablissement 2'},
    {id: 3, nom: 'Etablissement 3'},
  ];
  pageSize = 6; // Items per page
  currentPage = 1;
  get paginatedDpis() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.dpis.slice(startIndex, endIndex); // Use filtered data
  }

  changePage(page: number) {
    this.currentPage = page;
  }

  get totalPages() {
    return Math.ceil(this.dpis.length / this.pageSize);
  }

}

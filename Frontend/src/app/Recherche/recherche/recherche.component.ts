import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RechHeaderComponent } from '../rech-header/rech-header.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { HeaderPDIComponent } from '../../components/header-pdi/header-pdi.component';
import { Etab } from '../../Pharmacie/pharmacie/pharmacie.component';
import { PatientCardComponent } from '../patient-card/patient-card.component';
import axios from 'axios';
import { Router } from '@angular/router';
export interface DpiCards {
  id: number;
  nom_complet: string;
  nss: string;
  etablissement: number;
}

@Component({
  selector: 'app-recherche',
  imports: [
    RechHeaderComponent,
    SidebarComponent,
    HeaderPDIComponent,
    PatientCardComponent,
    CommonModule,
  ],
  templateUrl: './recherche.component.html',
  styleUrl: './recherche.component.css',
})
export class RechercheComponent {
  role = localStorage.getItem('role')?.toLowerCase() || '';
  activeItem = 'DPI';
  id = localStorage.getItem('id') || '';
  dpis: DpiCards[] = [];
  etablissements: Etab[] = [];
  constructor(private router: Router) {}
  load = false;
  ngOnInit(): void {
    this.onPageLoad();
  }
  // Fonction exécutée au chargement
  async onPageLoad(): Promise<void> {
    this.load = true;
    console.log('Fetching DPIs for personnel ID:', this.id);
    try {
      const response = await axios.get<{ all_dpis: DpiCards[] }>(
        'http://localhost:8000/recherche/DPIS',
        {
          params: { personnel_id: this.id },
        }
      );
      this.dpis = response.data.all_dpis;
    } catch (error) {
      console.error('Error:', error);
    }
    try {
      const response = await axios.get<{ all_etablissements: Etab[] }>(
        'http://localhost:8000/recherche/get-etablissements',
        {
          params: { personnel_id: this.id },
        }
      );
      this.etablissements = response.data.all_etablissements;
    } catch (error) {
      console.error('Error:', error);
    }
    this.load = false;
  }

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
  onDpisChange(updatedDpis: DpiCards[]) {
    // Update the parent's version of the array
    this.dpis = updatedDpis;
  }
  navigateDPI(id: number) {
    this.router.navigate([`dpi/${id}`]);
  }
}

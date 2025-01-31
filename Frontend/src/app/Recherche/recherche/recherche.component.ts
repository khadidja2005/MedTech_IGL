import { CommonModule } from '@angular/common';
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
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
export class RechercheComponent implements OnInit {
  role = '';
  activeItem = 'DPI';
  id = '';
  dpis: DpiCards[] = [];
  etablissements: Etab[] = [];
  load = false;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    // Check if running in browser
    if (this.isPlatformBrowser()) {
      this.initializeLocalStorageValues();
    }
    
    this.onPageLoad();
  }

  // Helper method to check if running in browser
  private isPlatformBrowser(): boolean {
    return typeof window !== 'undefined' && typeof document !== 'undefined';
  }

  private initializeLocalStorageValues(): void {
    try {
      // Safely access localStorage
      this.role = localStorage.getItem('role')?.toLowerCase() || '';
      this.id = localStorage.getItem('id') || '';
      
      console.log('Initialized from localStorage:', {
        role: this.role,
        id: this.id
      });
    } catch (error) {
      console.error('Error accessing localStorage:', error);
    }
  }

  async onPageLoad(): Promise<void> {
    this.load = true;
    
    // Check if running in browser before accessing localStorage
    if (this.isPlatformBrowser()) {
      // Re-check ID from localStorage
      this.id = localStorage.getItem('id') || '';
    }

    console.log('Current ID before fetch:', this.id);

    // Extra validation before making requests
    if (!this.id) {
      console.error('No ID available for fetching data');
      this.load = false;
      return;
    }

    try {
      const response = await axios.get<{ all_dpis: DpiCards[] }>(
        'http://localhost:8000/recherche/DPIS',
        {
          params: { personnel_id: this.id },
        }
      );
      this.dpis = response.data.all_dpis;
      console.log('Fetched DPIs:', this.dpis);
    } catch (error) {
      console.error('Error fetching DPIs:', error);
    }

    try {
      const response = await axios.get<{ all_etablissements: Etab[] }>(
        'http://localhost:8000/recherche/get-etablissements',
        {
          params: { personnel_id: this.id },
        }
      );
      this.etablissements = response.data.all_etablissements;
      console.log('Fetched Etablissements:', this.etablissements);
    } catch (error) {
      console.error('Error fetching Etablissements:', error);
    }

    this.load = false;
  }

  pageSize = 6; // Items per page
  currentPage = 1;

  get paginatedDpis() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.dpis.slice(startIndex, endIndex);
  }

  changePage(page: number) {
    this.currentPage = page;
  }

  get totalPages() {
    return Math.ceil(this.dpis.length / this.pageSize);
  }

  onDpisChange(updatedDpis: DpiCards[]) {
    this.dpis = updatedDpis;
  }

  navigateDPI(id: number) {
    this.router.navigate([`dpi/${id}`]);
  }
}
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Etablissement } from '../../../types/etablissement';


export type TypeRadio = 'RADIO' | 'SCANNER' | 'IRM';

export interface BilanRadio {
  id: number;
  date_debut: string; // ISO date string
  date_fin: string; // ISO date string
  type_radio: TypeRadio;
  est_complet: boolean;
  est_resultat: boolean;
  description: string;
  Consultation: string; // Foreign key to Consultation, nullable
  resultat_id: number | null;
  etablissement: number;
  medecin:string;
  patient:string;

}
export interface ResultatRadio {
  id: number;
  description: string;
  piece_jointe: string;
  date: string; // ISO date string
  compte_rendu: string;
  radiologue_compte_rendu: number | null; // Foreign key to PersonnelMedical
  radiologue: number | null; // Foreign key to PersonnelMedical
}


@Component({
  selector: 'app-bilan-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './bilan-list.component.html',
  styleUrl: './bilan-list.component.css'
})
export class BilanListComponent {

  currentPage: number = 1;
  bioPerPage: number = 12;

  bilanRadio: BilanRadio[] = [
     {
       id: 0,
       date_debut: '2024-01-15',
       date_fin: '2024-01-16',
       type_radio: 'IRM',
       est_complet: true,
       est_resultat: true,
       description: 'IRM cérébrale standard',
       medecin: 'Dr. Amine Bensalem',
       Consultation: 'CONS001',
       resultat_id: 0,
       etablissement: 1,
       patient: ''
     },
     {
       id: 0,
       date_debut: '2024-02-01',
       date_fin: '2024-02-01',
       type_radio: 'SCANNER',
       est_complet: false,
       est_resultat: false,
       description: 'Scanner thoracique',
       medecin: 'Dr. Leila Hamdi',
       Consultation: 'CONS002',
       resultat_id: 0,
       etablissement: 2,
       patient: ''
     },
     {
       id: 0,
       date_debut: '2024-01-15',
       date_fin: '2024-01-16',
       type_radio: 'IRM',
       est_complet: true,
       est_resultat: true,
       description: 'IRM cérébrale standard',
       medecin: 'Dr. Amine Bensalem',
       Consultation: 'CONS001',
       resultat_id: 0,
       etablissement: 3,
       patient: ''
     },
    {
      id: 0,
      date_debut: '2024-02-01',
      date_fin: '2024-02-01',
      type_radio: 'SCANNER',
      est_complet: false,
      est_resultat: false,
      description: 'Scanner thoracique',
      medecin: 'Dr. Leila Hamdi',
      Consultation: 'CONS002',
      resultat_id: 0,
      etablissement: 4,
      patient: ''
    },
    {
      id: 0,
      date_debut: '2024-01-15',
      date_fin: '2024-01-16',
      type_radio: 'IRM',
      est_complet: true,
      est_resultat: true,
      description: 'IRM cérébrale standard',
      medecin: 'Dr. Amine Bensalem',
      Consultation: 'CONS001',
      resultat_id: 0,
      etablissement: 5,
      patient: ''
    },
    {
      id: 0,
      date_debut: '2024-02-01',
      date_fin: '2024-02-01',
      type_radio: 'SCANNER',
      est_complet: false,
      est_resultat: false,
      description: 'Scanner thoracique',
      medecin: 'Dr. Leila Hamdi',
      Consultation: 'CONS002',
      resultat_id: 0,
      etablissement: 6,
      patient: ''
    },
    {
      id: 0,
      date_debut: '2024-01-15',
      date_fin: '2024-01-16',
      type_radio: 'IRM',
      est_complet: true,
      est_resultat: true,
      description: 'IRM cérébrale standard',
      medecin: 'Dr. Amine Bensalem',
      Consultation: 'CONS001',
      resultat_id: 0,
      etablissement:7,
      patient: ''
    },
    {
      id: 0,
      date_debut: '2024-01-15',
      date_fin: '2024-01-16',
      type_radio: 'IRM',
      est_complet: true,
      est_resultat: true,
      description: 'IRM cérébrale standard',
      medecin: 'Dr. Amine Bensalem',
      Consultation: 'CONS001',
      resultat_id: 0,
      etablissement: 8,
      patient: ''
    },
    {
      id: 0,
      date_debut: '2024-01-15',
      date_fin: '2024-01-16',
      type_radio: 'IRM',
      est_complet: true,
      est_resultat: true,
      description: 'IRM cérébrale standard',
      medecin: 'Dr. Amine Bensalem',
      Consultation: 'CONS001',
      resultat_id: 0,
      etablissement: 9,
      patient: ''
    },
    {
      id: 0,
      date_debut: '2024-01-15',
      date_fin: '2024-01-16',
      type_radio: 'IRM',
      est_complet: true,
      est_resultat: true,
      description: 'IRM cérébrale standard',
      medecin: 'Dr. Amine Bensalem',
      Consultation: 'CONS001',
      resultat_id: 0,
      etablissement:1,
      patient: ''
    }
   ];
     
       get pageCount(): number {
         return Math.ceil(this.filteredBilans.length / this.bioPerPage);
       }

       openModal(): void {
        this.showModal = true;
      }
    
      closeModal(): void {
        this.showModal = false;
      }
      setPage(page: number): void {
        this.currentPage = page;
      }
    
      getPageArray(): number[] {
        return Array.from({ length: this.pageCount }, (_, i) => i + 1);
      }
       etablissements: Etablissement[] = [
          {
            id: 0,
            nom_etablissement: 'Etablissement 1',
            adresse: '8 W. South St.Buford, GA 30518',
            telephone: 123456789,
            email: 'email@gmail.com',
            type: 'HOPITAL',
      
          }
          
        ];

        showEtablissementDropdown = false;

        filteredBilans: BilanRadio[] = []; 
      
   
        searchTerm: string = '';
        showModal: boolean = false;
        showFilterModal = false;
        
      
        filterCriteria = {
          etablissement: 0,
          dateStart: '',
          dateEnd: ''
        };
      
        filter = {
          number: 0
        };
      
        // Keep your existing bilanRadio array...
      
        ngOnInit() {
          this.filteredBilans = [...this.bilanRadio];
          console.log('Initial bilans:', this.filteredBilans); // Debug log
        }
      
        get uniqueEtablissements(): number[] {
          const establishments = [...new Set(this.bilanRadio.map(bilan => bilan.etablissement))];
          console.log('Available establishments:', establishments); // Debug log
          return establishments;
        }
      
        applyFilters() {
        
      
          this.filteredBilans = this.bilanRadio.filter(bilan => {
            
            // Establishment filter
            if (this.filterCriteria.etablissement && 
                bilan.etablissement !== this.filterCriteria.etablissement) {
              return false;
            }
      
            // Date filter
            if (this.filterCriteria.dateStart) {
              const bilanDate = new Date(bilan.date_debut);
              const filterDate = new Date(this.filterCriteria.dateStart);
              
              if (bilanDate < filterDate || bilanDate > filterDate ) {
                return false;
              }
            }
      
            if (this.filterCriteria.dateEnd) {
              const bilanDate = new Date(bilan.date_debut);
              const filterDate = new Date(this.filterCriteria.dateEnd);
      
    
              if (bilanDate > filterDate || bilanDate > filterDate ) {
                return false;
              }
            }
      
            return true;
          });
      
          // Count active filters
          this.filter.number = Object.values(this.filterCriteria)
            .filter(value => value !== '').length;
          
          this.currentPage = 1;
          this.showFilterModal = false;
        }
      
        selectEtablissement(etab: number) {
          this.filterCriteria.etablissement = etab;
          this.showEtablissementDropdown = false;
        }
      
        clearFilters() {
          console.log('Clearing filters'); // Debug log
          this.filterCriteria = {
            etablissement: 0,
            dateStart: '',
            dateEnd: ''
          };
          this.filteredBilans = [...this.bilanRadio];
          this.filter.number = 0;
          this.currentPage = 1;
        }
      
        toggleFilterModal() {
          this.showFilterModal = !this.showFilterModal;
          if (!this.showFilterModal) {
            this.showEtablissementDropdown = false;
          }
        }
      
        toggleEtablissementDropdown() {
          this.showEtablissementDropdown = !this.showEtablissementDropdown;
        }
      
        get currentbio(): BilanRadio[] {
          const indexOfLastbio = this.currentPage * this.bioPerPage;
          const indexOfFirstbio = indexOfLastbio - this.bioPerPage;
          return this.filteredBilans.slice(indexOfFirstbio, indexOfLastbio);
        }
      }

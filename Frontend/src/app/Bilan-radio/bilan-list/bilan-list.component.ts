import { Component } from '@angular/core';
import { BilanRadio } from '../../../types/bilanRadio';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Etablissement } from '../../../types/etablissement';

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
       id: '1',
       date_debut: '2024-01-15',
       date_fin: '2024-01-16',
       type_radio: 'IRM',
       est_complet: true,
       est_resultat: true,
       description: 'IRM cérébrale standard',
       medecin: 'Dr. Amine Bensalem',
       Consultation: 'CONS001',
       resultat_id: 'RES001',
       etablissement: 'etablissement',
       patient: ''
     },
     {
       id: '2',
       date_debut: '2024-02-01',
       date_fin: '2024-02-01',
       type_radio: 'SCANNER',
       est_complet: false,
       est_resultat: false,
       description: 'Scanner thoracique',
       medecin: 'Dr. Leila Hamdi',
       Consultation: 'CONS002',
       resultat_id: 'RES002',
       etablissement: 'etablissement2',
       patient: ''
     },
     {
       id: '3',
       date_debut: '2024-01-15',
       date_fin: '2024-01-16',
       type_radio: 'IRM',
       est_complet: true,
       est_resultat: true,
       description: 'IRM cérébrale standard',
       medecin: 'Dr. Amine Bensalem',
       Consultation: 'CONS001',
       resultat_id: 'RES001',
       etablissement: 'etablissement3',
       patient: ''
     },
    {
      id: '4',
      date_debut: '2024-02-01',
      date_fin: '2024-02-01',
      type_radio: 'SCANNER',
      est_complet: false,
      est_resultat: false,
      description: 'Scanner thoracique',
      medecin: 'Dr. Leila Hamdi',
      Consultation: 'CONS002',
      resultat_id: 'RES002',
      etablissement: 'etablissement4',
      patient: ''
    },
    {
      id: '5',
      date_debut: '2024-01-15',
      date_fin: '2024-01-16',
      type_radio: 'IRM',
      est_complet: true,
      est_resultat: true,
      description: 'IRM cérébrale standard',
      medecin: 'Dr. Amine Bensalem',
      Consultation: 'CONS001',
      resultat_id: 'RES001',
      etablissement: 'etablissement5',
      patient: ''
    },
    {
      id: '6',
      date_debut: '2024-02-01',
      date_fin: '2024-02-01',
      type_radio: 'SCANNER',
      est_complet: false,
      est_resultat: false,
      description: 'Scanner thoracique',
      medecin: 'Dr. Leila Hamdi',
      Consultation: 'CONS002',
      resultat_id: 'RES002',
      etablissement: 'etablissement',
      patient: ''
    },
    {
      id: '7',
      date_debut: '2024-01-15',
      date_fin: '2024-01-16',
      type_radio: 'IRM',
      est_complet: true,
      est_resultat: true,
      description: 'IRM cérébrale standard',
      medecin: 'Dr. Amine Bensalem',
      Consultation: 'CONS001',
      resultat_id: 'RES001',
      etablissement: 'etablissement',
      patient: ''
    },
    {
      id: '8',
      date_debut: '2024-01-15',
      date_fin: '2024-01-16',
      type_radio: 'IRM',
      est_complet: true,
      est_resultat: true,
      description: 'IRM cérébrale standard',
      medecin: 'Dr. Amine Bensalem',
      Consultation: 'CONS001',
      resultat_id: 'RES001',
      etablissement: 'etablissement2',
      patient: ''
    },
    {
      id: '9',
      date_debut: '2024-01-15',
      date_fin: '2024-01-16',
      type_radio: 'IRM',
      est_complet: true,
      est_resultat: true,
      description: 'IRM cérébrale standard',
      medecin: 'Dr. Amine Bensalem',
      Consultation: 'CONS001',
      resultat_id: 'RES001',
      etablissement: 'etablissement6',
      patient: ''
    },
    {
      id: '10',
      date_debut: '2024-01-15',
      date_fin: '2024-01-16',
      type_radio: 'IRM',
      est_complet: true,
      est_resultat: true,
      description: 'IRM cérébrale standard',
      medecin: 'Dr. Amine Bensalem',
      Consultation: 'CONS001',
      resultat_id: 'RES001',
      etablissement: 'etablissement5',
      patient: ''
    },
    {
      id: '11',
      date_debut: '2024-01-15',
      date_fin: '2024-01-16',
      type_radio: 'IRM',
      est_complet: true,
      est_resultat: true,
      description: 'IRM cérébrale standard',
      medecin: 'Dr. Amine Bensalem',
      Consultation: 'CONS001',
      resultat_id: 'RES001',
      etablissement: 'etablissement4',
      patient: ''
    },
    {
      id: '12',
      date_debut: '2024-01-15',
      date_fin: '2024-01-16',
      type_radio: 'IRM',
      est_complet: true,
      est_resultat: true,
      description: 'IRM cérébrale standard',
      medecin: 'Dr. Amine Bensalem',
      Consultation: 'CONS001',
      resultat_id: 'RES001',
      etablissement: 'etablissement2',
      patient: ''
    },
    {
      id: '13',
      date_debut: '2024-01-15',
      date_fin: '2024-01-16',
      type_radio: 'IRM',
      est_complet: true,
      est_resultat: true,
      description: 'IRM cérébrale standard',
      medecin: 'Dr. Amine Bensalem',
      Consultation: 'CONS001',
      resultat_id: 'RES001',
      etablissement: 'etablissement3',
      patient: ''
    },
    {
      id: '14',
      date_debut: '2024-01-15',
      date_fin: '2024-01-16',
      type_radio: 'IRM',
      est_complet: true,
      est_resultat: true,
      description: 'IRM cérébrale standard',
      medecin: 'Dr. Amine Bensalem',
      Consultation: 'CONS001',
      resultat_id: 'RES001',
      etablissement: 'etablissement',
      patient: ''
    },
    {
      id: '15',
      date_debut: '2024-02-01',
      date_fin: '2024-02-01',
      type_radio: 'SCANNER',
      est_complet: false,
      est_resultat: false,
      description: 'Scanner thoracique',
      medecin: 'Dr. Leila Hamdi',
      Consultation: 'CONS002',
      resultat_id: 'RES002',
      etablissement: 'etablissement2',
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
            id: '1',
            nom_etablissement: 'Etablissement 1',
            adresse: '8 W. South St.Buford, GA 30518',
            telephone: 123456789,
            email: 'email@gmail.com',
            type: 'Hôpital',
      
          }
          
        ];

        showEtablissementDropdown = false;

        filteredBilans: BilanRadio[] = []; 
      
   
        searchTerm: string = '';
        showModal: boolean = false;
        showFilterModal = false;
        
      
        filterCriteria = {
          etablissement: '',
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
      
        get uniqueEtablissements(): string[] {
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
      
        selectEtablissement(etab: string) {
          this.filterCriteria.etablissement = etab;
          this.showEtablissementDropdown = false;
        }
      
        clearFilters() {
          console.log('Clearing filters'); // Debug log
          this.filterCriteria = {
            etablissement: '',
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

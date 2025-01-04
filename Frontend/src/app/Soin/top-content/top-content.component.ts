import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, PLATFORM_ID } from '@angular/core';
import { Infermier, Soin } from '../soin/soin.component';
import { FormsModule } from '@angular/forms';
import { ModifierSoinComponent } from '../modifier-soin/modifier-soin.component';
import axios from 'axios';
import { TypeSoins } from '../../../types/soins';
import { Notyf } from 'notyf';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-top-content',
  imports: [CommonModule, FormsModule, ModifierSoinComponent],
  templateUrl: './top-content.component.html',
  styleUrl: './top-content.component.css'
})
export class TopContentComponent {
  notyf : Notyf | undefined
  @Input() soin!:Soin;
  @Input() role!: string;
    isAddPanelVisible = false;  // Flag to control the visibility of the "Add Consultation" panel
    isPopupVisible = false;
    @Input() infermiers: Infermier[] = [];
  constructor(@Inject(PLATFORM_ID) private platformId: Object,private router: Router , private route: ActivatedRoute) {
        if (isPlatformBrowser(this.platformId)) {
          this.notyf = new Notyf();
        }
  }
  ngOnInit() {
    // Get the ID once
    this.route.params.subscribe(params => {
      const id = params['id'];
      // Use the ID to fetch data or whatever you need
    });}
    getInfermierName(infermierId: number): string {
      const infermier = this.infermiers.find(i => i.id === infermierId);
      return infermier ? infermier.nom : 'Unknown Infermier';
    }


    // Method to open the "Add Consultation" panel
    openAddPanel() {
      this.isAddPanelVisible = true;
    }

    // Method to close the "Add Consultation" panel
    closeAddPanel() {
      this.isAddPanelVisible = false;
    }

    openPopup() {
      this.isPopupVisible = true;
    }

    closePopup() {
      this.isPopupVisible = false;
    }
    async onTypeChange(newType:TypeSoins) {
      try {
        const response = await axios.put(
          `http://localhost:8000/soins/dpi/soins/65/update/`,
          {
            type_soins: newType
          }
        );
        
        if (this.notyf) {
          this.notyf.success("Type de soin modifié avec succès");
        }
        
        // Update local state
        this.soin.type_soins = newType;
        
      } catch (error) {
        console.error('Error updating type_soins:', error);
        if (this.notyf) {
          this.notyf.error("Erreur lors de la modification du type de soin");
        }
        
        // Revert the select to previous value if update fails
        this.soin.type_soins = this.soin.type_soins;
      }
    }
    // Method to update soin
    updateSoin(updatedData: Partial<Soin>) {
      this.soin = {
        ...this.soin,
        infermier: updatedData.infermier || this.soin.infermier,
        date: updatedData.date ? updatedData.date : this.soin.date,
        heure: updatedData.heure ? updatedData.heure : this.soin.heure,
        };
      this.isAddPanelVisible = false;  // Close the panel after saving the data
    }
    async deleteSoin(){
      try {
        const response = await axios.delete(
          `http://localhost:8000/soins/dpi/soins/65/delete/`
        );
        
        if (this.notyf) {
          this.notyf.success("soin supprime avec succès");
        }
        
      } catch (error) {
        console.error('Error updating type_soins:', error);
        if (this.notyf) {
          this.notyf.error("Erreur lors de la suppression de soin");
        }
    }}
}

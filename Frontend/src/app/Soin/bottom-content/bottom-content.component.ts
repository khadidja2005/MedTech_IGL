import { Component, Inject, Input, PLATFORM_ID } from '@angular/core';
import { Soins } from '../../../types/soins';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ModifierDetailsComponent } from '../modifier-details/modifier-details.component';
import { Soin } from '../soin/soin.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Notyf } from 'notyf';
import axios from 'axios';

@Component({
  selector: 'app-bottom-content',
  imports: [CommonModule, ModifierDetailsComponent],
  templateUrl: './bottom-content.component.html',
  styleUrls: ['./bottom-content.component.css']
})
export class BottomContentComponent {
  id: number = 0;
  notyf:Notyf | undefined;
  @Input() soin!: Soin;
  @Input() role!: string;

  medicament: string = 'Medicament';
  dose: string = 'Dose';
  description: string = 'Description';

  activeField: string | null = null; // Track which popup is visible
  currentDetail: string = ''; // Store the current detail being edited
  constructor(@Inject(PLATFORM_ID) private platformId: Object,private router: Router , private route: ActivatedRoute) {
        if (isPlatformBrowser(this.platformId)) {
          this.notyf = new Notyf();
        }
  }
  ngOnInit() {
    // Get the ID once
    this.route.params.subscribe(params => {
      this.id = params['id'];
      // Use the ID to fetch data or whatever you need
    });}
  openPopup(field: string, detail: string) {
    this.activeField = field; // Set the active field
    this.currentDetail = detail; // Set the detail to display in the popup
  }

  closePopup() {
    this.activeField = null; // Clear the active field
    this.currentDetail = ''; // Reset the current detail
  }

  async updateField(field: string, updatedData: Partial<String> ) {
    if (!this.soin || !updatedData) return;

    // Update the relevant field in the `soin` object
    switch (field) {
      case 'medicament':
       
        try {
          const response = await axios.put(
            `http://localhost:8000/soins/dpi/soins/${this.id}/update/`,
            {medicament :  String(updatedData)}
          );
          console.log(response.data);
          if (this.notyf) {
            this.notyf.success("Information sauvegardée avec succès");
          }
          this.soin.medicament = String(updatedData);
        } catch (e) {
          console.log(e);
          if (this.notyf) {
            this.notyf.error("Erreur durant la sauvegarde");
          }
        }
        break;
      case 'dose':
        try {
          const response = await axios.put(
            `http://localhost:8000/soins/dpi/soins/${this.id}/update/`,
            {dose :  String(updatedData)}
          );
          console.log(response.data);
          if (this.notyf) {
            this.notyf.success("Information sauvegardée avec succès");
          }
          this.soin.dose = String(updatedData);
        } catch (e) {
          console.log(e);
          if (this.notyf) {
            this.notyf.error("Erreur durant la sauvegarde");
          }
        }
        break;
      // case 'description':
      //   try {
      //     const response = await axios.put(
      //       "http://localhost:8000/soins/dpi/109/soins/65/update/",
      //       {description :  String(updatedData)}
      //     );
      //     console.log(response.data);
      //     if (this.notyf) {
      //       this.notyf.success("Information sauvegardée avec succès");
      //     }
      //     this.soin.description = String(updatedData);
      //   } catch (e) {
      //     console.log(e);
      //     if (this.notyf) {
      //       this.notyf.error("Erreur durant la sauvegarde");
      //     }
      //   }
      //   break;
    
      }
     
    this.closePopup(); // Close the popup after updating
  }
}

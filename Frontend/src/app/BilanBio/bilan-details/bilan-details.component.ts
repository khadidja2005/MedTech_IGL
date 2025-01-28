import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AjouterParamComponent } from '../ajouter-param/ajouter-param.component';
import { bilan, Resultat } from '../bilan-bio/bilan-bio.component';
import { Router } from '@angular/router';
import axios from 'axios';
@Component({
  selector: 'app-bilan-details',
  imports: [AjouterParamComponent, CommonModule],
  templateUrl: './bilan-details.component.html',
  styleUrl: './bilan-details.component.css',
})
export class BilanDetailsComponent {
  @Input() bilan!: bilan;
  @Input() params!: Resultat[];
  @Input() role!: string;
  isAddPanelVisible = false;
  isPopupVisible = false;
  async terminate() {
    this.bilan.est_complet = true;
    await axios
      .post('http://localhost:8000/bilanBio/terminer', {
        bilan_id: this.bilan.id,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  async valider() {
    await axios
      .post('http://localhost:8000/bilanbio/valider', {
        bilan_id: this.bilan.id,
      })
      .then((response) => {
        console.log(response);
        this.bilan.est_resultat = true;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  openAddPanel() {
    this.isAddPanelVisible = true;
  }

  // Method to close the panel
  closeAddPanel() {
    this.isAddPanelVisible = false;
  }

  openPopup() {
    this.isPopupVisible = true;
  }

  closePopup() {
    this.isPopupVisible = false;
  }
  constructor(private router: Router) {}
  // Method to add a param (called when the new param is emitted from the form)
  addParam(newParam: Resultat) {
    this.params.push(newParam); // Add the new param to the list
    this.isAddPanelVisible = false; // Close the panel after adding
  }
  async delete() {
    await axios
      .post('http://localhost:8000/bilanBio/supprimer', {
        bilan_id: this.bilan.id,
      })
      .then((response) => {
        console.log(response);
        if (this.role === 'laborantin') {
          this.router.navigate(['/laborantin']);
        } else {
          this.router.navigate(['/recherche']);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

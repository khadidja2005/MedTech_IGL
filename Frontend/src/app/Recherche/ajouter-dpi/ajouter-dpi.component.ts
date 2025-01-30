import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DpiCards } from '../recherche/recherche.component';
import { Etab } from '../../Pharmacie/pharmacie/pharmacie.component';
import axios from 'axios';
export interface Dpi {
  id: number;
  nom: string;
  nss: string;
  etablissement: number;
}
interface data {
  success: boolean;
  dpi_id: number;
}

@Component({
  selector: 'app-ajouter-dpi',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ajouter-dpi.component.html',
  styleUrl: './ajouter-dpi.component.css',
})
export class AjouterDPIComponent {
  @Input() isVisible: boolean = false;
  @Input() etablissements: Etab[] = [];
  @Output() closePanel = new EventEmitter<void>();
  @Output() saveDpi = new EventEmitter<DpiCards>(); // Emit the added consultation

  ajoutForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.ajoutForm = this.fb.group({
      nom: ['', Validators.required],
      nss: ['', Validators.required],
      etablissement: ['', Validators.required],
    });
  }
  id = localStorage.getItem('id') || '';
  onSubmit() {
    if (this.ajoutForm.valid) {
      const formValue = this.ajoutForm.value;

      // Create the new consultation object
      const newDpi: Dpi = {
        id: 0,
        nom: formValue.nom,
        nss: formValue.nss,
        etablissement: formValue.etablissement,
      };

      axios
        .post<data>('http://localhost:8000/recherche/creerDPI', {
          nss: newDpi.nss,
          nom_complet: newDpi.nom,
          etablissement_id: newDpi.etablissement,
          createur_id: this.id,
        })
        .then((response) => {
          newDpi.id = response.data.dpi_id;
        })
        .catch((error) => {
          console.error('Error:', error);
        });

      const newDpiCard: DpiCards = {
        id: newDpi.id,
        nom_complet: newDpi.nom,
        nss: newDpi.nss,
        etablissement: newDpi.etablissement,
      };

      // Emit the new consultation to the parent
      this.saveDpi.emit(newDpiCard);
      this.closePanel.emit(); // Close the panel after adding the consultation
      this.ajoutForm.reset(); // Reset the form
    }
  }
  closesPanel(): void {
    this.closePanel.emit();
  }
}

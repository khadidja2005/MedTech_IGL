import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DpiCards } from '../recherche/recherche.component';
import { Etab } from '../../Pharmacie/pharmacie/pharmacie.component';

export interface Dpi {
  nom : string;
  nss : string;
  etablissement : number;
};

@Component({
  selector: 'app-ajouter-dpi',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ajouter-dpi.component.html',
  styleUrl: './ajouter-dpi.component.css'
})
export class AjouterDPIComponent {
   @Input() isVisible: boolean = false;
   @Input() etablissements: Etab[] = [];
      @Output() closePanel = new EventEmitter<void>();
      @Output() saveDpi = new EventEmitter<DpiCards>();  // Emit the added consultation

      ajoutForm: FormGroup;

      constructor(private fb: FormBuilder) {
        this.ajoutForm = this.fb.group({
          nom: ['', Validators.required],
          nss: ['', Validators.required],
          etablissement: ['', Validators.required],
        });
      }

      onSubmit() {
        if (this.ajoutForm.valid) {
          const formValue = this.ajoutForm.value;

          // Create the new consultation object
          const newDpi: Dpi = {
            nom: formValue.nom,
            nss: formValue.nss,
            etablissement: formValue.etablissement,
          };

          const newDpiCard: DpiCards = {
            nss: newDpi.nss,
            etablissement: newDpi.etablissement,
          };

          // Emit the new consultation to the parent
          this.saveDpi.emit(newDpiCard);
          this.closePanel.emit();  // Close the panel after adding the consultation
          this.ajoutForm.reset();  // Reset the form
        }
      }
      closesPanel(): void {

        this.closePanel.emit();

      }

}

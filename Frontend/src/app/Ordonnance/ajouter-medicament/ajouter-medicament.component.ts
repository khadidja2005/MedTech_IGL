import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Medicament } from '../../../types/medicament';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ajouter-medicament',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './ajouter-medicament.component.html',
  styleUrl: './ajouter-medicament.component.css'
})
export class AjouterMedicamentComponent {
    @Input() isVisible: boolean = false;
    @Output() closePanel = new EventEmitter<void>();
    @Output() saveConsultation = new EventEmitter<Medicament>();  // Emit the added consultation

    ajoutForm: FormGroup;

    constructor(private fb: FormBuilder) {
      this.ajoutForm = this.fb.group({
        nom: ['', Validators.required],
        dose: ['', Validators.required],
        duree: ['', Validators.required],
      });
    }

    onSubmit() {
      if (this.ajoutForm.valid) {
        const formValue = this.ajoutForm.value;

        // Create the new consultation object
        const newMedicament: Medicament = {
          id: '',
          nom : formValue.nom,
          dosage: formValue.dose,
          duree: formValue.duree,
          ordonnance: '',  // Set this according to your data structure
        };

        // Emit the new consultation to the parent
        this.saveConsultation.emit(newMedicament);
        this.closePanel.emit();  // Close the panel after adding the consultation
        this.ajoutForm.reset();  // Reset the form
      }
    }
    closesPanel(): void {

      this.closePanel.emit();

    }
}

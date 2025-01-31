import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MedicamentPageOrd } from '../ordonnance/ordonnance.component';
import axios from 'axios';

interface resMed {
  medicament_id: number;
}
@Component({
  selector: 'app-ajouter-medicament',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ajouter-medicament.component.html',
  styleUrl: './ajouter-medicament.component.css',
})
export class AjouterMedicamentComponent {
  @Input() isVisible: boolean = false;
  @Output() closePanel = new EventEmitter<void>();
  @Input() closePan!: () => void;
  @Output() saveMedicament = new EventEmitter<MedicamentPageOrd>(); // Emit the added consultation
  @Input() ordonnanceId!: number;

  ajoutForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.ajoutForm = this.fb.group({
      nom: ['', Validators.required],
      dose: ['', Validators.required],
      duree: ['', Validators.required],
    });
  }

  async onSubmit() {
    if (this.ajoutForm.valid) {
      const formValue = this.ajoutForm.value;

      // Create the new consultation object
      const newMedicament: MedicamentPageOrd = {
        id: 0,
        nom: formValue.nom,
        dosage: formValue.dose,
        duree: formValue.duree,
      };

      try {
        await axios
          .post<resMed>(`http://localhost:8000/ordonnance/ajouter/medicament`, {
            ordonnance_id: this.ordonnanceId,
            nom: newMedicament.nom,
            dosage: newMedicament.dosage,
            duree: newMedicament.duree,
          })
          .then((response) => {
            newMedicament.id = response.data.medicament_id;
            console.log(newMedicament);
          })
          .catch((error) => {
            console.error(error);
          });
      } catch (error) {
        console.error(error);
      }

      // Emit the new consultation to the parent
      this.saveMedicament.emit(newMedicament);
      this.closePanel.emit(); // Close the panel after adding the consultation
      this.ajoutForm.reset(); // Reset the form
    }
  }
  closesPanel(): void {
    this.closePanel.emit();
  }

  close() {
    if (this.closePan) {
      this.closePan();
    }
  }
}

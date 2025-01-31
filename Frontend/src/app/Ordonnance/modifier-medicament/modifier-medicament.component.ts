import { MedicamentPageOrd } from './../ordonnance/ordonnance.component';
import { Medicament } from './../../../types/medicament.d';
import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import axios from 'axios';
@Component({
  selector: 'app-modifier-medicament',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modifier-medicament.component.html',
  styleUrl: './modifier-medicament.component.css',
})
export class ModifierMedicamentComponent {
  @Input() isVisible: boolean = false;
  @Input() medicament!: MedicamentPageOrd;
  @Output() closePanel = new EventEmitter<void>();
  @Input() closePan!: () => void;
  @Output() saveChanges = new EventEmitter<Partial<MedicamentPageOrd>>();
  modifyForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.modifyForm = this.fb.group({
      nom: ['', Validators.required],
      dose: ['', Validators.required],
      duree: ['', Validators.required],
    });
  }

  ngOnInit() {
    if (this.medicament) {
      this.modifyForm = this.fb.group({
        nom: [this.medicament.nom || '', Validators.required],
        dose: [this.medicament.dosage || '', Validators.required],
        duree: [this.medicament.duree || '', Validators.required],
      });
    }
  }

  async onSubmit() {
    if (this.modifyForm.valid) {
      const formValue = this.modifyForm.value;
      const updatedData: Partial<Medicament> = {
        id: this.medicament.id,
        nom: formValue.nom,
        dosage: formValue.dose,
        duree: formValue.duree,
      };

      axios
        .post('http://127.0.0.1:8000/ordonnance/modifier/medicament', {
          medicament_id: this.medicament.id,
          nom: formValue.nom,
          dosage: formValue.dose,
          duree: formValue.duree,
        })
        .then(() => {
          alert('Medicament updated successfully!');
        })
        .catch((error) => {
          console.error('Error updating medicament:', error);
        });

      this.saveChanges.emit(updatedData);
    }
  }

  close() {
    if (this.closePan) {
      this.closePan();
    }
  }
}

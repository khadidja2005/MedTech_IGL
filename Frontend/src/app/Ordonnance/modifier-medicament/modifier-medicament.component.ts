import { MedicamentPageOrd } from './../ordonnance/ordonnance.component';
import { Medicament } from './../../../types/medicament.d';
import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-modifier-medicament',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './modifier-medicament.component.html',
  styleUrl: './modifier-medicament.component.css'
})
export class ModifierMedicamentComponent {
  @Input() isVisible: boolean = false;
    @Input() medicament !: MedicamentPageOrd;
    @Output() closePanel = new EventEmitter<void>();
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

    onSubmit() {
      if (this.modifyForm.valid) {
        const formValue = this.modifyForm.value;
        const updatedData: Partial<Medicament> =
        {
          nom: formValue.nom,
          dosage: formValue.dose,
          duree: formValue.duree,
        }
        this.saveChanges.emit(updatedData);
      }
    }

}

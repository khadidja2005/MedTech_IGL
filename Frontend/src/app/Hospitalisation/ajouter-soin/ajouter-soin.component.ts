import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Soins } from '../../../types/soins';
import { TypeSoins } from '../../../types/soins';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-ajouter-soin',
  templateUrl: './ajouter-soin.component.html',
  imports: [CommonModule, ReactiveFormsModule],
  styleUrls: ['./ajouter-soin.component.css']
})
export class AjouterSoinComponent {
  @Input() isVisible: boolean = false;
  @Input() infermiers: string[] = [];
  @Output() closePanel = new EventEmitter<void>();
  @Output() saveSoin = new EventEmitter<Soins>();  // Emit the added consultation

  soinForm: FormGroup;

  showDescription: boolean = false;
  showEtat: boolean = false;
  showMedicamentDose: boolean = false;

  constructor(private fb: FormBuilder) {
    this.soinForm = this.fb.group({
      infermier: ['', Validators.required],
      date: ['', Validators.required],
      heure: ['', Validators.required],
      type: ['', Validators.required],
      descrip: [''],
      etat: [''],
      medic: [''],
      doses: ['']
    });

    this.soinForm.get('type')?.valueChanges.subscribe(value => {
      this.showDescription = value === 'SOIN INFERMIER' || value === 'AUTRE';
      this.showEtat = value === 'OBSERVATION DETAT';
      this.showMedicamentDose = value === 'ADMINISTRATION DE MEDICAMENT';

      const descrip = this.soinForm.get('descrip');
      const etat = this.soinForm.get('etat');
      const medic = this.soinForm.get('medic');
      const doses = this.soinForm.get('doses');

      if (value === 'SOIN INFERMIER' || value === 'AUTRE') {
        descrip?.setValidators([Validators.required]);
      } else {
        descrip?.clearValidators();
        descrip?.setValue('');
      }
      if (value === 'OBSERVATION DETAT') {
        etat?.setValidators([Validators.required]);
      } else {
        etat?.clearValidators();
        etat?.setValue('');
      }
      if (value === 'ADMINISTRATION DE MEDICAMENT') {
        medic?.setValidators([Validators.required]);
        doses?.setValidators([Validators.required]);
      } else {
        medic?.clearValidators();
        medic?.setValue('');
        doses?.clearValidators();
        doses?.setValue('');
      }
      medic?.updateValueAndValidity();
      doses?.updateValueAndValidity();
      etat?.updateValueAndValidity();
      descrip?.updateValueAndValidity();
    });
  }

  private convertDateToDisplayFormat(dateStr: string): string {
    // Convert from YYYY-MM-DD to DD/MM/YYYY
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  }
  get type() {
    return this.soinForm.get('type');
  }

  onSubmit() {
    if (this.soinForm.valid) {
      const formValue = this.soinForm.value;

      // Create the new consultation object
      const newSoin: Soins = {
        id: '',
        date: this.convertDateToDisplayFormat(formValue.date), // ISO date string
        heure: formValue.heure, // ISO time string
        type_soins: formValue.type as TypeSoins,
        description: formValue.descrip || '',
        etat_patient: formValue.etat,
        medicament: formValue.medic || '',
        dose: formValue.doses || '',
        hospitalisation: '', // Foreign key to Hospitalisation
        infermier: formValue.infermier, // Foreign key to PersonnelMedical, nullable
      };
      console.log(newSoin.type_soins);

      // Emit the new consultation to the parent
      this.saveSoin.emit(newSoin);
      this.closePanel.emit();  // Close the panel after adding the consultation
      this.soinForm.reset();  // Reset the form
    }
  }

  closesPanel(): void {
    this.closePanel.emit();
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TypeSoins } from '../../../types/soins';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Infermier } from '../../Soin/soin/soin.component';
import { SoinPageHospitalisation } from '../hospitalisation/hospitalisation.component';

export interface SoinPageAjouter {
  infermier : number;
  date : string;
  heure : string;
  type : TypeSoins;
  description : string;
  medicament : string;
  dose : string;
}

@Component({
  selector: 'app-ajouter-soin',
  templateUrl: './ajouter-soin.component.html',
  imports: [CommonModule, ReactiveFormsModule],
  styleUrls: ['./ajouter-soin.component.css']
})
export class AjouterSoinComponent {
  @Input() isVisible: boolean = false;
  @Input() infermiers: Infermier[] = [];
  @Output() closePanel = new EventEmitter<void>();
  @Output() saveSoin = new EventEmitter<SoinPageAjouter>();  // Emit the added consultation

  soinForm: FormGroup;

  showDescription: boolean = false;
  showMedicamentDose: boolean = false;

  constructor(private fb: FormBuilder) {
    this.soinForm = this.fb.group({
      infermier: ['', Validators.required],
      date: ['', Validators.required],
      heure: ['', Validators.required],
      type: ['', Validators.required],
      descrip: [''],
      medic: [''],
      doses: ['']
    });

    this.soinForm.get('type')?.valueChanges.subscribe(value => {
      this.showDescription = value === 'INFIRMIER' || value === 'AUTRE' || value === 'OBSERVATION D\'ETAT';
      this.showMedicamentDose = value === 'ADMINISTRATION DE MEDICAMENT';

      const descrip = this.soinForm.get('descrip');
      const medic = this.soinForm.get('medic');
      const doses = this.soinForm.get('doses');

      if (value === 'INFERMIER' || value === 'AUTRE' || value === 'OBSERVATION D\'ETAT') {
        descrip?.setValidators([Validators.required]);
      } else {
        descrip?.clearValidators();
        descrip?.setValue('');
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
      const nvSoin: SoinPageAjouter = {
        date: this.convertDateToDisplayFormat(formValue.date), // ISO date string
        heure: formValue.heure, // ISO time string
        type: formValue.type as TypeSoins,
        description: formValue.descrip || '',
        medicament: formValue.medic || null,
        dose: formValue.doses || null,
        infermier: formValue.infermier, // Foreign key to PersonnelMedical, nullable
      };

      // Emit the new consultation to the parent
      this.saveSoin.emit(nvSoin);
      this.closePanel.emit();  // Close the panel after adding the consultation
      this.soinForm.reset();  // Reset the form
    }
  }

  closesPanel(): void {
    this.closePanel.emit();
  }
}

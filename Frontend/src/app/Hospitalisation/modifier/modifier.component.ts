import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Hospitalisation } from '../../../types/hospitalisation';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-modifier',
  templateUrl: './modifier.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  styleUrls: ['./modifier.component.css']
})
export class ModifierComponent implements OnInit {
  @Input() isVisible: boolean = false;
  @Input() hospitalisation!: Hospitalisation;
  @Output() closePopup = new EventEmitter<void>();
  @Output() saveChanges = new EventEmitter<Partial<Hospitalisation>>();
  @Input() medecins: string[] = [];
  hospitalisationForm: FormGroup;

  showEndDate: boolean = false;

  constructor(private fb: FormBuilder) {
    this.hospitalisationForm = this.fb.group({
      medecin_responsable: ['', Validators.required],
      date_debut: ['', Validators.required],
      status: ['en cours', Validators.required],
      date_fin: ['']
    });

    this.hospitalisationForm.get('status')?.valueChanges.subscribe(value => {
      this.showEndDate = value === 'fini';
      const dateFin = this.hospitalisationForm.get('date_fin');

      if (value === 'fini') {
        dateFin?.setValidators([Validators.required]);
      } else {
        dateFin?.clearValidators();
        dateFin?.setValue('');
      }
      dateFin?.updateValueAndValidity();
    });
  }

  private convertDateToInputFormat(dateStr: string): string {
    // Convert from DD/MM/YYYY to YYYY-MM-DD
    if (!dateStr) return '';
    const [day, month, year] = dateStr.split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }

  private convertDateToDisplayFormat(dateStr: string): string {
    // Convert from YYYY-MM-DD to DD/MM/YYYY
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  }

  ngOnInit() {
    if (this.hospitalisation) {
      const formattedStartDate = this.convertDateToInputFormat(this.hospitalisation.date_debut);

      this.hospitalisationForm.patchValue({
        medecin_responsable: this.hospitalisation.medecin_responsable,
        date_debut: formattedStartDate,
        status: this.hospitalisation.status,
        date_fin: this.hospitalisation.date_fin ? this.convertDateToInputFormat(this.hospitalisation.date_fin) : ''
      });

      this.showEndDate = this.hospitalisation.status === 'fini';
    }
  }

  onSubmit() {
    if (this.hospitalisationForm.valid) {
      const formValue = this.hospitalisationForm.value;
      const updatedData: Partial<Hospitalisation> = {
        medecin_responsable: formValue.medecin_responsable,
        date_debut: this.convertDateToDisplayFormat(formValue.date_debut),
        status: formValue.status,
        date_fin: formValue.date_fin ? this.convertDateToDisplayFormat(formValue.date_fin) : ''
      };
      this.saveChanges.emit(updatedData);
    }
  }
}

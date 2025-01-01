import {
  HospitalisationPage,
  medecin,
} from './../hospitalisation/hospitalisation.component';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'app-modifier',
  templateUrl: './modifier.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  styleUrls: ['./modifier.component.css'],
})
export class ModifierComponent implements OnInit {
  @Input() isVisible: boolean = false;
  @Input() hospitalisation_id!: number;
  @Input() hospitalisation!: HospitalisationPage;
  @Output() closePopup = new EventEmitter<void>();
  @Output() saveChanges = new EventEmitter<Partial<HospitalisationPage>>();
  @Input() medecins: medecin[] = [];

  hospitalisationForm: FormGroup;
  //hospitalisation_id = 2878; //navigation
  showEndDate: boolean = false;

  constructor(private fb: FormBuilder) {
    this.hospitalisationForm = this.fb.group({
      medecin_responsable: [''],
      date_debut: [''],
      status: ['en cours', Validators.required],
      date_fin: [''],
    });

    this.hospitalisationForm.get('status')?.valueChanges.subscribe((value) => {
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
      const formattedStartDate = this.convertDateToInputFormat(
        this.hospitalisation.date_debut
      );

      this.hospitalisationForm.patchValue({
        medecin_responsable: this.hospitalisation.medecin,
        date_debut: formattedStartDate,
        status: this.hospitalisation.date_fin ? 'en cours' : 'fini',
        date_fin: this.hospitalisation.date_fin
          ? this.convertDateToInputFormat(this.hospitalisation.date_fin)
          : '',
      });

      this.showEndDate = this.hospitalisation.date_fin != null;
    }
  }
  onSubmit() {
    if (this.hospitalisationForm.valid) {
      const formValue = this.hospitalisationForm.value;
      let medecin;
      for (const med of this.medecins) {
        if (med.id == formValue.medecin_responsable) {
          medecin = med.nom;
          console.log('medecin', medecin);
          break;
        }
      }
      const updatedData: Partial<HospitalisationPage> = {
        medecin: medecin,
        date_debut: this.convertDateToDisplayFormat(formValue.date_debut),
        date_fin: formValue.date_fin
          ? this.convertDateToDisplayFormat(formValue.date_fin)
          : null,
      };
      this.saveChanges.emit(updatedData);
      axios
        .post('http://localhost:8000/hospitalisation/modifier', {
          hospitalisation_id: this.hospitalisation_id,
          medecin_id: this.hospitalisationForm.value.medecin_responsable,
          date_debut: this.hospitalisationForm.value.date_debut,
          date_fin: updatedData.date_fin,
          status: this.hospitalisationForm.value.status,
        })
        .then((response) => {
          console.log('Updated hospitalisation:', response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
}

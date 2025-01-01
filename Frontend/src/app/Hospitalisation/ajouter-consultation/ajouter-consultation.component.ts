import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  ConsultationPageHospitalisation,
  medecin,
} from '../hospitalisation/hospitalisation.component';
import axios from 'axios';

@Component({
  selector: 'app-ajouter-consultation',
  templateUrl: './ajouter-consultation.component.html',
  imports: [CommonModule, ReactiveFormsModule],
  styleUrls: ['./ajouter-consultation.component.css'],
})
export class AjouterConsultationComponent {
  @Input() isVisible: boolean = false;
  @Input() medecins: medecin[] = [];
  @Output() closePanel = new EventEmitter<void>();
  @Output() saveConsultation =
    new EventEmitter<ConsultationPageHospitalisation>(); // Emit the added consultation

  consultationForm: FormGroup;
  hospitalisation_id = 2878; //use navigation to get this value
  constructor(private fb: FormBuilder) {
    this.consultationForm = this.fb.group({
      medecin: ['', Validators.required],
      date: ['', Validators.required],
    });
  }

  private convertDateToDisplayFormat(dateStr: string): string {
    // Convert from YYYY-MM-DD to DD/MM/YYYY
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  }

  async onSubmit() {
    if (this.consultationForm.valid) {
      const formValue = this.consultationForm.value;
      let medecin = ' ';
      for (const med of this.medecins) {
        if (med.id == formValue.medecin) {
          medecin = med.nom;
          break;
        }
      }
      // Create the new consultation object
      const newConsultation: ConsultationPageHospitalisation = {
        id: 0, // Temporary ID
        medecin: medecin,
        date: this.convertDateToDisplayFormat(formValue.date),
      };
      let bool = false;
      await axios
        .post('http://localhost:8000/hospitalisation/ajouter/consultation', {
          hospitalisation_id: this.hospitalisation_id,
          medecin_id: formValue.medecin,
          date: newConsultation.date,
        })
        .then((response) => {
          newConsultation.id = response.data.id; // Set the ID of the new consultations
          bool = true;
        })
        .catch((error) => {
          console.log(error);
        });
      if (bool) {
        // Emit the new consultation to the parent
        this.saveConsultation.emit(newConsultation);
        this.closePanel.emit(); // Close the panel after adding the consultation
        this.consultationForm.reset(); // Reset the form
      }
    }
  }
  closesPanel(): void {
    this.closePanel.emit();
  }
}

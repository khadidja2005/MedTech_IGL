import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Consultation } from '../../../types/consultation';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ajouter-consultation',
  templateUrl: './ajouter-consultation.component.html',
  imports: [CommonModule,ReactiveFormsModule],
  styleUrls: ['./ajouter-consultation.component.css']
})
export class AjouterConsultationComponent {
  @Input() isVisible: boolean = false;
  @Input() medecins: string[] = [];
  @Output() closePanel = new EventEmitter<void>();
  @Output() saveConsultation = new EventEmitter<Consultation>();  // Emit the added consultation

  consultationForm: FormGroup;

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

  onSubmit() {
    if (this.consultationForm.valid) {
      const formValue = this.consultationForm.value;

      // Create the new consultation object
      const newConsultation: Consultation = {
        id: '',  // Example ID generation
        Medecin: formValue.medecin,
        date: this.convertDateToDisplayFormat(formValue.date),
        resume: '',
        Hospitalisation: '',  // Set this according to your data structure
      };

      // Emit the new consultation to the parent
      this.saveConsultation.emit(newConsultation);
      this.closePanel.emit();  // Close the panel after adding the consultation
      this.consultationForm.reset();  // Reset the form
    }
  }
  closesPanel(): void {

    this.closePanel.emit();

  }
}

import { ResultatBio } from './../../../types/resultatbio.d';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ajouter-param',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './ajouter-param.component.html',
  styleUrl: './ajouter-param.component.css'
})
export class AjouterParamComponent {
  @Input() isVisible: boolean = false;
      @Output() closePanel = new EventEmitter<void>();
      @Output() saveConsultation = new EventEmitter<ResultatBio>();  // Emit the added consultation

      ajoutForm: FormGroup;

      constructor(private fb: FormBuilder) {
        this.ajoutForm = this.fb.group({
          nom: ['', Validators.required]
        });
      }

      onSubmit() {
        if (this.ajoutForm.valid) {
          const formValue = this.ajoutForm.value;

          // Create the new consultation object
          const newParam: ResultatBio = {
            id: '',
            valeur_mesure: '',
            date_mesure: '',
            heure_mesure: '',
            parametre: formValue.nom,
            norme: '',
            bilan_bio: '1',
            laborantin: ''
          };

          // Emit the new consultation to the parent
          this.saveConsultation.emit(newParam);
          this.closePanel.emit();  // Close the panel after adding the consultation
          this.ajoutForm.reset();  // Reset the form
        }
      }
      closesPanel(): void {

        this.closePanel.emit();

      }

}

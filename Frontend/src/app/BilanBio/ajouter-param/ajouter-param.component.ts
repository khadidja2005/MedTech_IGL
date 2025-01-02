import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Resultat } from '../bilan-bio/bilan-bio.component';

@Component({
  selector: 'app-ajouter-param',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './ajouter-param.component.html',
  styleUrl: './ajouter-param.component.css',
})
export class AjouterParamComponent {
  @Input() isVisible: boolean = false;
  @Output() closePanel = new EventEmitter<void>();
  @Output() saveParam = new EventEmitter<Resultat>(); // Emit the added consultation

  ajoutForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.ajoutForm = this.fb.group({
      nom: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.ajoutForm.valid) {
      const formValue = this.ajoutForm.value;

      // Create the new consultation object
      const newParam: Resultat = {
        parametre: formValue.nom,
        norme: null,
        valeur_mesure: null,
        laborantin: null,
        id: 0,
        date_mesure: null,
        heure_mesure: null,
        laborantin_nom: null,
      };

      // Emit the new consultation to the parent
      this.saveParam.emit(newParam);
      this.closePanel.emit(); // Close the panel after adding the consultation
      this.ajoutForm.reset(); // Reset the form
    }
  }
  closesPanel(): void {
    this.closePanel.emit();
  }
}

import { ResultatBio } from '../../../types/resultatbio';
import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Resultat } from '../bilan-bio/bilan-bio.component';

@Component({
  selector: 'app-saisir-resultat',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './saisir-resultat.component.html',
  styleUrl: './saisir-resultat.component.css',
})
export class SaisirResultatComponent {
  @Input() isVisible: boolean = false;
  @Input() param!: Resultat;
  @Output() closePanel = new EventEmitter<void>();
  @Output() saveChanges = new EventEmitter<Partial<Resultat>>();
  saisirForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.saisirForm = this.fb.group({
      norme: ['', Validators.required],
      valeur_mesure: ['', Validators.required],
    });
  }

  closesPanel() {
    this.closePanel.emit();
  }

  ngOnInit() {
    if (this.param) {
      this.saisirForm = this.fb.group({
        norme: [this.param.norme || '', Validators.required],
        valeur_mesure: [this.param.valeur_mesure || '', Validators.required],
      });
    }
  }

  onSubmit() {
    if (this.saisirForm.valid) {
      const formValue = this.saisirForm.value;
      const updatedData: Partial<ResultatBio> = {
        norme: formValue.norme,
        valeur_mesure: formValue.valeur_mesure,
      };
      this.saveChanges.emit(updatedData);
    }
  }
}

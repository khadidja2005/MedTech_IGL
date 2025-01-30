import { ResultatBio } from '../../../types/resultatbio';
import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Resultat } from '../bilan-bio/bilan-bio.component';
import axios from 'axios';
import { ChangeDetectorRef } from '@angular/core';
interface data {
  message: string;
  id: number;
}
@Component({
  selector: 'app-saisir-resultat',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './saisir-resultat.component.html',
  styleUrl: './saisir-resultat.component.css',
})
export class SaisirResultatComponent {
  @Input() isVisible: boolean = false;
  @Input() param!: Resultat;
  @Input() bilan_id!: number;
  @Input() laborantin_id!: number;
  @Input() closePopup!: () => void;
  @Output() closePanel = new EventEmitter<void>();
  @Output() saveChanges = new EventEmitter<Partial<Resultat>>();
  saisirForm: FormGroup;
  bool = false;
  constructor(private fb: FormBuilder) {
    this.saisirForm = this.fb.group({
      norme: ['', Validators.required],
      valeur_mesure: ['', Validators.required],
    });
  }
  closesPanel() {
    this.closePanel.emit();
  }
  close() {
    console.log(' in close');
    //this.isVisible = false;
    if (this.closePopup) {
      console.log('closePopup is defined');
      this.closePopup(); // Call the function from parent
    } else {
      console.error('closePopup is undefined!');
    }
  }
  ngOnInit() {
    if (this.param) {
      if (this.param.valeur_mesure !== null) {
        this.bool = true;
      }
      this.saisirForm = this.fb.group({
        norme: [this.param.norme || '', Validators.required],
        valeur_mesure: [this.param.valeur_mesure || '', Validators.required],
      });
    }
  }
  async onSubmit() {
    if (this.saisirForm.valid) {
      const formValue = this.saisirForm.value;
      const updatedData: Partial<ResultatBio> = {
        norme: formValue.norme,
        valeur_mesure: formValue.valeur_mesure,
      };
      let bool2 = false;
      if (this.bool) {
        await axios
          .post('http://localhost:8000/bilanbio/modifier/resultat', {
            id: this.param.id,
            ...updatedData,
            date_mesure: new Date().toLocaleDateString('en-GB'),
            heure_mesure: new Date()
              .toLocaleTimeString('en-GB', { hour12: false })
              .slice(0, 5),
            laborantin_id: this.laborantin_id,
          })
          .then((response) => {
            console.log(response);
            bool2 = true;
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        let now = new Date();
        await axios
          .post<data>('http://localhost:8000/bilanbio/ajouter/resultat', {
            ...updatedData,
            parametre: this.param.parametre,
            date_mesure: `${now.getDate().toString().padStart(2, '0')}/${(
              now.getMonth() + 1
            )
              .toString()
              .padStart(2, '0')}/${now.getFullYear()}`,
            heure_mesure: `${now.getHours().toString().padStart(2, '0')}:${now
              .getMinutes()
              .toString()
              .padStart(2, '0')}`,
            laborantin_id: this.laborantin_id,
            bilan_id: this.bilan_id,
          })
          .then((response) => {
            console.log(response);
            this.param.id = response.data.id;
            bool2 = true;
          })
          .catch((error) => {
            console.error(error);
          });
      }
      if (bool2) {
        this.saveChanges.emit(updatedData);
      }
    }
  }
}

import { Component, Input } from '@angular/core';
import { DpiCards } from '../recherche/recherche.component';
import { Etab } from '../../Pharmacie/pharmacie/pharmacie.component';

@Component({
  selector: 'app-patient-card',
  imports: [],
  templateUrl: './patient-card.component.html',
  styleUrl: './patient-card.component.css',
})
export class PatientCardComponent {
  @Input() dpi!: DpiCards;
  @Input() etablissements!: Etab[];
  @Input() i!: number;

  getEtaName(id: number): string {
    const ids = Number(id);
    return this.etablissements.find((e) => e.id === ids)!.nom;
  }
}

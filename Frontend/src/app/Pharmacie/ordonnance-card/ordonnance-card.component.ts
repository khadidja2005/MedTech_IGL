import { Component, Input } from '@angular/core';
import { Ordonnance } from '../../../types/ordonance';
import { Etab, OrdonnancePharma } from '../pharmacie/pharmacie.component';

@Component({
  selector: 'app-ordonnance-card',
  imports: [],
  templateUrl: './ordonnance-card.component.html',
  styleUrl: './ordonnance-card.component.css'
})
export class OrdonnanceCardComponent {
  @Input() ordonnance!: OrdonnancePharma;
  @Input() i!: number;
  @Input() etablissements !: Etab[];

  getEtablissementName(id: number) {
    return this.etablissements.find(e => e.id === id)?.nom || 'Inconnu';
  }

}

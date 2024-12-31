import { Component, Input } from '@angular/core';
import { BilanRadio } from '../../../types/bilanRadio';
import { Bilan } from '../radiologue/radiologue.component';
import { Etab } from '../../Pharmacie/pharmacie/pharmacie.component';

@Component({
  selector: 'app-bilan-radio-card',
  imports: [],
  templateUrl: './bilan-radio-card.component.html',
  styleUrl: './bilan-radio-card.component.css'
})
export class BilanRadioCardComponent {
  @Input() bilan!: Bilan;
  @Input() i!: number;
    @Input() etablissements !: Etab[];

    getEtablissementName(id: number) {
      return this.etablissements.find(e => e.id === id)?.nom || 'Inconnu';
    }
}

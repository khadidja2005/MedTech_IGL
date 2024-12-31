import { Component, Input } from '@angular/core';
import { BilanBio } from '../../../types/bilanbio';
import { BilanLabo } from '../laborantin/laborantin.component';
import { Etab } from '../../Pharmacie/pharmacie/pharmacie.component';

@Component({
  selector: 'app-bilan-bio-card',
  imports: [],
  templateUrl: './bilan-bio-card.component.html',
  styleUrl: './bilan-bio-card.component.css'
})
export class BilanBioCardComponent {
  @Input() bilan!: BilanLabo;
  @Input() i!: number;
  @Input() etablissements!: Etab[];
  getEtablissementName(id: number): string {
    return this.etablissements.find(e => e.id === id)?.nom || 'Inconnu';
  }
}

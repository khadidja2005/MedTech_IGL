import { Component, Input } from '@angular/core';
import { BilanBio } from '../../../types/bilanbio';

@Component({
  selector: 'app-bilan-bio-card',
  imports: [],
  templateUrl: './bilan-bio-card.component.html',
  styleUrl: './bilan-bio-card.component.css'
})
export class BilanBioCardComponent {
  @Input() bilan!: BilanBio;
}

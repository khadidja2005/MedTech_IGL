import { Component, Input } from '@angular/core';
import { BilanRadio } from '../../../types/bilanRadio';

@Component({
  selector: 'app-bilan-radio-card',
  imports: [],
  templateUrl: './bilan-radio-card.component.html',
  styleUrl: './bilan-radio-card.component.css'
})
export class BilanRadioCardComponent {
  @Input() bilan!: BilanRadio;
}

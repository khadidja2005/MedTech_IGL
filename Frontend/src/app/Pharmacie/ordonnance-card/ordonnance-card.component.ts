import { Component, Input } from '@angular/core';
import { Ordonnance } from '../../../types/ordonance';

@Component({
  selector: 'app-ordonnance-card',
  imports: [],
  templateUrl: './ordonnance-card.component.html',
  styleUrl: './ordonnance-card.component.css'
})
export class OrdonnanceCardComponent {
  @Input() ordonnance!: Ordonnance;

}

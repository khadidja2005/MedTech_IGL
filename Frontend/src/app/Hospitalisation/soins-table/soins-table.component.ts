import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Soins } from '../../../types/soins';

@Component({
  selector: 'app-soins-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './soins-table.component.html',
  styleUrl: './soins-table.component.css'
})
export class SoinsTableComponent {
  @Input() soins!: Soins[];

  ngOnInit(): void {}

  onConsult(consultation: Soins): void {
    console.log('Consulting:', consultation);
    // Add your consultation logic here
  }
  getFormattedDate(date: Date): string {
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  }

}

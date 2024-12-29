import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Consultation } from '../../../types/consultation';

@Component({
  selector: 'app-consultaions-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './consultaions-table.component.html',
  styleUrl: './consultaions-table.component.css'
})
export class ConsultaionsTableComponent {
  @Input() consultations!: Consultation[];

  ngOnInit(): void {}

  onConsult(consultation: Consultation): void {
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

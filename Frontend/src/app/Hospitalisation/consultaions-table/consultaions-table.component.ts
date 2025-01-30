import { medecin } from './../hospitalisation/hospitalisation.component';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultationPageHospitalisation } from '../hospitalisation/hospitalisation.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-consultaions-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './consultaions-table.component.html',
  styleUrl: './consultaions-table.component.css',
})
export class ConsultaionsTableComponent {
  @Input() consultations!: ConsultationPageHospitalisation[];
  @Input() medecins!: medecin[];
  constructor(private router: Router) {}
  ngOnInit(): void {}

  onConsult(consultation: ConsultationPageHospitalisation): void {
    this.router.navigate([`consultation/${consultation.id}`]);
  }
  getFormattedDate(date: Date): string {
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  }
}

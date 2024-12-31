import { medecin } from './../hospitalisation/hospitalisation.component';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Consultation } from '../../../types/consultation';
import { ConsultationPageHospitalisation } from '../hospitalisation/hospitalisation.component';

@Component({
  selector: 'app-consultaions-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './consultaions-table.component.html',
  styleUrl: './consultaions-table.component.css'
})
export class ConsultaionsTableComponent {
  @Input() consultations!: ConsultationPageHospitalisation[];
  @Input() medecins!:medecin[];

  getMedecinName(medecinId: number): string {
    // Convert infermierId to number since it might be coming as a string
    const id = Number(medecinId);
    const medecin = this.medecins.find(i => i.id === id);
    return medecin ? medecin.nom : 'Unknown Infermier';
}
  ngOnInit(): void {}

  onConsult(consultation: ConsultationPageHospitalisation): void {

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

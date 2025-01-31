import { Infermier } from './../../Soin/soin/soin.component';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SoinPageHospitalisation } from '../hospitalisation/hospitalisation.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-soins-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './soins-table.component.html',
  styleUrl: './soins-table.component.css',
})
export class SoinsTableComponent {
  @Input() soins!: SoinPageHospitalisation[];
  @Input() infermiers!: Infermier[];
  constructor(private router: Router) {}
  getInfermierName(infermierId: number): string {
    // Convert infermierId to number since it might be coming as a string
    const id = Number(infermierId);
    const infermier = this.infermiers.find((i) => i.id === id);
    return infermier ? infermier.nom : 'Unknown Infermier';
  }

  ngOnInit(): void {}

  onConsult(consultation: SoinPageHospitalisation): void {
    this.router.navigate([`soin/${consultation.id}`]);
  }
  getFormattedDate(date: Date): string {
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  }
}

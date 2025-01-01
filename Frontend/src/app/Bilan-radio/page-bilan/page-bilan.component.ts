import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BilanDisplayMedValidComponent } from '../bilan-display-med-valid/bilan-display-med-valid.component';
import { BilanDisplayComponent } from '../bilan-display-med/bilan-display.component';
import { BilanDisplayRadiologueComponent } from '../bilan-display-radiologue/bilan-display-radiologue.component';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { HeaderPDIComponent } from "../../components/header-pdi/header-pdi.component";


export type TypeRadio = 'RADIO' | 'SCANNER' | 'IRM';

export interface BilanRadio {
  id: number;
  date_debut: string;
  date_fin: string;
  type_radio: TypeRadio;
  est_complet: boolean;
  est_resultat: boolean;
  description: string;
  Consultation: string;
  resultat_id: number | null;
  etablissement: number;
  medecin: string;
  patient: string;
}

export interface ResultatRadio {
  id: number;
  description: string;
  piece_jointe: string;
  date: string;
  compte_rendu: string;
  radiologue_compte_rendu: number | null;
  radiologue: number | null;
}

@Component({
  selector: 'app-page-bilan',
  standalone: true,
  imports: [
    CommonModule,
    BilanDisplayRadiologueComponent,
    BilanDisplayMedValidComponent,
    BilanDisplayComponent,
    SidebarComponent,
    HeaderPDIComponent
],
  templateUrl: './page-bilan.component.html'
})
export class PageBilanComponent implements OnInit {
  bilan!: BilanRadio;
  result!: ResultatRadio;
  userRole: 'medecin' | 'radiologue' = 'medecin';

  ngOnInit() {
    // Mock data for demonstration
    this.bilan = {
      id: 1,
      date_debut: '2024-01-01',
      date_fin: '2024-01-02',
      type_radio: 'IRM',
      est_complet: false,
      est_resultat: false,
      description: 'Sample description',
      Consultation: 'CONS001',
      resultat_id: null,
      etablissement: 1,
      medecin: 'Dr. Sample',
      patient: 'Patient Name'
    };

    this.result = {
      id: 1,
      description: 'Sample result',
      piece_jointe: '',
      date: '2024-01-02',
      compte_rendu: '',
      radiologue_compte_rendu: null,
      radiologue: 1
    };
  }

  isRadiologue(): boolean {
    return this.userRole === 'radiologue';
  }

  isMedecin(): boolean {
    return this.userRole === 'medecin';
  }
}
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BilanDisplayMedValidComponent } from '../bilan-display-med-valid/bilan-display-med-valid.component';
import { BilanDisplayComponent } from '../bilan-display-med/bilan-display.component';
import { BilanDisplayRadiologueComponent } from '../bilan-display-radiologue/bilan-display-radiologue.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { HeaderPDIComponent } from '../../components/header-pdi/header-pdi.component';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';
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
  piece_jointe: string;
  date: string;
  description: string;
  compte_rendu: string;
  radiologue_compte_rendu: number | null;
  radiologue_compte_rendu_nom: string | null;
  radiologue: number | null;
  radiologue_nom: string | null;
}
interface resres {
  id: number;
  piece_jointe: string;
  date: string;
  compte_rendu: string;
  radiologue_compte_rendu: string | null;
  radiologue_compte_rendu_id: number | null;
  radiologue: string;
  radiologue_id: number;
}
interface response {
  date_debut: string;
  date_fin: string | null;
  description: string;
  est_complet: boolean;
  est_resultat: boolean;
  medecin: string;
  medecin_id: number;
  resultats: resres;
  type_radio: TypeRadio;
  patient_name: string;
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
    HeaderPDIComponent,
  ],
  templateUrl: './page-bilan.component.html',
})
export class PageBilanComponent implements OnInit {
  bilan!: BilanRadio;
  result!: ResultatRadio;
  userRole: string = localStorage.getItem('role')?.toLowerCase() || 'medecin';
  medecin!: number; //le medecin de radio id
  loading: boolean = true;
  constructor(private route: ActivatedRoute) {}
  async ngOnInit() {
    this.bilan = {
      id: this.route.snapshot.params['id'],
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
      patient: 'Patient Name',
    };

    this.result = {
      id: 1,
      piece_jointe: '',
      date: '2024-01-02',
      compte_rendu: '',
      radiologue_compte_rendu: null,
      radiologue: 1,
      description: '',
      radiologue_compte_rendu_nom: null,
      radiologue_nom: 'Dr. Radiologue',
    };
    await axios
      .get<response>(`http://localhost:8000/bilanradio/`, {
        params: { bilan_id: this.bilan.id },
      })
      .then((res) => {
        this.bilan = {
          id: this.bilan.id,
          date_debut: res.data.date_debut,
          date_fin: res.data.date_fin ? res.data.date_fin : ' ',
          type_radio: res.data.type_radio,
          est_complet: res.data.est_complet,
          est_resultat: res.data.est_resultat,
          description: res.data.description,
          Consultation: 'CONS001',
          resultat_id: res.data.resultats.id,
          etablissement: 1,
          medecin: res.data.medecin,
          patient: res.data.patient_name,
        };
        this.result = {
          id: res.data.resultats.id,
          piece_jointe: res.data.resultats.piece_jointe,
          date: res.data.resultats.date,
          compte_rendu: res.data.resultats.compte_rendu,
          radiologue_compte_rendu:
            res.data.resultats.radiologue_compte_rendu_id,
          radiologue: res.data.resultats.radiologue_id,
          description: '',
          radiologue_compte_rendu_nom:
            res.data.resultats.radiologue_compte_rendu,
          radiologue_nom: res.data.resultats.radiologue,
        };
        this.medecin = res.data.medecin_id;
        this.loading = false;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  isRadiologue(): boolean {
    return this.userRole === 'radiologue';
  }

  isMedecin(): boolean {
    return this.userRole === 'medecin';
  }
}

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import axios from 'axios';
export type TypeRadio = 'RADIO' | 'SCANNER' | 'IRM';

export interface BilanRadio {
  id: number;
  date_debut: string; // ISO date string
  date_fin: string; // ISO date string
  type_radio: TypeRadio;
  est_complet: boolean;
  est_resultat: boolean;
  description: string;
  Consultation: string; // Foreign key to Consultation, nullable
  resultat_id: number | null;
  etablissement: number;
  medecin: string;
  patient: string;
}
export interface ResultatRadio {
  id: number;
  description: string;
  piece_jointe: string;
  date: string; // ISO date string
  compte_rendu: string;
  radiologue_compte_rendu: number | null; // Foreign key to PersonnelMedical
  radiologue: number | null; // Foreign key to PersonnelMedical
}
interface peutTerminer {
  peut_terminer: boolean;
}

@Component({
  selector: 'app-bilan-display',
  imports: [CommonModule, FormsModule],
  templateUrl: './bilan-display.component.html',
  styleUrl: './bilan-display.component.css',
})
export class BilanDisplayComponent {
  @Input() bilan!: BilanRadio;
  @Input() medecin!: number;

  user1 = {
    Admin: localStorage.getItem('role') == 'ADMIN',
    name: localStorage.getItem('nom_complet'),
    id: localStorage.getItem('id'),
    profession: localStorage.getItem('role')?.toLowerCase(),
  };

  showTypeModal = false;
  showResumeModal = false;
  showViewModal = false; // New variable for view-only modal
  addTypeModalMode: 'add' | 'view' = 'add';
  editedDescription: string = '';
  viewOnlyDescription: string = ''; // New variable for view-only content

  // View-only modal functions
  openViewDescription() {
    if (!this.caneditBilanMed()) {
      this.viewOnlyDescription = this.bilan.description;
      this.showViewModal = true;
    }
  }

  closeViewModal() {
    this.showViewModal = false;
  }

  // Original functions remain the same...
  deleteBilan() {
    console.log('Bilan deleted');
    axios
      .delete('http://localhost:8000/bilanradio/supprimer', {
        params: { bilan_id: this.bilan.id },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  modifyType() {
    this.addTypeModalMode = 'add';
    this.showTypeModal = true;
  }

  deleteType() {
    this.bilan.type_radio = 'RADIO';
    axios
      .post('http://localhost:8000/bilanradio/modifier/type', {
        bilan_id: this.bilan.id,
        type_radio: this.bilan.type_radio,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  modifyDescription() {
    if (this.caneditBilanMed()) {
      this.editedDescription = this.bilan.description;
      console.log(this.editedDescription);
      this.showResumeModal = true;
      axios
        .post('http://localhost:8000/bilanradio/modifier/description', {
          bilan_id: this.bilan.id,
          description: this.bilan.description,
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  deleteDescription() {
    this.bilan.description = '';
    axios
      .post('http://localhost:8000/bilanradio/modifier/description', {
        bilan_id: this.bilan.id,
        description: this.bilan.description,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  toggleTypeModal() {
    this.showTypeModal = !this.showTypeModal;
  }

  showDescriptionModal(mode: 'edit' | 'view'): boolean {
    return mode === 'edit' ? this.showResumeModal : false;
  }

  saveDescription() {
    this.bilan.description = this.editedDescription;
    this.showResumeModal = false;
  }

  addType() {
    if (this.bilan.type_radio) {
      this.bilan.type_radio = this.bilan.type_radio;
      this.showTypeModal = false;
      axios
        .post('http://localhost:8000/bilanradio/modifier/type', {
          bilan_id: this.bilan.id,
          type_radio: this.bilan.type_radio,
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  saveBilan() {
    axios
      .post('http://localhost:8000/bilanradio/terminer', {
        bilan_id: this.bilan.id,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  peutTerminer() {
    let bool = false;
    axios
      .get<peutTerminer>('http://localhost:8000/bilanradio/peut-terminer', {
        params: { bilan_id: this.bilan.id },
      })
      .then((response) => {
        console.log(response.data);
        bool = response.data.peut_terminer;
      })
      .catch((error) => {
        console.log(error);
      });
    return bool;
  }

  caneditBilanMed() {
    return (
      this.user1.profession === 'medecin' &&
      !this.bilan.est_resultat &&
      this.bilan.medecin === this.user1.name &&
      this.medecin === parseInt(this.user1.id || '0')
    );
  }

  canNOTeditBilanMed() {
    return (
      this.bilan.est_resultat ||
      this.bilan.medecin !== this.user1.name ||
      this.medecin !== parseInt(this.user1.id || '0')
    );
  }

  ngOnInit() {
    if (!this.bilan) {
      this.bilan = {
        id: 0,
        description: 'This is a comprehensive description...',
        date_debut: '2024-12-01',
        date_fin: '2024-12-10',
        type_radio: 'RADIO',
        est_complet: false,
        est_resultat: false,
        medecin: 'Sarah Bensaid',
        Consultation: 'description',
        resultat_id: 0,
        etablissement: 2,
        patient: 'Amina khelifi',
      };
    }
  }
}

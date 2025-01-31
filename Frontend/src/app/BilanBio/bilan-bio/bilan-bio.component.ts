import { Component } from '@angular/core';
import { TableParamComponent } from '../table-param/table-param.component';
import { BilanDetailsComponent } from '../bilan-details/bilan-details.component';
import { HeaderPDIComponent } from '../../components/header-pdi/header-pdi.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import axios from 'axios';
import { ActivatedRoute } from '@angular/router';
export interface bilan {
  id: number;
  ordre: number;
  date: string;
  est_complet: boolean;
  est_resultat: boolean;
  medecin: number;
  etablissement: string;
  patient: string;
  parametres: string;
  date_fin: string;
  medecin_nom: string;
}
export interface Resultat {
  id: number;
  valeur_mesure: string | null;
  parametre: string;
  norme: string | null;
  laborantin: number | null;
  date_mesure: string | null;
  heure_mesure: string | null;
  laborantin_nom: string | null;
}
interface data {
  patient: string;
  date_debut: string;
  date_fin: string;
  parametres: string;
  est_complet: boolean;
  est_resultat: boolean;
  medecin_id: number;
  etablissement: string;
  medecin: string;
  resultats: Resultat[];
}
@Component({
  selector: 'app-bilan-bio',
  imports: [
    SidebarComponent,
    HeaderPDIComponent,
    BilanDetailsComponent,
    TableParamComponent,
  ],
  templateUrl: './bilan-bio.component.html',
  styleUrl: './bilan-bio.component.css',
})
export class BilanBioComponent {
  role: string = localStorage.getItem('role')?.toLowerCase() || 'laborantin'; //localstorage
  laborantin = parseInt(localStorage.getItem('id') || '1'); //localstorage
  user = localStorage.getItem('nom_complet') || 'nom'; //localstorage
  bilan_id = 673; //navigation
  activeItem: string;
  constructor(private route: ActivatedRoute) {
    if (this.role == 'laborantin') {
      this.activeItem = 'Bilans';
    } else {
      this.activeItem = 'DPI';
    }
  }
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.bilan_id = parseInt(params['id']);
      // Use the ID to fetch data or whatever you need
    });
    this.pageLoad();
  }
  bilan: bilan = {
    ordre: 1,
    date: '01/12/2024',
    est_complet: false,
    est_resultat: false,
    medecin: 1,
    etablissement: 'etab',
    patient: 'patient',
    parametres: 'parametres',
    date_fin: '01/12/2024',
    medecin_nom: 'medecin_nom',
    id: 1,
  };
  params: Resultat[] = [];
  async pageLoad() {
    // Get the bilan details
    await axios
      .get<data>('http://localhost:8000/bilanbio/', {
        params: { bilan_id: this.bilan_id },
      })
      .then((response) => {
        if (this.role == 'laborantin' || response.data.est_resultat) {
          this.params = response.data.resultats;
        } else {
          if (
            response.data.parametres != null ||
            response.data.parametres != ' ' ||
            response.data.parametres != ''
          ) {
            let parametres = response.data.parametres.split(',');
            for (let i = 0; i < parametres.length; i++) {
              this.params.push({
                id: 0,
                valeur_mesure: null,
                parametre: parametres[i],
                norme: null,
                laborantin: null,
                date_mesure: null,
                heure_mesure: null,
                laborantin_nom: null,
              });
            }
          }
        }
        this.bilan = {
          id: this.bilan_id,
          ordre: 1,
          date: response.data.date_debut,
          est_complet: response.data.est_complet,
          est_resultat: response.data.est_resultat,
          medecin: response.data.medecin_id,
          etablissement: response.data.etablissement,
          patient: response.data.patient,
          parametres: response.data.parametres,
          date_fin: response.data.date_fin,
          medecin_nom: response.data.medecin,
        };
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

export interface BilanBio {
  id: number;
  date_debut: string; // ISO date string
  date_fin: string; // ISO date string
  parametres: string;
  est_complet: boolean;
  est_resultat: boolean;
  Consultation: number;
}

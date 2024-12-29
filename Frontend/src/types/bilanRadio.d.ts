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
}

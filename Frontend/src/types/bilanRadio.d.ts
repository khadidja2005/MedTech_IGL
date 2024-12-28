export type TypeRadio = 'RADIO' | 'SCANNER' | 'IRM';

export interface BilanRadio {
<<<<<<< HEAD
    id: string;
    date_debut: string; // ISO date string
    date_fin: string; // ISO date string
    type_radio: TypeRadio;
    est_complet: boolean;
    est_resultat: boolean;
    description: string;
    medecin: string; // Foreign key to PersonnelMedical
    Consultation: string | null; // Foreign key to Consultation, nullable
    resultat_id: string; 
    etablissement:string;
    patient:string;
}
=======
  id: number;
  date_debut: string; // ISO date string
  date_fin: string | null; // ISO date string
  type_radio: TypeRadio;
  est_complet: boolean;
  est_resultat: boolean;
  description: string;
  Consultation: string | null; // Foreign key to Consultation, nullable
  resultat_id: string; // Foreign key to ResultatRadio
}
>>>>>>> 171d1ec9eab303e010f3075fd91ce940b712df3a

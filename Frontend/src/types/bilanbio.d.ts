export interface BilanBio {
<<<<<<< HEAD
    id: string;
    date_debut: string; // ISO date string
    date_fin: string; // ISO date string
    parametres: string;
    est_complet: boolean;
    est_resultat: boolean;
    medecin: string; // Foreign key to PersonnelMedical
    Consultation: string | null; 
    etablissement:string;
    patient:string;
}
=======
  id: number;
  date_debut: string; // ISO date string
  date_fin: string | null; // ISO date string
  parametres: string;
  est_complet: boolean;
  est_resultat: boolean;
  Consultation: string | null; // Foreign key to Consultation, nullable
}
>>>>>>> 171d1ec9eab303e010f3075fd91ce940b712df3a

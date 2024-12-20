export interface BilanBio {
    id: string;
    date_debut: string; // ISO date string
    date_fin: string; // ISO date string
    parametres: string;
    est_complet: boolean;
    est_resultat: boolean;
    medecin: string; // Foreign key to PersonnelMedical
    Consultation: string | null; // Foreign key to Consultation, nullable
}
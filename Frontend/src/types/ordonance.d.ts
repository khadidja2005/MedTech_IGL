export interface Ordonnance {
    id: string;
    date_debut: string; // ISO date string
    date_fin: string; // ISO date string
    estValide: boolean;
    consultation: string; // Foreign key to Consultation
    pharmacien_id: string; // Foreign key to PersonnelMedical
    patient_id: string; // Foreign key to Patient
    medecin_id: string; // Foreign key to PersonnelMedical
    termine : boolean;
    etablissement : string;
}

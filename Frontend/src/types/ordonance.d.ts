export interface Ordonnance {
    id: string;
    date: string; // ISO date string
    estValide: boolean;
    consultation: string; // Foreign key to Consultation
    pharmacien_id: string; // Foreign key to PersonnelMedical
}

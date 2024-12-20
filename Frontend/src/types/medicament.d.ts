export interface Medicament {
    id: string;
    nom: string;
    dosage: string;
    duree: string;
    ordonnance: string; // Foreign key to Ordonnance
}
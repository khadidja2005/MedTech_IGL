export interface Contact {
    id: string;
    nom_complet: string;
    relation: string;
    telephone: number;
    adresse: string;
    patient: string; // Foreign key to Patient
    email: string;
}

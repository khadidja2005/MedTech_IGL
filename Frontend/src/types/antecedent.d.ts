export interface Antecedent {
    id: string;
    type: string;
    nom: string;
    description: string;
    date_debut: string; // ISO date string
    date_fin: string; // ISO date string
    DPI_id: string; // Foreign key to DPI
}

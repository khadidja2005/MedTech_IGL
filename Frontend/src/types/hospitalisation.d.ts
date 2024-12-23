export interface Hospitalisation {
    id: string;
    date_debut: string; // ISO date string
    date_fin: string; // ISO date string
    DPI: string; // Foreign key to DPI
    medecin_responsable: string; // Foreign key to PersonnelMedical
    status : string;
}

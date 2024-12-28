export interface Hospitalisation {
  id: number;
  date_debut: string; // ISO date string
  date_fin: string | null; // ISO date string
  DPI: string; // Foreign key to DPI
  medecin_responsable: string; // Foreign key to PersonnelMedical
}

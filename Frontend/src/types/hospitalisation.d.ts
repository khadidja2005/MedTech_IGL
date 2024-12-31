export interface Hospitalisation {
  id: number;
  date_debut: string; // ISO date string
  date_fin: string | null; // ISO date string
  DPI: number; // Foreign key to DPI
  medecin_responsable: number; // Foreign key to PersonnelMedical
}

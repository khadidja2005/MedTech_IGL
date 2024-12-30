export interface Consultation {
  id: number;
  resume: string;
  date: string; // ISO date string
  Hospitalisation: number; // Foreign key to Hospitalisation
  Medecin: number; // Foreign key to PersonnelMedical
}

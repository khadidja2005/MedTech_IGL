export interface Consultation {
  id: number;
  resume: string;
  date: string; // ISO date string
  Hospitalisation: string; // Foreign key to Hospitalisation
  Medecin: string; // Foreign key to PersonnelMedical
}

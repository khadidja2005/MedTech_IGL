import { Patient } from './patient';

export interface DPI {
  id: number;
  date_creation: string; // ISO date string
  patient: number; // Foreign key to Patient (OneToOne)
  etablissement_id: number; // Foreign key to Etablissement
  createur_id: number | null; // Foreign key to Admin, nullable
}

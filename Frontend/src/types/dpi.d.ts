export interface DPI {
  id: number;
  date_creation: string; // ISO date string
  patient: string; // Foreign key to Patient (OneToOne)
  etablissement_id: string; // Foreign key to Etablissement
  createur_id: string | null; // Foreign key to Admin, nullable
}

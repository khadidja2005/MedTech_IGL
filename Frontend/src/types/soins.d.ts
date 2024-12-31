export type TypeSoins =
  | 'INFIRMIER'
  | 'ADMINISTRATION DE MEDICAMENT'
  | 'AUTRE'
  | "OBSERVATION D'ETAT";

export interface Soins {
  id: number;
  date: string; // ISO date string
  heure: string; // ISO time string
  type_soins: TypeSoins;
  description: string;
  medicament: string;
  dose: string;
  hospitalisation: number; // Foreign key to Hospitalisation
  infermier: number | null; // Foreign key to PersonnelMedical, nullable
}

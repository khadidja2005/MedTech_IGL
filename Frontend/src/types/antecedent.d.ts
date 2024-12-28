export interface Antecedent {
  id: number;
  type: string | null;
  nom: string;
  description: string | null;
  date_debut: string | null; // ISO date string
  date_fin: string | null; // ISO date string
  DPI_id: string; // Foreign key to DPI
}

export interface Medicament {
  id: number;
  nom: string;
  dosage: string;
  duree: string;
  ordonnance: number; // Foreign key to Ordonnance
}

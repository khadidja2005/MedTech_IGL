export interface Medicament {
  id: number;
  nom: string;
  dosage: string;
  duree: string;
  ordonnance: string; // Foreign key to Ordonnance
}

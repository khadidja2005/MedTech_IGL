export interface Mutuelle {
  id: number;
  patient_id: number; // Foreign key to Patient
  nom: string;
  numero_adherent: number;
  type_couverture: string;
  telephone: number;
  email: string;
}

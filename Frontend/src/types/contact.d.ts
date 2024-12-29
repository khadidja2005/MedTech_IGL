export interface Contact {
  id: number;
  nom_complet: string;
  relation: string;
  telephone: number;
  priorite: number;
  adresse: string;
  patient: string; // Foreign key to Patient
  email: string | null;
}

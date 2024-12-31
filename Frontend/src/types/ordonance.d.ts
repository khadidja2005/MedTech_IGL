export interface Ordonnance {
  id: number;
  estValide: boolean;
  estTerminer: boolean;
  consultation: number; // Foreign key to Consultation
  pharmacien_id: number | null; // Foreign key to PersonnelMedical
  etablissement: number;
}

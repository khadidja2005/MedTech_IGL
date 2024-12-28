export interface Ordonnance {
  id: number;
  estValide: boolean;
  estTerminer: boolean;
  consultation: string; // Foreign key to Consultation
  pharmacien_id: string; // Foreign key to PersonnelMedical
}

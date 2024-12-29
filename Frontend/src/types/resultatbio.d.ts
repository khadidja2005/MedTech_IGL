export interface ResultatBio {
  id: string;
  valeur_mesure: string;
  date_mesure: string; // ISO date string
  heure_mesure: string; // ISO time string
  parametre: string;
  norme: string;
  bilan_bio: number; // Foreign key to BilanBio
  laborantin: number;
}

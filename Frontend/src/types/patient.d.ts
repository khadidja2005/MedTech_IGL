export interface Patient {
  id: number;
  nss: string;
  nom_complet: string;
  date_naissance: string; // ISO date string
  adresse: string;
  telephone: number;
  email: string;
  password: string;
  lienPhoto: string;
  lieu_naissance: string;
  genre: string;
  statueMatrimonial: string;
}

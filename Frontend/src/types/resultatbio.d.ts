export interface ResultatBio {
<<<<<<< HEAD
    id: string;
    valeur_mesure: string;
    date_mesure: string; // ISO date string
    heure_mesure: string; // ISO time string
    parametre: string;
    norme: string;
    bilan_bio: string; // Foreign key to BilanBio
    laborantin: string; 
   
}
=======
  id: number;
  valeur_mesure: string;
  date_mesure: string; // ISO date string
  heure_mesure: string; // ISO time string
  parametre: string;
  norme: string;
  bilan_bio: string; // Foreign key to BilanBio
  laborantin: string; // Foreign key to PersonnelMedical
}
>>>>>>> 171d1ec9eab303e010f3075fd91ce940b712df3a

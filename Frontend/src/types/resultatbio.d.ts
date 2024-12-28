export interface ResultatBio {
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 5f0d9f979522c5b5947c25fbbca8ebf379e3497a
    id: string;
    valeur_mesure: string;
    date_mesure: string; // ISO date string
    heure_mesure: string; // ISO time string
    parametre: string;
    norme: string;
    bilan_bio: string; // Foreign key to BilanBio
    laborantin: string; 
   
}
<<<<<<< HEAD
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
=======
>>>>>>> 5f0d9f979522c5b5947c25fbbca8ebf379e3497a

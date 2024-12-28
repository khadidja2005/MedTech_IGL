export interface ResultatRadio {
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 5f0d9f979522c5b5947c25fbbca8ebf379e3497a
    id: string;
    description: string;
    piece_jointe: string;
    date: string; // ISO date string
    compte_rendu: string;
    radiologue_compte_rendu: string; // Foreign key to PersonnelMedical
    radiologue: string; // Foreign key to PersonnelMedical
    
}
<<<<<<< HEAD
=======
  id: number;
  description: string;
  piece_jointe: string;
  date: string; // ISO date string
  compte_rendu: string | null;
  radiologue_compte_rendu: string | null; // Foreign key to PersonnelMedical
  radiologue: string; // Foreign key to PersonnelMedical
}
>>>>>>> 171d1ec9eab303e010f3075fd91ce940b712df3a
=======
>>>>>>> 5f0d9f979522c5b5947c25fbbca8ebf379e3497a

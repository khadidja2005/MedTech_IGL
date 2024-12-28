export interface ResultatRadio {
  id: number;
  description: string;
  piece_jointe: string;
  date: string; // ISO date string
  compte_rendu: string | null;
  radiologue_compte_rendu: string | null; // Foreign key to PersonnelMedical
  radiologue: string; // Foreign key to PersonnelMedical
}

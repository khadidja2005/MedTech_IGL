export interface ResultatRadio {
    id: number;
    description: string;
    piece_jointe: string;
    date: string; // ISO date string
    compte_rendu: string;
    radiologue_compte_rendu: number; // Foreign key to PersonnelMedical
    radiologue: number; // Foreign key to PersonnelMedical
}

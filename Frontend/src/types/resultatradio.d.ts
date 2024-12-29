export interface ResultatRadio {
    id: string;
    description: string;
    piece_jointe: string;
    date: string; // ISO date string
    compte_rendu: string;
    radiologue_compte_rendu: string; // Foreign key to PersonnelMedical
    radiologue: string; // Foreign key to PersonnelMedical
    
}

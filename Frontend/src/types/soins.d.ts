export type TypeSoins = 'INFIRMIER' | 'RADIO' | 'LABO';

export interface Soins {
    id: string;
    date: string; // ISO date string
    heure: string; // ISO time string
    type_soins: TypeSoins;
    description: string;
    etat_patient: string;
    medicament: string;
    dose: string;
    hospitalisation: string; // Foreign key to Hospitalisation
    infermier: string | null; // Foreign key to PersonnelMedical, nullable
}
export interface Mutuelle {
    id: string;
    patient_id: string; // Foreign key to Patient
    nom: string;
    numero_adherent: number;
    type_couverture: string;
    telephone: number;
    email: string;
}

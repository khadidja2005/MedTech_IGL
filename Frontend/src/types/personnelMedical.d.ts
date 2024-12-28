export type PersonnelMedicalRole =
  | 'MEDECIN'
  | 'RADIOLOGUE'
  | 'LABORANTIN'
  | 'INFIRMIER'
  | 'PHARMACIEN';

export interface PersonnelMedical {
  id: number;
  lienPhoto: string;
  nom_complet: string;
  email: string;
  specialite: string;
  telephone: number;
  password: string;
  role: PersonnelMedicalRole;
}

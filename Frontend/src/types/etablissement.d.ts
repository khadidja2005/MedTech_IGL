export type TypeEtablissement = 'HOPITAL' | 'CLINIQUE' | 'CABINET';
export interface Etablissement {
  id: number;
  nom_etablissement: string;
  adresse: string;
  telephone: number;
  email: string;
  type: TypeEtablissement;
}

export interface EtablissementPersonnelMedical {
  id: number;
  etablissement: string; // Foreign key to Etablissement
  personnel_medical: string; // Foreign key to PersonnelMedical
}

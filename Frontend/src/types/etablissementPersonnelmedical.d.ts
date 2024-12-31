export interface EtablissementPersonnelMedical {
  id: number;
  etablissement: number; // Foreign key to Etablissement
  personnel_medical: number; // Foreign key to PersonnelMedical
}

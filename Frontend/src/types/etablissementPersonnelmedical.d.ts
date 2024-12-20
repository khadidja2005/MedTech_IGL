export interface EtablissementPersonnelMedical {
    id: string;
    etablissement: string; // Foreign key to Etablissement
    personnel_medical: string; // Foreign key to PersonnelMedical
}
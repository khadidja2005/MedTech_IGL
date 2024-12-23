from django.db import models


class Etablissement(models.Model):
    id = models.CharField(max_length=100, primary_key=True)
    nom_etablissement = models.CharField(max_length=200)
    adresse = models.CharField(max_length=100)
    telephone = models.IntegerField()
    email = models.EmailField(max_length=100)
    type = models.CharField(max_length=50)


class Admin(models.Model):
    id = models.CharField(max_length=100, primary_key=True)
    nom_complet = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    password = models.CharField(max_length=100)
    lienPhoto = models.URLField()


class PersonnelMedical(models.Model):
    class RoleChoices(models.TextChoices):
        MEDECIN = "MEDECIN", "Médecin"
        RADIOLOGUE = "RADIOLOGUE", "Radiologue"
        LABORANTIN = "LABORANTIN", "Laborantin"
        INFIRMIER = "INFIRMIER", "Infirmier"
        PHARMACIEN = "PHARMACIEN", "Pharmacien"

    id = models.CharField(max_length=100, primary_key=True)
    lienPhoto = models.URLField()
    nom_complet = models.CharField(max_length=200)
    email = models.EmailField(max_length=100)
    specialite = models.CharField(max_length=100)
    telephone = models.IntegerField()
    password = models.CharField(max_length=100)
    role = models.CharField(
        max_length=10,
        choices=RoleChoices.choices,
        default=RoleChoices.MEDECIN,
    )


class etablissement_personnel_medical(models.Model):
    id = models.CharField(max_length=100, primary_key=True)
    etablissement = models.ForeignKey(Etablissement, on_delete=models.CASCADE)
    personnel_medical = models.ForeignKey(PersonnelMedical, on_delete=models.CASCADE)


class Patient(models.Model):
    id = models.CharField(max_length=100, primary_key=True)
    nss = models.CharField(max_length=100)
    nom_complet = models.CharField(max_length=200)
    date_naissance = models.DateField()
    adresse = models.CharField(max_length=100)
    telephone = models.IntegerField()
    email = models.EmailField(max_length=100)
    password = models.CharField(max_length=100)
    lienPhoto = models.URLField()
    lieu_naissance = models.CharField(max_length=100)
    genre = models.CharField(max_length=100)
    statueMatrimonial = models.CharField(max_length=100)


class Mutuelle(models.Model):
    id = models.CharField(max_length=100, primary_key=True)
    patient_id = models.ForeignKey(Patient, on_delete=models.CASCADE)
    nom = models.CharField(max_length=100)
    numero_adherent = models.IntegerField()
    type_couverture = models.CharField(max_length=100)
    telephone = models.IntegerField()
    email = models.EmailField()


class Contact(models.Model):
    id = models.CharField(max_length=100, primary_key=True)
    nom_complet = models.CharField(max_length=200)
    relation = models.CharField(max_length=100)
    telephone = models.IntegerField()
    adresse = models.CharField(max_length=100)
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    email = models.EmailField()


class DPI(models.Model):
    id = models.CharField(max_length=100, primary_key=True)
    date_creation = models.DateField()
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    etablissement_id = models.ForeignKey(Etablissement, on_delete=models.CASCADE)
    createur_id = models.ForeignKey(Admin, on_delete=models.SET_NULL, null=True)


class Antecedent(models.Model):
    id = models.CharField(max_length=100, primary_key=True)
    type = models.CharField(max_length=100)
    nom = models.CharField(max_length=50)
    description = models.TextField()
    date_debut = models.DateField()
    date_fin = models.DateField()
    DPI_id = models.ForeignKey(DPI, on_delete=models.CASCADE)


class Hospitalisation(models.Model):
    id = models.CharField(max_length=100, primary_key=True)
    date_debut = models.DateField()
    date_fin = models.DateField()
    DPI = models.ForeignKey(DPI, on_delete=models.CASCADE)
    medecin_responsable = models.ForeignKey(PersonnelMedical, on_delete=models.CASCADE)


class Consultation(models.Model):
    id = models.CharField(max_length=100, primary_key=True)
    resume = models.TextField()
    date = models.DateField()
    Hospitalisation = models.ForeignKey(Hospitalisation, on_delete=models.CASCADE)
    Medecin = models.ForeignKey(PersonnelMedical, on_delete=models.CASCADE)


class Ordonnance(models.Model):
    id = models.CharField(max_length=100, primary_key=True)
    date = models.DateField()
    estValide = models.BooleanField(default=False)
    consultation = models.ForeignKey(Consultation, on_delete=models.CASCADE)
    pharmacien_id = models.ForeignKey(PersonnelMedical, on_delete=models.CASCADE)


class Medicament(models.Model):
    id = models.CharField(max_length=100, primary_key=True)
    nom = models.CharField(max_length=100)
    dosage = models.CharField(max_length=100)
    duree = models.CharField(max_length=100)
    ordonnance = models.ForeignKey(Ordonnance, on_delete=models.CASCADE)


class Soins(models.Model):
    class typeSoinsChoices(models.TextChoices):
        INFIRMIER = "INFIRMIER", "Infirmier"
        OBSERVATIONDETAT = (
            "OBSERVATION D'ETAT",
            "Observation d'etat",
        )
        ADMINISTRATION_MEDICAMENT = (
            "ADMINISTRATION DE MEDICAMENT",
            "Administration de medicament",
        )

        AUTRES = "AUTRES", "Autres"

    id = models.CharField(max_length=100, primary_key=True)
    date = models.DateField()
    heure = models.TimeField()
    type_soins = models.CharField(
        max_length=30,
        choices=typeSoinsChoices.choices,
        default=typeSoinsChoices.INFIRMIER,
    )
    description = models.TextField(null=True)
    etat_patient = models.CharField(max_length=100)
    medicament = models.CharField(max_length=100, null=True)
    dose = models.CharField(max_length=100, null=True)
    hospitalisation = models.ForeignKey(Hospitalisation, on_delete=models.CASCADE)
    infermier = models.ForeignKey(
        PersonnelMedical, on_delete=models.SET_NULL, null=True
    )


class BilanBio(models.Model):
    id = models.CharField(max_length=100, primary_key=True)
    date_debut = models.DateField()
    date_fin = models.DateField()
    parametres = models.TextField()
    est_complet = models.BooleanField(default=False)
    est_resultat = models.BooleanField(default=False)
    medecin = models.ForeignKey(PersonnelMedical, on_delete=models.CASCADE)
    Consultation = models.ForeignKey(Consultation, on_delete=models.SET_NULL, null=True)


class ResultatBio(models.Model):
    id = models.CharField(max_length=100, primary_key=True)
    valeur_mesure = models.CharField(max_length=100)
    date_mesure = models.DateField()
    heure_mesure = models.TimeField()
    parametre = models.CharField(max_length=100)
    norme = models.CharField(max_length=50)
    bilan_bio = models.ForeignKey(BilanBio, on_delete=models.CASCADE)
    laborantin = models.ForeignKey(PersonnelMedical, on_delete=models.CASCADE)


class ResultatRadio(models.Model):
    id = models.CharField(max_length=100, primary_key=True)
    description = models.TextField()
    piece_jointe = models.TextField()
    date = models.DateField()
    compte_rendu = models.TextField()
    radiologue_compte_rendu = models.ForeignKey(
        PersonnelMedical,
        on_delete=models.CASCADE,
        related_name="radiologue_compte_rendu",
    )
    radiologue = models.ForeignKey(
        PersonnelMedical, on_delete=models.CASCADE, related_name="radiologue"
    )


class BilanRadio(models.Model):
    class typeRadioChoices(models.TextChoices):
        RADIO = "RADIO", "Radio"
        SCANNER = "SCANNER", "Scanner"
        IRM = "IRM", "IRM"

    id = models.CharField(max_length=100, primary_key=True)
    date_debut = models.DateField()
    date_fin = models.DateField()
    type_radio = models.CharField(
        max_length=10,
        choices=typeRadioChoices.choices,
        default=typeRadioChoices.RADIO,
    )
    est_complet = models.BooleanField(default=False)
    est_resultat = models.BooleanField(default=False)
    description = models.TextField()
    medecin = models.ForeignKey(PersonnelMedical, on_delete=models.CASCADE)
    Consultation = models.ForeignKey(Consultation, on_delete=models.SET_NULL, null=True)
    resultat_id = models.ForeignKey(ResultatRadio, on_delete=models.CASCADE)

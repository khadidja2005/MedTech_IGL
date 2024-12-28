from django.db import models
from django.core.validators import MaxValueValidator


class Etablissement(models.Model):
    class TypeChoices(models.TextChoices):
        HOPITAL = "HOPITAL", "Hopital"
        CLINIQUE = "CLINIQUE", "Clinique"
        CABINET_MEDICAL = "CABINET MEDICAL", "Cabinet Medical"

    nom_etablissement = models.CharField(max_length=200)
    adresse = models.CharField(max_length=100)
    telephone = models.CharField(max_length=10)
    email = models.EmailField(max_length=100)
    type = models.CharField(
        max_length=50, choices=TypeChoices.choices, default=TypeChoices.HOPITAL
    )


class Admin(models.Model):
    nom_complet = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    telephone = models.CharField(
        max_length=10,
        null=True,
    )
    password = models.CharField(max_length=100)
    lienPhoto = models.URLField()


class PersonnelMedical(models.Model):
    class RoleChoices(models.TextChoices):
        MEDECIN = "MEDECIN", "Medecin"
        RADIOLOGUE = "RADIOLOGUE", "Radiologue"
        LABORANTIN = "LABORANTIN", "Laborantin"
        INFIRMIER = "INFIRMIER", "Infirmier"
        PHARMACIEN = "PHARMACIEN", "Pharmacien"

    lienPhoto = models.URLField()
    nom_complet = models.CharField(max_length=200)
    email = models.EmailField(max_length=100)
    specialite = models.CharField(max_length=100)
    telephone = models.CharField(max_length=10)
    password = models.CharField(max_length=100)
    role = models.CharField(
        max_length=10,
        choices=RoleChoices.choices,
        default=RoleChoices.MEDECIN,
    )


class etablissement_personnel_medical(models.Model):
    etablissement = models.ForeignKey(Etablissement, on_delete=models.CASCADE)
    personnel_medical = models.ForeignKey(PersonnelMedical, on_delete=models.CASCADE)


class Patient(models.Model):
    nss = models.CharField(max_length=100)
    nom_complet = models.CharField(max_length=200)
    date_naissance = models.DateField()
    adresse = models.CharField(max_length=100)
    telephone = models.CharField(max_length=10)
    email = models.EmailField(max_length=100)
    password = models.CharField(max_length=100)
    lienPhoto = models.URLField()
    lieu_naissance = models.CharField(max_length=100)
    genre = models.CharField(max_length=100)
    statueMatrimonial = models.CharField(max_length=100)


class Mutuelle(models.Model):
    patient_id = models.ForeignKey(Patient, on_delete=models.CASCADE)
    nom = models.CharField(max_length=100)
    numero_adherent = models.IntegerField()
    type_couverture = models.CharField(max_length=100)
    telephone = models.CharField(max_length=10)
    email = models.EmailField()


class Contact(models.Model):
    nom_complet = models.CharField(max_length=200)
    relation = models.CharField(max_length=100)
    priorite = models.IntegerField(default=0)
    telephone = models.CharField(max_length=10)
    adresse = models.CharField(max_length=100)
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    email = models.EmailField(null=True)


class DPI(models.Model):
    date_creation = models.DateField()

    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    etablissement_id = models.ForeignKey(Etablissement, on_delete=models.CASCADE)
    createur_id = models.ForeignKey(Admin, on_delete=models.SET_NULL, null=True)


class Antecedent(models.Model):
    type = models.CharField(max_length=100, null=True)
    nom = models.CharField(max_length=50)
    description = models.TextField(null=True)
    date_debut = models.DateField(null=True)
    date_fin = models.DateField(null=True)
    DPI_id = models.ForeignKey(DPI, on_delete=models.CASCADE)


class Hospitalisation(models.Model):
    date_debut = models.DateField()
    date_fin = models.DateField(null=True)
    DPI = models.ForeignKey(DPI, on_delete=models.CASCADE)
    medecin_responsable = models.ForeignKey(PersonnelMedical, on_delete=models.CASCADE)


class Consultation(models.Model):
    resume = models.TextField()
    date = models.DateField()
    Hospitalisation = models.ForeignKey(Hospitalisation, on_delete=models.CASCADE)
    Medecin = models.ForeignKey(PersonnelMedical, on_delete=models.CASCADE)


class Ordonnance(models.Model):
    estValide = models.BooleanField(default=False)
    estTerminer = models.BooleanField(default=False)
    consultation = models.ForeignKey(Consultation, on_delete=models.CASCADE)
    pharmacien_id = models.ForeignKey(
        PersonnelMedical, on_delete=models.CASCADE, null=True
    )


class Medicament(models.Model):
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

    date = models.DateField()
    heure = models.TimeField()
    type_soins = models.CharField(
        max_length=30,
        choices=typeSoinsChoices.choices,
        default=typeSoinsChoices.INFIRMIER,
    )
    description = models.TextField(null=True)
    medicament = models.CharField(max_length=100, null=True)
    dose = models.CharField(max_length=100, null=True)
    hospitalisation = models.ForeignKey(Hospitalisation, on_delete=models.CASCADE)
    infermier = models.ForeignKey(
        PersonnelMedical, on_delete=models.SET_NULL, null=True
    )


class BilanBio(models.Model):
    date_debut = models.DateField()
    date_fin = models.DateField(null=True)
    parametres = models.TextField(null=True)
    est_complet = models.BooleanField(default=False)
    est_resultat = models.BooleanField(default=False)
    Consultation = models.ForeignKey(Consultation, on_delete=models.SET_NULL, null=True)


class ResultatBio(models.Model):
    valeur_mesure = models.CharField(max_length=100)
    date_mesure = models.DateField()
    heure_mesure = models.TimeField()
    parametre = models.CharField(max_length=100)
    norme = models.CharField(max_length=50)
    bilan_bio = models.ForeignKey(BilanBio, on_delete=models.CASCADE)
    laborantin = models.ForeignKey(PersonnelMedical, on_delete=models.CASCADE)


class ResultatRadio(models.Model):
    piece_jointe = models.TextField()
    date = models.DateField()
    compte_rendu = models.TextField(null=True)
    radiologue_compte_rendu = models.ForeignKey(
        PersonnelMedical,
        on_delete=models.CASCADE,
        related_name="radiologue_compte_rendu",
        null=True,
    )
    radiologue = models.ForeignKey(
        PersonnelMedical, on_delete=models.CASCADE, related_name="radiologue"
    )


class BilanRadio(models.Model):
    class typeRadioChoices(models.TextChoices):
        RADIO = "RADIO", "Radio"
        SCANNER = "SCANNER", "Scanner"
        IRM = "IRM", "IRM"

    date_debut = models.DateField()
    date_fin = models.DateField(null=True)
    type_radio = models.CharField(
        max_length=10,
        choices=typeRadioChoices.choices,
        default=typeRadioChoices.RADIO,
    )
    est_complet = models.BooleanField(default=False)
    est_resultat = models.BooleanField(default=False)
    description = models.TextField()
    Consultation = models.ForeignKey(Consultation, on_delete=models.SET_NULL, null=True)
    resultat_id = models.ForeignKey(ResultatRadio, on_delete=models.CASCADE, null=True)

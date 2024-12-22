# Etablissements/models.py
from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Etablissement(models.Model):
    nom = models.CharField(max_length=255)
    adresse = models.TextField()
    email = models.EmailField(unique=True)
    telephone = models.CharField(max_length=15)

    def __str__(self):
        return self.nom


class PersonnelMedical(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    etablissement = models.ForeignKey(Etablissement, on_delete=models.CASCADE, related_name="personnel")

    def __str__(self):
        return f"{self.user.nom_complet} ({self.etablissement.nom})"


class DPI(models.Model):
    patient = models.ForeignKey(User, on_delete=models.CASCADE, limit_choices_to={'role': 'PATIENT'})
    etablissement = models.ForeignKey(Etablissement, on_delete=models.CASCADE, related_name="dossiers")
    medecin_referent = models.ForeignKey(PersonnelMedical, on_delete=models.CASCADE)

    def __str__(self):
        return f"DPI de {self.patient.nom_complet} - {self.etablissement.nom}"

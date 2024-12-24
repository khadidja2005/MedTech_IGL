# Consultations/models.py
from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Consultation(models.Model):
    id = models.CharField(max_length=100, primary_key=True)
    resume = models.TextField(null=True, blank=True)
    date_creation = models.DateTimeField(auto_now_add=True)
    medecin = models.ForeignKey(User, on_delete=models.CASCADE, limit_choices_to={'role': 'MEDECIN'})
    hospitalisation = models.ForeignKey('Hospitalisation', on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return f"Consultation {self.id} by {self.medecin.nom_complet}"

class BilanBio(models.Model):
    id = models.CharField(max_length=100, primary_key=True)
    date_debut = models.DateField()
    date_fin = models.DateField(null=True, blank=True)
    parametres = models.TextField()
    est_complet = models.BooleanField(default=False)
    medecin = models.ForeignKey(User, on_delete=models.CASCADE, limit_choices_to={'role': 'MEDECIN'})
    consultation = models.ForeignKey(Consultation, on_delete=models.SET_NULL, null=True)

class Ordonnance(models.Model):
    id = models.CharField(max_length=100, primary_key=True)
    date = models.DateField(auto_now_add=True)
    consultation = models.ForeignKey(Consultation, on_delete=models.CASCADE)
    est_valide = models.BooleanField(default=False)

class Antecedent(models.Model):
    id = models.CharField(max_length=100, primary_key=True)
    type = models.CharField(max_length=100)
    description = models.TextField()
    date_debut = models.DateField()
    date_fin = models.DateField(null=True, blank=True)
    patient = models.ForeignKey('Patient', on_delete=models.CASCADE)
    consultation = models.ForeignKey(Consultation, on_delete=models.CASCADE, null=True, blank=True)

class ResultatBio(models.Model):
    id = models.CharField(max_length=100, primary_key=True)
    details = models.TextField()
    bilan_bio = models.ForeignKey(BilanBio, on_delete=models.CASCADE)

class ResultatRadio(models.Model):
    id = models.CharField(max_length=100, primary_key=True)
    details = models.TextField()
    bilan_radio = models.ForeignKey('BilanRadio', on_delete=models.CASCADE)

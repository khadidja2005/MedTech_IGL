from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Consultation(models.Model):
    id = models.CharField(max_length=100, primary_key=True)
    resume = models.TextField(null=True, blank=True)
    date_creation = models.DateTimeField(auto_now_add=True)
    medecin = models.ForeignKey(
        User, 
        on_delete=models.CASCADE, 
        limit_choices_to={'role': 'MEDECIN'}, 
        related_name='consultations'
    )
    hospitalisation = models.ForeignKey(
        'Hospitalisation', 
        on_delete=models.CASCADE, 
        null=True, 
        blank=True, 
        related_name='consultations'
    )

    def __str__(self):
        return f"Consultation {self.id} by {self.medecin.nom_complet}"

class BilanBio(models.Model):
    id = models.CharField(max_length=100, primary_key=True)
    date_debut = models.DateField()
    date_fin = models.DateField(null=True, blank=True)
    parametres = models.TextField()
    est_complet = models.BooleanField(default=False)
    medecin = models.ForeignKey(
        User, 
        on_delete=models.CASCADE, 
        limit_choices_to={'role': 'MEDECIN'}, 
        related_name='bilans_bio'
    )
    consultation = models.ForeignKey(
        Consultation, 
        on_delete=models.SET_NULL, 
        null=True, 
        related_name='bilans_bio'
    )

    def __str__(self):
        return f"Bilan Bio {self.id}"

class Ordonnance(models.Model):
    id = models.CharField(max_length=100, primary_key=True)
    date = models.DateField(auto_now_add=True)
    consultation = models.ForeignKey(
        Consultation, 
        on_delete=models.CASCADE, 
        related_name='ordonnances'
    )
    est_valide = models.BooleanField(default=False)

    def __str__(self):
        return f"Ordonnance {self.id} - Consultation {self.consultation.id}"

class Antecedent(models.Model):
    id = models.CharField(max_length=100, primary_key=True)
    type = models.CharField(max_length=100)
    description = models.TextField()
    date_debut = models.DateField()
    date_fin = models.DateField(null=True, blank=True)
    patient = models.ForeignKey(
        'Patient', 
        on_delete=models.CASCADE, 
        related_name='antecedents'
    )
    consultation = models.ForeignKey(
        Consultation, 
        on_delete=models.CASCADE, 
        null=True, 
        blank=True, 
        related_name='antecedents'
    )

    def __str__(self):
        return f"Antécédent {self.type} - Patient {self.patient.nom_complet}"

class ResultatBio(models.Model):
    id = models.CharField(max_length=100, primary_key=True)
    details = models.TextField()
    bilan_bio = models.ForeignKey(
        BilanBio, 
        on_delete=models.CASCADE, 
        related_name='resultats_bio'
    )

    def __str__(self):
        return f"Résultat Bio {self.id}"

class ResultatRadio(models.Model):
    id = models.CharField(max_length=100, primary_key=True)
    details = models.TextField()
    bilan_radio = models.ForeignKey(
        'BilanRadio', 
        on_delete=models.CASCADE, 
        related_name='resultats_radio'
    )

    def __str__(self):
        return f"Résultat Radio {self.id}"
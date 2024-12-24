from django.db import models
from django.contrib.auth.models import User

# Consultation Model
class Consultation(models.Model):
    patient = models.ForeignKey('Patient', on_delete=models.CASCADE)
    medecin = models.ForeignKey('PersonnelMedical', on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)
    diagnostic = models.TextField()

    def __str__(self):
        return f"Consultation {self.id} - {self.patient.nom_complet}"

# Ordonnance Model
class Ordonnance(models.Model):
    STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('VALIDATED', 'Validated'),
        ('REJECTED', 'Rejected'),
    ]
    
    consultation = models.OneToOneField(Consultation, on_delete=models.CASCADE)
    medecin = models.ForeignKey('PersonnelMedical', on_delete=models.CASCADE)
    pharmacie = models.ForeignKey('PersonnelMedical', on_delete=models.SET_NULL, null=True, blank=True)
    date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='PENDING')

    def __str__(self):
        return f"Ordonnance {self.id} - {self.status}"

# Medicament Model
class Medicament(models.Model):
    ordonnance = models.ForeignKey(Ordonnance, on_delete=models.CASCADE)
    nom = models.CharField(max_length=200)
    dose = models.CharField(max_length=100)
    duree = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.nom} - {self.dose} - {self.duree}"

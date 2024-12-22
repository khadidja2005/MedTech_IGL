from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    telephone = models.CharField(max_length=15, blank=True, null=True)
    nom_complet = models.CharField(max_length=255)
    specialite = models.CharField(max_length=100, blank=True, null=True)  # For Medical Personnel only

    def __str__(self):
        return self.nom_complet

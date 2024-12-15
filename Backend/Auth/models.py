from django.db import models
from django.contrib.auth.hashers import make_password

class Admin(models.Model):
    id = models.CharField(max_length=100, primary_key=True)
    nom_complet = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, unique=True)
    password = models.CharField(max_length=256)

    def save(self, *args, **kwargs):
        if not self.password.startswith("$pbkdf2-sha256$"):
            self.password = make_password(self.password)
        super().save(*args, **kwargs)

class PersonnelMedical(models.Model):
    ROLE_CHOICES = [
        ('MEDECIN', 'Médecin'),
        ('RADIOLOGUE', 'Radiologue'),
        ('LABORANTIN', 'Laborantin'),
        ('INFIRMIER', 'Infirmier'),
    ]

    id = models.CharField(max_length=100, primary_key=True)
    nom_complet = models.CharField(max_length=200)
    email = models.EmailField(max_length=100, unique=True)
    password = models.CharField(max_length=256)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='MEDECIN')

    def save(self, *args, **kwargs):
        if not self.password.startswith("$pbkdf2-sha256$"):
            self.password = make_password(self.password)
        super().save(*args, **kwargs)

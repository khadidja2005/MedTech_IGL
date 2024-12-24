from django.db import models

class Etablissement(models.Model):
    id = models.AutoField(primary_key=True)
    nom = models.CharField(max_length=200)
    adresse = models.CharField(max_length=500)
    contact = models.CharField(max_length=100)

    def __str__(self):
        return self.nom


class Bilan(models.Model):
    TYPE_CHOICES = [
        ('EXAMEN', 'Examen'),
        ('RADIOLOGIE', 'Radiologie'),
        ('LABORATOIRE', 'Laboratoire'),
    ]
    
    id = models.AutoField(primary_key=True)
    date = models.DateTimeField()
    etablissement = models.ForeignKey(Etablissement, on_delete=models.CASCADE)
    type_bilan = models.CharField(max_length=100, choices=TYPE_CHOICES)
    description = models.TextField()

    def __str__(self):
        return f"Bilan {self.id} - {self.type_bilan}"


class BilanArchive(models.Model):
    bilan = models.ForeignKey(Bilan, on_delete=models.CASCADE)
    archived_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Archive of {self.bilan.id} - {self.archived_date}"

# Pharmacie/models.py
class Ordonnance(models.Model):
    id = models.CharField(max_length=100, primary_key=True)
    date = models.DateField(auto_now_add=True)
    consultation = models.ForeignKey('Consultation', on_delete=models.CASCADE)
    etablissement = models.ForeignKey('Etablissement', on_delete=models.CASCADE)
    est_archivee = models.BooleanField(default=False)

    def __str__(self):
        return f"Ordonnance {self.id}"

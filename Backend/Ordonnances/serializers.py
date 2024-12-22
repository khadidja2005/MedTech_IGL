from rest_framework import serializers
from .models import Ordonnance, Medicament, Consultation
from django.contrib.auth import get_user_model

class MedicamentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medicament
        fields = ['id', 'nom', 'dose', 'duree']

class OrdonnanceSerializer(serializers.ModelSerializer):
    medicaments = MedicamentSerializer(many=True, read_only=True)

    class Meta:
        model = Ordonnance
        fields = ['id', 'consultation', 'medecin', 'pharmacie', 'date', 'status', 'medicaments']

class ConsultationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Consultation
        fields = ['id', 'patient', 'medecin', 'date', 'diagnostic']

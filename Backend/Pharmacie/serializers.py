# Pharmacie/serializers.py
from rest_framework import serializers
from .models import Ordonnance

class OrdonnanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ordonnance
        fields = '__all__'

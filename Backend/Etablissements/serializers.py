# Etablissements/serializers.py
from rest_framework import serializers
from .models import Etablissement, PersonnelMedical, DPI
from django.contrib.auth import get_user_model

User = get_user_model()

class EtablissementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Etablissement
        fields = '__all__'


class PersonnelMedicalSerializer(serializers.ModelSerializer):
    class Meta:
        model = PersonnelMedical
        fields = '__all__'


class DPISerializer(serializers.ModelSerializer):
    class Meta:
        model = DPI
        fields = '__all__'

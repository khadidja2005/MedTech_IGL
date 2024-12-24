
# Consultations/serializers.py
from rest_framework import serializers
from .models import (
    Consultation, Ordonnance, Antecedent, BilanBio, ResultatBio, ResultatRadio
)

class ConsultationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Consultation
        fields = '__all__'

class OrdonnanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ordonnance
        fields = '__all__'

class AntecedentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Antecedent
        fields = '__all__'

class BilanBioSerializer(serializers.ModelSerializer):
    class Meta:
        model = BilanBio
        fields = '__all__'

    def validate(self, data):
        if data['date_fin'] and data['date_fin'] < data['date_debut']:
            raise serializers.ValidationError("La date de fin doit être supérieure à la date de début.")
        return data

class ResultatBioSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResultatBio
        fields = '__all__'

class ResultatRadioSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResultatRadio
        fields = '__all__'
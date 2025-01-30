from rest_framework import serializers
from .models import Consultation, Ordonnance, BilanBio, BilanRadio
from BDD.models import PersonnelMedical

class PersonnelMedicalSerializer(serializers.ModelSerializer):
    class Meta:
        model = PersonnelMedical
        fields = ['id', 'nom_complet']

class OrdonnanceSerializer(serializers.ModelSerializer):
    pharmacien_id = serializers.SerializerMethodField()
    
    class Meta:
        model = Ordonnance
        fields = ['id', 'estValide', 'estTerminer', 'pharmacien_id']
    
    def get_pharmacien_id(self, obj):
        return obj.pharmacien.nom_complet if obj.pharmacien else None

class BilanBioSerializer(serializers.ModelSerializer):
    type = serializers.SerializerMethodField()
    
    class Meta:
        model = BilanBio
        fields = ['id', 'est_resultat', 'est_complet', 'type']
    
    def get_type(self, obj):
        return 'bio'

class BilanRadioSerializer(serializers.ModelSerializer):
    type = serializers.SerializerMethodField()
    
    class Meta:
        model = BilanRadio
        fields = ['id', 'est_resultat', 'est_complet', 'type']
    
    def get_type(self, obj):
        return 'radio'

class ConsultationDetailSerializer(serializers.ModelSerializer):
    Medecin = serializers.SerializerMethodField()
    ordonnances = OrdonnanceSerializer(many=True, read_only=True)
    bilans_bio = BilanBioSerializer(many=True, read_only=True)
    bilans_radio = BilanRadioSerializer(many=True, read_only=True)

    class Meta:
        model = Consultation
        fields = ['id', 'date', 'resume', 'Medecin', 'ordonnances', 'bilans_bio', 'bilans_radio']
    
    def get_Medecin(self, obj):
        return obj.Medecin.nom_complet if obj.Medecin else None
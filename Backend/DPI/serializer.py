from rest_framework import serializers
from BDD.models import *

from BDD.serializer import *
class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ['id', 'nss', 'nom_complet', 'date_naissance', 'adresse', 
                 'telephone', 'email', 'password', 'lienPhoto', 'lieu_naissance', 
                 'genre', 'statueMatrimonial']

class EtablissementSerializer (serializers.ModelSerializer):
    class Meta :
        model = Etablissement
        field =  ['id', 'nom_etablissement', 'adresse', 'telephone', 
                 'email', 'type']


class AntecedantSerializer (serializers.ModelSerializer):
    class Meta :
        model = Antecedent
        fields = ['id', 'type', 'nom', 'description', 'date_debut', 
                 'date_fin', 'DPI_id']


class DPI_Serializer ( serializers.ModelSerializer):
    patient = PatientSerializer( source = 'patient_id' , read_only = True)
    etablissement = EtablissementSerializer(source='etablissement_id', read_only=True)
    medecin = PersonnelMedicalSerializer(source = "medecin_id" , read_only = True)
    class Meta : 
        model = DPI
        fields = ['id', 'date_creation', 'patient', 'etablissement', 'createur_id' , "medecin"]

class PersonnelMedicalSerializer(serializers.ModelSerializer):
    class Meta:
        model = PersonnelMedical
        fields = ['id', 'nom_complet', 'specialite', 'role']

class ConsultationSerializer(serializers.ModelSerializer):
    medecin = PersonnelMedicalSerializer(source='Medecin')
    
    class Meta:
        model = Consultation
        fields = ['id', 'resume', 'date', 'medecin']

class HospitalisationSerializer(serializers.ModelSerializer):
    medecin = PersonnelMedicalSerializer(source='medecin_responsable')
    consultations = ConsultationSerializer(many=True, read_only=True, source='consultation_set')

    class Meta:
        model = Hospitalisation
        fields = ['id', 'date_debut', 'date_fin', 'medecin', 'consultations']

class BilanBioSerializer(serializers.ModelSerializer):
    medecin = PersonnelMedicalSerializer()
    type = serializers.SerializerMethodField()

    class Meta:
        model = BilanBio
        fields = ['id', 'date_debut', 'date_fin', 'parametres', 'est_complet', 
                 'est_resultat', 'medecin', 'type']

    def get_type(self, obj):
        return 'BIO'

class BilanRadioSerializer(serializers.ModelSerializer):
    medecin = PersonnelMedicalSerializer()
    type = serializers.SerializerMethodField()

    class Meta:
        model = BilanRadio
        fields = ['id', 'date_debut', 'date_fin', 'type_radio', 'est_complet',
                 'est_resultat', 'description', 'medecin', 'type']

    def get_type(self, obj):
        return 'RADIO'


class MutuelleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mutuelle
        fields = ['id', 'patient_id', 'nom', 'numero_adherent', 
                 'type_couverture', 'telephone', 'email']

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ['id', 'nom_complet', 'relation', 'telephone', 
                 'adresse', 'patient', 'email']
from rest_framework import serializers
from BDD.models import *

class PersonnelMedicalSerializer(serializers.ModelSerializer):
    class Meta:
        model = PersonnelMedical
        fields = '__all__'

class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admin
        fields = '__all__'
class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = '__all__'

class AntecedentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Antecedent
        fields = '__all__'

class EtablissementSerializer (serializers.ModelSerializer):
    class Meta :
        model = Etablissement
        fields =  '__all__'
class SoinsSerializer(serializers.ModelSerializer):
    infirmier_info = PersonnelMedicalSerializer(source='infermier', read_only=True)

    class Meta:
        model = Soins
        fields = [
            'id', 'date', 'heure', 'type_soins',
            'description', 'medicament', 'dose',
            'hospitalisation', 'infermier', 'infirmier_info'
        ]
class DPI_Serializer ( serializers.ModelSerializer):
    patient_id = PatientSerializer( source = 'patient' , read_only = True)
    etablissement = EtablissementSerializer(source='etablissement_id', read_only=True)
    medecin = PersonnelMedicalSerializer(source = "medecin_id" , read_only = True)
    createur = AdminSerializer(source = "createur_id" , read_only = True)
    class Meta : 
        model = DPI
        fields = ['id', 'date_creation', 'patient_id', 'etablissement', 'createur' , "medecin"]        

class HospitalisationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hospitalisation
        fields = '__all__'

class BilanBioSerializer(serializers.ModelSerializer):
    type = serializers.SerializerMethodField()

    class Meta:
        model = BilanBio
        fields =  '__all__'

    def get_type(self, obj):
        return 'BIO'

class BilanRadioSerializer(serializers.ModelSerializer):
    type = serializers.SerializerMethodField()

    class Meta:
        model = BilanRadio
        fields =  '__all__'

    def get_type(self, obj):
        return 'RADIO'
    

class MutuelleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mutuelle
        fields = '__all__'
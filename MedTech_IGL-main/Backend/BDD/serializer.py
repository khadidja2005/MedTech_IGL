from rest_framework import serializers
from .models import (
    Etablissement, Admin, PersonnelMedical, Mutuelle, Patient, Contact,
    Antecedent, DPI, Hospitalisation, Consultation, Ordonnance, Medicament,
    Soins, BilanBio, ResultatBio, BilanRadio, ResultatRadio
)

class EtablissementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Etablissement
        fields = '__all__'

class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admin
        fields = '__all__'
        extra_kwargs = {
            'password': {'write_only': True}
        }

class PersonnelMedicalSerializer(serializers.ModelSerializer):
    class Meta:
        model = PersonnelMedical
        fields = '__all__'
        extra_kwargs = {
            'password': {'write_only': True}
        }

class MutuelleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mutuelle
        fields = '__all__'

class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = '__all__'
        extra_kwargs = {
            'password': {'write_only': True}
        }

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = '__all__'

class AntecedentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Antecedent
        fields = '__all__'

class DPISerializer(serializers.ModelSerializer):
    class Meta:
        model = DPI
        fields = '__all__'

class HospitalisationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hospitalisation
        fields = '__all__'

class ConsultationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Consultation
        fields = '__all__'

class OrdonnanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ordonnance
        fields = '__all__'

class MedicamentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medicament
        fields = '__all__'

class SoinsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Soins
        fields = '__all__'

class BilanBioSerializer(serializers.ModelSerializer):
    class Meta:
        model = BilanBio
        fields = '__all__'

class ResultatBioSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResultatBio
        fields = '__all__'

class BilanRadioSerializer(serializers.ModelSerializer):
    class Meta:
        model = BilanRadio
        fields = '__all__'

class ResultatRadioSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResultatRadio
        fields = '__all__'

# Nested Serializers for detailed views
class PatientDetailSerializer(serializers.ModelSerializer):
    contacts = ContactSerializer(many=True, read_only=True, source='contact_set')
    antecedents = AntecedentSerializer(many=True, read_only=True, source='antecedent_set')
    dpi = DPISerializer(read_only=True)
    mutuelle = MutuelleSerializer(read_only=True)

    class Meta:
        model = Patient
        fields = '__all__'
        extra_kwargs = {
            'password': {'write_only': True}
        }

class ConsultationDetailSerializer(serializers.ModelSerializer):
    ordonnances = OrdonnanceSerializer(many=True, read_only=True, source='ordonnance_set')
    medecin = PersonnelMedicalSerializer(read_only=True)

    class Meta:
        model = Consultation
        fields = '__all__'

class HospitalisationDetailSerializer(serializers.ModelSerializer):
    consultations = ConsultationSerializer(many=True, read_only=True, source='consultation_set')
    soins = SoinsSerializer(many=True, read_only=True, source='soins_set')

    class Meta:
        model = Hospitalisation
        fields = '__all__'
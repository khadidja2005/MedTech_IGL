from rest_framework import serializers
from BDD.models import Soins, PersonnelMedical

class PersonnelMedicalSerializer(serializers.ModelSerializer):
    class Meta:
        model = PersonnelMedical
        fields = ['id', 'nom_complet', 'specialite', 'role']

class SoinsSerializer(serializers.ModelSerializer):
    infirmier_info = PersonnelMedicalSerializer(source='infermier', read_only=True)

    class Meta:
        model = Soins
        fields = [
            'id', 'date', 'heure', 'type_soins',
            'description', 'medicament', 'dose',
            'hospitalisation', 'infermier', 'infirmier_info'
        ]
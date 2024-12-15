from rest_framework import serializers
from .models import Admin, PersonnelMedical

class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admin
        fields = '__all__'
        extra_kwargs = {'password': {'write_only': True}}

class PersonnelMedicalSerializer(serializers.ModelSerializer):
    class Meta:
        model = PersonnelMedical
        fields = '__all__'
        extra_kwargs = {'password': {'write_only': True}}

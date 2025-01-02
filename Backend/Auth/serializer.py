from rest_framework import serializers
from BDD.models import *
class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

class UserSerializer(serializers.Serializer):
    email = serializers.EmailField()
    nom_complet = serializers.CharField()
    role = serializers.CharField(read_only=True)
    token = serializers.CharField(read_only=True)
class AdminSignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admin
        fields = ['id' , 'nom_complet', 'email', 'telephone', 'password', 'lienPhoto']
        extra_kwargs = {'password': {'write_only': True}}

class PersonnelMedicalSignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = PersonnelMedical
        fields = ['id' ,'nom_complet', 'email', 'specialite', 'telephone', 'password', 'role', 'lienPhoto']
        extra_kwargs = {'password': {'write_only': True}}

class PatientSignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ['id' ,'nss', 'nom_complet', 'date_naissance', 'adresse', 'telephone', 'email', 
                 'password', 'lienPhoto', 'lieu_naissance', 'genre', 'statueMatrimonial']
        extra_kwargs = {'password': {'write_only': True}}    
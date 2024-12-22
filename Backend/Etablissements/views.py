# Etablissements/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import Etablissement, PersonnelMedical, DPI
from .serializers import EtablissementSerializer, PersonnelMedicalSerializer, DPISerializer
from django.contrib.auth import get_user_model

User = get_user_model()


class EtablissementDetailView(APIView):
    def get(self, request, etablissement_id):
        """Afficher toutes les informations d'un établissement."""
        etablissement = get_object_or_404(Etablissement, id=etablissement_id)
        serializer = EtablissementSerializer(etablissement)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, etablissement_id):
        """Mettre à jour les informations d'un établissement (admin uniquement)."""
        etablissement = get_object_or_404(Etablissement, id=etablissement_id)
        serializer = EtablissementSerializer(etablissement, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, etablissement_id):
        """Supprimer un établissement (admin uniquement)."""
        etablissement = get_object_or_404(Etablissement, id=etablissement_id)
        etablissement.delete()
        return Response({"message": "Établissement supprimé avec succès"}, status=status.HTTP_204_NO_CONTENT)


class AddPersonnelMedicalView(APIView):
    def post(self, request, etablissement_id):
        """Ajouter un personnel médical existant à un établissement."""
        etablissement = get_object_or_404(Etablissement, id=etablissement_id)
        user_id = request.data.get('user_id')
        user = get_object_or_404(User, id=user_id, role='MEDECIN')
        
        personnel = PersonnelMedical(user=user, etablissement=etablissement)
        personnel.save()
        serializer = PersonnelMedicalSerializer(personnel)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class CreatePersonnelMedicalView(APIView):
    def post(self, request, etablissement_id):
        """Créer un personnel médical qui appartient à un établissement (admin uniquement)."""
        etablissement = get_object_or_404(Etablissement, id=etablissement_id)
        data = request.data
        user = User.objects.create(
            username=data['username'],
            email=data['email'],
            role='MEDECIN'
        )
        user.set_password(data['password'])
        user.save()
        
        personnel = PersonnelMedical(user=user, etablissement=etablissement)
        personnel.save()
        serializer = PersonnelMedicalSerializer(personnel)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class CreateDPIView(APIView):
    def post(self, request, etablissement_id):
        """Créer un DPI pour un patient appartenant à l'établissement."""
        etablissement = get_object_or_404(Etablissement, id=etablissement_id)
        patient_id = request.data.get('patient_id')
        medecin_id = request.data.get('medecin_id')

        patient = get_object_or_404(User, id=patient_id, role='PATIENT')
        medecin = get_object_or_404(PersonnelMedical, id=medecin_id, etablissement=etablissement)
        
        dpi = DPI(patient=patient, etablissement=etablissement, medecin_referent=medecin)
        dpi.save()
        serializer = DPISerializer(dpi)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

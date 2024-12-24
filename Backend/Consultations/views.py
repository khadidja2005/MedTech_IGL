# Consultations/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from .permissions import IsMedecinOrAdmin
from .models import (
    Consultation, BilanBio, BilanRadio, ResultatBio, ResultatRadio,
    Ordonnance, Antecedent
)
from .serializers import (
    ConsultationSerializer, OrdonnanceSerializer, AntecedentSerializer,
    BilanBioSerializer, ResultatBioSerializer, ResultatRadioSerializer
)

class ConsultationDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, consultation_id):
        consultation = get_object_or_404(Consultation, id=consultation_id)
        serializer = ConsultationSerializer(consultation)
        return Response(serializer.data, status=status.HTTP_200_OK)

class ConsultationCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = ConsultationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ConsultationUpdateResumeView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, consultation_id):
        consultation = get_object_or_404(Consultation, id=consultation_id)
        consultation.resume = request.data.get('resume', consultation.resume)
        consultation.save()
        return Response({"message": "Résumé mis à jour avec succès"}, status=status.HTTP_200_OK)

    def delete(self, request, consultation_id):
        consultation = get_object_or_404(Consultation, id=consultation_id)
        consultation.resume = ""
        consultation.save()
        return Response({"message": "Résumé supprimé avec succès"}, status=status.HTTP_200_OK)

class ConsultationDeleteView(APIView):
    permission_classes = [IsAuthenticated, IsMedecinOrAdmin]

    def delete(self, request, consultation_id):
        consultation = get_object_or_404(Consultation, id=consultation_id)
        consultation.delete()
        return Response({"message": "Consultation supprimée avec succès"}, status=status.HTTP_200_OK)

class OrdonnanceListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, consultation_id):
        ordonnances = Ordonnance.objects.filter(consultation_id=consultation_id)
        serializer = OrdonnanceSerializer(ordonnances, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class OrdonnanceCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, consultation_id):
        data = request.data
        data['consultation'] = consultation_id
        serializer = OrdonnanceSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class BilanListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, consultation_id):
        bilans_bio = BilanBio.objects.filter(consultation_id=consultation_id)
        bilans_radio = BilanRadio.objects.filter(consultation_id=consultation_id)

        bio_serializer = BilanBioSerializer(bilans_bio, many=True)
        radio_serializer = BilanRadioSerializer(bilans_radio, many=True)

        return Response({
            "bilans_biologiques": bio_serializer.data,
            "bilans_radiologiques": radio_serializer.data
        }, status=status.HTTP_200_OK)

class ResultatBioCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, bilan_id):
        data = request.data
        data['bilan_bio'] = bilan_id
        serializer = ResultatBioSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ResultatRadioCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, bilan_id):
        data = request.data
        data['bilan_radio'] = bilan_id
        serializer = ResultatRadioSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AntecedentListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, patient_id):
        antecedents = Antecedent.objects.filter(patient_id=patient_id)
        serializer = AntecedentSerializer(antecedents, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class AntecedentCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, patient_id):
        data = request.data
        data['patient'] = patient_id
        serializer = AntecedentSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

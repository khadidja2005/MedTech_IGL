from rest_framework import viewsets, permissions
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import (
    Etablissement, Admin, PersonnelMedical, Mutuelle, Patient, Contact,
    Antecedent, DPI, Hospitalisation, Consultation, Ordonnance, Medicament,
    Soins, BilanBio, ResultatBio, BilanRadio, ResultatRadio
)
from .serializer import (
    EtablissementSerializer, AdminSerializer, PersonnelMedicalSerializer,
    MutuelleSerializer, PatientSerializer, PatientDetailSerializer,
    ContactSerializer, AntecedentSerializer, DPISerializer,
    HospitalisationSerializer, ConsultationSerializer, OrdonnanceSerializer,
    MedicamentSerializer, SoinsSerializer, BilanBioSerializer,
    ResultatBioSerializer, BilanRadioSerializer, ResultatRadioSerializer
)

class EtablissementViewSet(viewsets.ModelViewSet):
    queryset = Etablissement.objects.all()
    serializer_class = EtablissementSerializer
    permission_classes = [permissions.IsAuthenticated]

class AdminViewSet(viewsets.ModelViewSet):
    queryset = Admin.objects.all()
    serializer_class = AdminSerializer
    permission_classes = [permissions.IsAuthenticated]

class PersonnelMedicalViewSet(viewsets.ModelViewSet):
    queryset = PersonnelMedical.objects.all()
    serializer_class = PersonnelMedicalSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = PersonnelMedical.objects.all()
        role = self.request.query_params.get('role', None)
        if role is not None:
            queryset = queryset.filter(role=role)
        return queryset

class MutuelleViewSet(viewsets.ModelViewSet):
    queryset = Mutuelle.objects.all()
    serializer_class = MutuelleSerializer
    permission_classes = [permissions.IsAuthenticated]

class PatientViewSet(viewsets.ModelViewSet):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return PatientDetailSerializer
        return PatientSerializer

    def get_queryset(self):
        queryset = Patient.objects.all()
        nss = self.request.query_params.get('nss', None)
        if nss is not None:
            queryset = queryset.filter(nss=nss)
        return queryset

class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = Contact.objects.all()
        patient_id = self.request.query_params.get('patient', None)
        if patient_id is not None:
            queryset = queryset.filter(patient_id=patient_id)
        return queryset

class AntecedentViewSet(viewsets.ModelViewSet):
    queryset = Antecedent.objects.all()
    serializer_class = AntecedentSerializer
    permission_classes = [permissions.IsAuthenticated]

class DPIViewSet(viewsets.ModelViewSet):
    queryset = DPI.objects.all()
    serializer_class = DPISerializer
    permission_classes = [permissions.IsAuthenticated]

class HospitalisationViewSet(viewsets.ModelViewSet):
    queryset = Hospitalisation.objects.all()
    serializer_class = HospitalisationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = Hospitalisation.objects.all()
        dpi_id = self.request.query_params.get('dpi', None)
        if dpi_id is not None:
            queryset = queryset.filter(DPI_id=dpi_id)
        return queryset

class ConsultationViewSet(viewsets.ModelViewSet):
    queryset = Consultation.objects.all()
    serializer_class = ConsultationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = Consultation.objects.all()
        hospitalisation_id = self.request.query_params.get('hospitalisation', None)
        medecin_id = self.request.query_params.get('medecin', None)
        if hospitalisation_id is not None:
            queryset = queryset.filter(Hospitalisation_id=hospitalisation_id)
        if medecin_id is not None:
            queryset = queryset.filter(Medecin_id=medecin_id)
        return queryset

class OrdonnanceViewSet(viewsets.ModelViewSet):
    queryset = Ordonnance.objects.all()
    serializer_class = OrdonnanceSerializer
    permission_classes = [permissions.IsAuthenticated]

class MedicamentViewSet(viewsets.ModelViewSet):
    queryset = Medicament.objects.all()
    serializer_class = MedicamentSerializer
    permission_classes = [permissions.IsAuthenticated]

class SoinsViewSet(viewsets.ModelViewSet):
    queryset = Soins.objects.all()
    serializer_class = SoinsSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = Soins.objects.all()
        type_soins = self.request.query_params.get('type', None)
        if type_soins is not None:
            queryset = queryset.filter(type_soins=type_soins)
        return queryset

class BilanBioViewSet(viewsets.ModelViewSet):
    queryset = BilanBio.objects.all()
    serializer_class = BilanBioSerializer
    permission_classes = [permissions.IsAuthenticated]

class ResultatBioViewSet(viewsets.ModelViewSet):
    queryset = ResultatBio.objects.all()
    serializer_class = ResultatBioSerializer
    permission_classes = [permissions.IsAuthenticated]

class BilanRadioViewSet(viewsets.ModelViewSet):
    queryset = BilanRadio.objects.all()
    serializer_class = BilanRadioSerializer
    permission_classes = [permissions.IsAuthenticated]

class ResultatRadioViewSet(viewsets.ModelViewSet):
    queryset = ResultatRadio.objects.all()
    serializer_class = ResultatRadioSerializer
    permission_classes = [permissions.IsAuthenticated]
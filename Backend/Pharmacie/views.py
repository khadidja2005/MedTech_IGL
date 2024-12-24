# Pharmacie/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Ordonnance
from .serializers import OrdonnanceSerializer

class OrdonnanceListView(APIView):
    def get(self, request):
        date_debut = request.GET.get('date_debut')
        date_fin = request.GET.get('date_fin')
        etablissement_id = request.GET.get('etablissement')
        
        ordonnances = Ordonnance.objects.all()
        
        if date_debut:
            ordonnances = ordonnances.filter(date__gte=date_debut)
        if date_fin:
            ordonnances = ordonnances.filter(date__lte=date_fin)
        if etablissement_id:
            ordonnances = ordonnances.filter(etablissement_id=etablissement_id)
        
        serializer = OrdonnanceSerializer(ordonnances, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class OrdonnanceArchiveListView(APIView):
    def get(self, request):
        ordonnances_archivees = Ordonnance.objects.filter(est_archivee=True)
        serializer = OrdonnanceSerializer(ordonnances_archivees, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class OrdonnanceResetFiltersView(APIView):
    def get(self, request):
        ordonnances = Ordonnance.objects.all()
        serializer = OrdonnanceSerializer(ordonnances, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

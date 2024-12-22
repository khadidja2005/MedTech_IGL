from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import render
from datetime import datetime
from .models import Bilan, BilanArchive, Etablissement
from .serializers import BilanSerializer, BilanArchiveSerializer, EtablissementSerializer

class HomePageView(APIView):
    def get(self, request):
        # Get all Bilans, Bilans Archive, and Etablissements
        bilans = Bilan.objects.all()
        archives = BilanArchive.objects.all()
        etablissements = Etablissement.objects.all()

        bilan_serializer = BilanSerializer(bilans, many=True)
        archive_serializer = BilanArchiveSerializer(archives, many=True)
        etablissement_serializer = EtablissementSerializer(etablissements, many=True)

        return Response({
            'bilans': bilan_serializer.data,
            'archives': archive_serializer.data,
            'etablissements': etablissement_serializer.data
        })


class FilterBilanView(APIView):
    def post(self, request):
        start_date = request.data.get('start_date')
        end_date = request.data.get('end_date')
        etablissement_id = request.data.get('etablissement')

        # Filter Bilans based on the provided parameters
        filtered_bilans = Bilan.objects.all()

        if start_date:
            filtered_bilans = filtered_bilans.filter(date__gte=start_date)
        if end_date:
            filtered_bilans = filtered_bilans.filter(date__lte=end_date)
        if etablissement_id:
            filtered_bilans = filtered_bilans.filter(etablissement_id=etablissement_id)

        bilan_serializer = BilanSerializer(filtered_bilans, many=True)
        return Response(bilan_serializer.data)


class ResetFilterView(APIView):
    def post(self, request):
        # Simply return all Bilans when reset is triggered
        bilans = Bilan.objects.all()
        bilan_serializer = BilanSerializer(bilans, many=True)
        return Response(bilan_serializer.data)


# Views to render HTML pages (for frontend)
def laboratoire_home(request):
    etablissements = Etablissement.objects.all()
    return render(request, 'laboratoire/home.html', {
        'etablissements': etablissements
    })

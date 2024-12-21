from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Ordonnance, Medicament, Consultation
from .serializers import OrdonnanceSerializer, MedicamentSerializer
from django.shortcuts import get_object_or_404

class OrdonnanceDetailView(APIView):
    def get(self, request, ordonnance_id):
        ordonnance = get_object_or_404(Ordonnance, id=ordonnance_id)
        serializer = OrdonnanceSerializer(ordonnance)
        return Response(serializer.data)

    def put(self, request, ordonnance_id):
        ordonnance = get_object_or_404(Ordonnance, id=ordonnance_id)
        if ordonnance.status == 'VALIDATED':
            return Response({"error": "Cannot edit a validated ordonnance"}, status=status.HTTP_400_BAD_REQUEST)

        # Update ordonnance details if medecin changes them
        ordonnance_data = request.data
        if ordonnance_data.get('medecin'):
            ordonnance.medecin = ordonnance_data['medecin']
        
        ordonnance.save()

        return Response({"message": "Ordonnance updated successfully"}, status=status.HTTP_200_OK)

    def delete(self, request, ordonnance_id):
        ordonnance = get_object_or_404(Ordonnance, id=ordonnance_id)
        if ordonnance.status == 'VALIDATED':
            return Response({"error": "Cannot delete a validated ordonnance"}, status=status.HTTP_400_BAD_REQUEST)
        
        ordonnance.delete()
        return Response({"message": "Ordonnance deleted successfully"}, status=status.HTTP_204_NO_CONTENT)

class AddMedicamentView(APIView):
    def post(self, request, ordonnance_id):
        ordonnance = get_object_or_404(Ordonnance, id=ordonnance_id)
        if ordonnance.status == 'VALIDATED':
            return Response({"error": "Cannot add medicament to a validated ordonnance"}, status=status.HTTP_400_BAD_REQUEST)

        medicament_data = request.data
        medicament = Medicament.objects.create(
            ordonnance=ordonnance,
            nom=medicament_data['nom'],
            dose=medicament_data['dose'],
            duree=medicament_data['duree']
        )
        return Response({"message": "Medicament added successfully"}, status=status.HTTP_201_CREATED)

class RemoveMedicamentView(APIView):
    def delete(self, request, ordonnance_id, medicament_id):
        ordonnance = get_object_or_404(Ordonnance, id=ordonnance_id)
        if ordonnance.status == 'VALIDATED':
            return Response({"error": "Cannot remove medicament from a validated ordonnance"}, status=status.HTTP_400_BAD_REQUEST)

        medicament = get_object_or_404(Medicament, id=medicament_id, ordonnance=ordonnance)
        medicament.delete()
        return Response({"message": "Medicament removed successfully"}, status=status.HTTP_204_NO_CONTENT)

class ValidateOrdonnanceView(APIView):
    def post(self, request, ordonnance_id):
        ordonnance = get_object_or_404(Ordonnance, id=ordonnance_id)
        if ordonnance.status == 'VALIDATED':
            return Response({"error": "Ordonnance already validated"}, status=status.HTTP_400_BAD_REQUEST)

        ordonnance.status = 'VALIDATED'
        ordonnance.pharmacie = request.user  # Assuming the pharmacie is the current logged-in user
        ordonnance.save()

        return Response({"message": "Ordonnance validated successfully"}, status=status.HTTP_200_OK)

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from BDD.models import Soins, DPI, Hospitalisation, PersonnelMedical
from .serializer import SoinsSerializer , PersonnelMedicalSerializer
@api_view(['GET'])
def get_all_soins(request):
    """Get all soins for a DPI"""
    # Get all hospitalisations for this DPI
    hospitalisations = Hospitalisation.objects.filter(DPI_id=request.get('dpi_id'))
    
    # Get all soins for these hospitalisations
    soins = Soins.objects.filter(hospitalisation__in=hospitalisations)\
                        .order_by('-date', '-heure')
    
    serializer = SoinsSerializer(soins, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_soin_by_id(request, soin_id ):
    """
    Get specific soin (medical care record) by ID.
    Verifies user has permission to access this medical record.
    """
    # Get the soin object
    soin = get_object_or_404(Soins, id=soin_id)
    
    # Get the associated DPI through hospitalisation
    dpi = soin.hospitalisation.DPI

    serializer = SoinsSerializer(soin)
    return Response(serializer.data)

@api_view(['POST'])
def add_soin(request):
    """Add new soin to a hospitalisation in DPI"""
    data = request.data.copy()
    
    # Verify hospitalisation belongs to DPI
    hospitalisation = get_object_or_404(
        Hospitalisation,
        id=data.get('hospitalisation'),
        DPI_id=request.get('dpi_id')
    )
    
    # Get infirmier if provided
    if data.get('infermier'):
        infirmier = get_object_or_404(
            PersonnelMedical,
            id=data.get('infermier'),
            role=PersonnelMedical.RoleChoices.INFIRMIER
        )
    else:
        infirmier = None

    serializer = SoinsSerializer(data=data)
    if serializer.is_valid():
        serializer.save(
            hospitalisation=hospitalisation,
            infermier=infirmier
        )
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["PUT"])
def update_soin(request, soin_id ):
        # Get the existing Soins object or return 404
        soins = get_object_or_404(Soins, pk=soin_id)
        
        # List of all possible fields that can be updated
        updatable_fields = [
            'date',
            'heure',
            'type_soins',
            'description',
            'medicament',
            'dose',
            'hospitalisation',
            'infermier'
        ]
        
        # Only update fields that are present in the request data
        for field in updatable_fields:
            if field in request.data:
                # Handle foreign key fields
                if field in ['hospitalisation', 'infermier']:
                    # Get the ID from the request data
                    related_id = request.data.get(field)
                    if related_id:
                        if field == 'hospitalisation':
                            try:
                                related_obj = Hospitalisation.objects.get(pk=related_id)
                                setattr(soins, field, related_obj)
                            except Hospitalisation.DoesNotExist:
                                return Response(
                                    {"error": f"Hospitalisation with id {related_id} does not exist"},
                                    status=status.HTTP_400_BAD_REQUEST
                                )
                        elif field == 'infermier':
                            try:
                                related_obj = PersonnelMedical.objects.get(pk=related_id)
                                setattr(soins, field, related_obj)
                            except PersonnelMedical.DoesNotExist:
                                return Response(
                                    {"error": f"PersonnelMedical with id {related_id} does not exist"},
                                    status=status.HTTP_400_BAD_REQUEST
                                )
                else:
                    # For non-foreign key fields, simply set the value
                    setattr(soins, field, request.data[field])
        
        try:
            soins.full_clean()  # Validate the model
            soins.save()
            return Response({
                "message": "Soins updated successfully",
                "id": soins.pk
            }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({
                "error": str(e)
            }, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_soin(request , soin_id):
    """Delete a soin"""
    soin = get_object_or_404(
        Soins,
        id=soin_id,
    )
    soin.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

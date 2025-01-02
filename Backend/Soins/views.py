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
def get_soin_by_id(request, soin_id , dpi_id):
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

@api_view(['PUT'])
def update_soin(request):
    """Update existing soin"""
    soin = get_object_or_404(
        Soins,
        id=request.get('soin_id'),
        hospitalisation__DPI_id=request.get('dpi_id')
    )
    
    data = request.data.copy()
    
    # Update infirmier if provided
    if data.get('infermier'):
        infirmier = get_object_or_404(
            PersonnelMedical,
            id=data.get('infermier'),
            role=PersonnelMedical.RoleChoices.INFIRMIER
        )
        data['infermier'] = infirmier.id

    serializer = SoinsSerializer(soin, data=data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_soin(request):
    """Delete a soin"""
    soin = get_object_or_404(
        Soins,
        id=request.get('soin_id'),
        hospitalisation__DPI_id=request.get('dpi_id')
    )
    soin.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

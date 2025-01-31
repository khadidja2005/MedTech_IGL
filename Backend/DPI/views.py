from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from BDD.models import *
import qrcode
import qrcode.image.svg
from io import BytesIO
import base64
from .serializer import PatientSerializer, EtablissementSerializer, DPI_Serializer , AntecedantSerializer , PersonnelMedicalSerializer , ConsultationSerializer , HospitalisationSerializer , BilanBioSerializer , BilanRadioSerializer , MutuelleSerializer , ContactSerializer

@api_view(["GET"])
def get_dpi (request , dpi_id):
    try :
      dpi = get_object_or_404(DPI , id = dpi_id)
      serializer = DPI_Serializer(dpi)
      return Response(serializer.data)
    except :
        return Response(status = status.HTTP_404_NOT_FOUND)


@api_view(['PUT'])
def update_dpi_etablissement(request):
    try :
      dpi = get_object_or_404(DPI , id = request.data.get('id'))
      new_etablissement = request.data.get('etablissement_id')
      dpi.etablissement_id = new_etablissement
      dpi.save()
      serializer = DPI_Serializer(dpi)  
      return Response(serializer.data , status = status.HTTP_200_OK)
    except:
       return Response(status = status.HTTP_404_NOT_FOUND)

@api_view(['PUT'])
def update_patient_info (request ):
   try :
      dpi = get_object_or_404(DPI , id = request.data.get('id'))
      patient = dpi.patient
      serializer = PatientSerializer(patient , data = request.data , partial = True)
      if serializer.is_valid():
            serializer.save()
            return Response(serializer.data , status = status.HTTP_200_OK)
      return Response(serializer.errors , status = status.HTTP_400_BAD_REQUEST)
   except :
         return Response(status = status.HTTP_404_NOT_FOUND)

@api_view(['PUT'])
def update_antecedant(request ):
    try :
        dpi = get_object_or_404(DPI , id = request.data.get('id'))
        antecedant = get_object_or_404(Antecedent , id = request.data.get('id'))
        serializer = AntecedantSerializer(antecedant , data = request.data , partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data , status = status.HTTP_200_OK)
        return Response(serializer.errors , status = status.HTTP_400_BAD_REQUEST)
    except :
        return Response(status = status.HTTP_404_NOT_FOUND)   
    
@api_view(["DELETE"])
def delete_antecedant(request):
    try :
        antecedant = get_object_or_404(Antecedent , id = request.data.get('antecedent_id'))
        antecedant.delete()
        return Response(status = status.HTTP_200_OK)
    except :
        return Response(status = status.HTTP_404_NOT_FOUND)

@api_view(["DELETE"])
def delete_dpi(request):
    try :
        dpi = get_object_or_404(DPI , id = request.data.get('id'))
        dpi.delete()
        return Response(status = status.HTTP_200_OK)
    except :
        return Response(status = status.HTTP_404_NOT_FOUND)    


@api_view(['POST'])
def add_antecedant(request):
    try :
        dpi = get_object_or_404(DPI , id = request.data.get('id'))
        serializer = AntecedantSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data , status = status.HTTP_201_CREATED)
        return Response(serializer.errors , status = status.HTTP_400_BAD_REQUEST)
    except :
        return Response(status = status.HTTP_404_NOT_FOUND)


@api_view(["PUT"])
def update_antecedent (request):
    try :
        antecedent = get_object_or_404(Antecedent , id = request.data.get('id'))
        serializer = AntecedantSerializer(antecedent , data = request.data , partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data , status = status.HTTP_200_OK)
        return Response(serializer.errors , status = status.HTTP_400_BAD_REQUEST)
    except :
        return Response(status = status.HTTP_404_NOT_FOUND) 

@api_view(["DELETE"])
def delete_antecedent(request):
    try :
        antecedent = get_object_or_404(Antecedent , id = request.data.get('id'))
        antecedent.delete()
        return Response(status = status.HTTP_200_OK)
    except :
        return Response(status = status.HTTP_404_NOT_FOUND)    


@api_view(['GET'])
def get_hospitalisations(request):
    """Get all hospitalisations for a DPI"""
    hospitalisations = Hospitalisation.objects.filter(DPI_id=request.data.get("dpi_id")).order_by('-date_debut')
    serializer = HospitalisationSerializer(hospitalisations, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def add_hospitalisation(request, dpi_id):
    """Add new hospitalisation to DPI"""
    data = request.data.copy()
    dpi = get_object_or_404(DPI, id=request.data.get('dpi_id'))
    medecin = get_object_or_404(PersonnelMedical, id=data.get('medecin_id'))

    hospitalisation = Hospitalisation.objects.create(
        DPI=dpi,
        date_debut=data['date_debut'],
        date_fin=data.get('date_fin'),  # Optional
        medecin_responsable=medecin
    )
    
    serializer = HospitalisationSerializer(hospitalisation)
    return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['GET'])
def get_all_bilans(request):
    """Get all bilans (bio and radio) for a DPI in chronological order"""
    # Get consultations for this DPI
    consultations = Consultation.objects.filter(Hospitalisation__DPI_id=request.data.get("dpi_id"))
    
    # Get both types of bilans
    bilans_bio = BilanBio.objects.filter(Consultation__in=consultations)
    bilans_radio = BilanRadio.objects.filter(Consultation__in=consultations)
    
    # Serialize both types
    bio_serializer = BilanBioSerializer(bilans_bio, many=True)
    radio_serializer = BilanRadioSerializer(bilans_radio, many=True)
    
    # Combine and sort by date
    all_bilans = sorted(
        bio_serializer.data + radio_serializer.data,
        key=lambda x: x['date_debut'],
        reverse=True
    )
    
    return Response(all_bilans)

@api_view(['POST'])
def create_bilan(request, dpi_id):
    """Create a new bilan (bio or radio) for a DPI"""
    data = request.data.copy()
    bilan_type = data.get('type')
    consultation = get_object_or_404(Consultation, id=data.get('consultation_id'))
    medecin = get_object_or_404(PersonnelMedical, id=data.get('medecin_id'))

    if bilan_type.upper() == 'BIO':
        bilan = BilanBio.objects.create(
            date_debut=data['date_debut'],
            date_fin=data.get('date_fin'),
            parametres=data.get('parametres', ''),
            medecin=medecin,
            Consultation=consultation
        )
        serializer = BilanBioSerializer(bilan)
        
    elif bilan_type.upper() == 'RADIO':
        bilan = BilanRadio.objects.create(
            date_debut=data['date_debut'],
            date_fin=data.get('date_fin'),
            type_radio=data.get('type_radio', 'RADIO'),
            description=data.get('description', ''),
            medecin=medecin,
            Consultation=consultation
        )
        serializer = BilanRadioSerializer(bilan)
        
    else:
        return Response(
            {'error': 'Invalid bilan type. Must be either BIO or RADIO'},
            status=status.HTTP_400_BAD_REQUEST
        )

    return Response(serializer.data, status=status.HTTP_201_CREATED)



@api_view(['GET'])
def get_mutuelles(request):
    """Get all mutuelles for a patient in DPI"""
    dpi = get_object_or_404(DPI, id=request.data.get('dpi_id'))
    mutuelles = Mutuelle.objects.filter(patient_id=dpi.patient)
    serializer = MutuelleSerializer(mutuelles, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def add_mutuelle(request , dpi_id):
    """Add new mutuelle for patient"""
    dpi = get_object_or_404(DPI, id=dpi_id)
    data = request.data.copy()
    data['patient_id'] = dpi.patient.id
    
    serializer = MutuelleSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def update_mutuelle(request):
    """Update mutuelle information"""
    dpi = get_object_or_404(DPI, id=request.data.get('dpi_id'))
    mutuelle = get_object_or_404(Mutuelle, id=request.data.get("mututlle_id"), patient_id=dpi.patient)
    
    serializer = MutuelleSerializer(mutuelle, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_contacts(request):
    """Get all contacts for a patient in DPI"""
    dpi = get_object_or_404(DPI, id=request.data.get('dpi_id'))
    contacts = Contact.objects.filter(patient=dpi.patient)
    serializer = ContactSerializer(contacts, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def add_contact(request):
    """Add new contact for patient"""
    dpi = get_object_or_404(DPI, id=request.data.get('dpi_id'))
    data = request.data.copy()
    data['patient'] = dpi.patient.id
    
    serializer = ContactSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def update_contact(request):
    """Update contact information"""
    dpi = get_object_or_404(DPI, id=request.data.get('dpi_id'))
    contact = get_object_or_404(Contact, id=request.data.get("contact_id"), patient=dpi.patient)
    
    serializer = ContactSerializer(contact, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def generate_nss_qr(request):
    """Generate QR code from patient NSS"""
    try:
        # Get DPI and patient NSS
        dpi = get_object_or_404(DPI, id=request.data.get('dpi_id'))
        nss = dpi.patient.nss
        
        # Create QR code instance
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_L,
            box_size=10,
            border=4,
        )
        
        # Add NSS data
        qr.add_data(nss)
        qr.make(fit=True)

        # Create SVG image
        img = qr.make_image(image_factory=qrcode.image.svg.SvgImage)
        
        # Convert to string
        stream = BytesIO()
        img.save(stream)
        svg_string = stream.getvalue().decode()
        
        return Response({
            'nss': nss,
            'qr_code': svg_string
        })
        
    except Exception as e:
        return Response(
            {'error': f'Error generating QR code: {str(e)}'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
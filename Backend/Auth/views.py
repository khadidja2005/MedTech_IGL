from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from django.contrib.auth.hashers import check_password
import jwt
from datetime import datetime, timedelta
from django.conf import settings
from django.contrib.auth.hashers import make_password
from BDD.models import Admin, PersonnelMedical, Patient
from .serializer import LoginSerializer , UserSerializer , PersonnelMedicalSignupSerializer , PatientSignupSerializer , AdminSignupSerializer
def generate_token(user_id, role):
    payload = {
        'user_id': user_id,
        'role': role,
        'exp': datetime.now() + timedelta(days=1)  # Token expires in 1 day
    }
    return jwt.encode(payload, "IGL", algorithm='HS256')
# Create your views here.

@api_view(['POST'])
def signup_admin(request):
    serializer = AdminSignupSerializer(data=request.data)
    if serializer.is_valid():
        # Hash the password before saving
        password = make_password(serializer.validated_data['password'])
        admin = serializer.save(password=password)
        
        # Generate token for immediate login
        token = generate_token(admin.id, 'ADMIN')
        
        return Response({
            'message': 'Admin created successfully',
            'token': token,
            'email': admin.email,
            'role': 'ADMIN'
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def signup_personnel(request):
    serializer = PersonnelMedicalSignupSerializer(data=request.data)
    if serializer.is_valid():
        password = make_password(serializer.validated_data['password'])
        personnel = serializer.save(password=password)
        
        token = generate_token(personnel.id, personnel.role)
        
        return Response({
            'message': 'Personnel medical created successfully',
            'token': token,
            'email': personnel.email,
            'role': personnel.role
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def signup_patient(request):
    serializer = PatientSignupSerializer(data=request.data)
    if serializer.is_valid():
        password = make_password(serializer.validated_data['password'])
        patient = serializer.save(password=password)
        
        token = generate_token(patient.id, 'PATIENT')
        
        return Response({
            'message': 'Patient created successfully',
            'token': token,
            'email': patient.email,
            'role': 'PATIENT'
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
@api_view(['POST'])
def login(request):
    serializer = LoginSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    email = serializer.validated_data['email']
    password = serializer.validated_data['password']

    # Try to find the user in all three models
    user = None
    role = None

    # Check Admin
    try:
        user = Admin.objects.get(email=email)
        if check_password(password, user.password):
            role = 'ADMIN'
    except Admin.DoesNotExist:
        pass

    # Check PersonnelMedical
    if not user:
        try:
            user = PersonnelMedical.objects.get(email=email)
            if check_password(password, user.password):
                role = user.role
        except PersonnelMedical.DoesNotExist:
            pass

    # Check Patient
    if not user:
        try:
            user = Patient.objects.get(email=email)
            if check_password(password, user.password):
                role = 'PATIENT'
        except Patient.DoesNotExist:
            pass

    if user and role:
        token = generate_token(user.id, role)
        response_data = {
            'email': user.email,
            'nom_complet': user.nom_complet,
            'role': role,
            'token': token
        }
        return Response(response_data, status=status.HTTP_200_OK)

    return Response(
        {'detail': 'Invalid credentials'},
        status=status.HTTP_401_UNAUTHORIZED
    )
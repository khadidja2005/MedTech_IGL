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
from .models import  PasswordResetCode
from .utils import generate_reset_code, send_reset_code_email
from datetime import datetime
from django.utils import timezone
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
        token = generate_token(str(admin.id), 'ADMIN')
        
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
        
        token = generate_token(str(personnel.id), personnel.role)
        
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
        
        token = generate_token(str(patient.id), 'PATIENT')
        
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
        token = generate_token(str(user.id), role)
        response_data = {
            'id': user.id,
            'email': user.email,
            'nom_complet': user.nom_complet,
            'role': role,
            'token': token ,
        }
        return Response(response_data, status=status.HTTP_200_OK)

    return Response(
        {'detail': 'Invalid credentials'},
        status=status.HTTP_401_UNAUTHORIZED
    )
@api_view(['POST'])
def request_reset_code(request):
    try:
        email = request.data.get('email')
        if not email:
            return Response(
                {'detail': 'Email is required'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Check if email exists in any user model
        user = None
        try:
            user = Admin.objects.get(email=email)
        except Admin.DoesNotExist:
            try:
                user = PersonnelMedical.objects.get(email=email)
            except PersonnelMedical.DoesNotExist:
                try:
                    user = Patient.objects.get(email=email)
                except Patient.DoesNotExist:
                    pass

        if not user:
            return Response(
                {'detail': 'No account found with this email'},
                status=status.HTTP_404_NOT_FOUND
            )

        # Generate and save reset code
        code = generate_reset_code()
        PasswordResetCode.objects.create(
            email=email,
            code=code
        )

        # Send email with reset code
        send_reset_code_email(email, code)

        return Response(
            {'message': 'Reset code sent to your email'},
            status=status.HTTP_200_OK
        )

    except Exception as e:
        return Response(
            {'detail': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
    

@api_view(['POST'])
def verify_reset_code(request):
    """
    Verify the reset code for a given email.
    """
    try:
        email = request.data.get('email')
        code = request.data.get('code')

        if not all([email, code]):
            return Response(
                {'detail': 'Email and code are required'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Find the most recent valid reset code
        reset_code = PasswordResetCode.objects.filter(
            email=email,
            code=code,
            used=False,
            expires_at__gt=timezone.now()
        ).order_by('-created_at').first()

        if not reset_code:
            return Response(
                {'detail': 'Invalid or expired reset code'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Return a success response with a token that can be used for the password reset
        return Response({
            'message': 'Code verified successfully',
            'verified': True
        }, status=status.HTTP_200_OK)

    except Exception as e:
        return Response(
            {'detail': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
    

@api_view(['POST'])
def reset_password(request):
    """
    Reset user password with email and new password
    """
    try:
        email = request.data.get('email')
        new_password = request.data.get('new_password')

        if not all([email, new_password]):
            return Response(
                {'detail': 'Email and new password are required'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Find the user
        user = None
        for UserModel in [Admin, PersonnelMedical, Patient]:
            try:
                user = UserModel.objects.get(email=email)
                break
            except UserModel.DoesNotExist:
                continue

        if not user:
            return Response(
                {'detail': 'User not found'},
                status=status.HTTP_404_NOT_FOUND
            )

        # Update password
        user.password = make_password(new_password)
        user.save()

        return Response({
            'message': 'Password updated successfully'
        }, status=status.HTTP_200_OK)

    except Exception as e:
        return Response(
            {'detail': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )    
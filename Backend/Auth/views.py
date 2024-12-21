from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import send_mail
from django.utils.crypto import get_random_string
from .models import Admin, PersonnelMedical, Patient
from .serializers import AdminSerializer, PersonnelMedicalSerializer, PatientSerializer
from django.contrib.auth.hashers import make_password, check_password
from hashlib import pbkdf2_hmac
from os import urandom
from base64 import b64encode, b64decode

# Stocker temporairement les codes de réinitialisation (en mémoire, pour simplification)
RESET_CODES = {}

# Fonctions de hachage personnalisées
def custom_hash_password(password: str) -> str:
    """
    Hachage d'un mot de passe avec un sel unique en utilisant PBKDF2.
    """
    salt = urandom(16)  # Génère un sel unique de 16 octets
    hash_bytes = pbkdf2_hmac(
        'sha256',  # Algorithme de hachage
        password.encode('utf-8'),  # Mot de passe en bytes
        salt,  # Sel unique
        100_000  # Nombre d'itérations pour ralentir le hachage
    )
    # Combine le sel et le hachage dans une chaîne encodée en Base64
    return b64encode(salt + hash_bytes).decode('utf-8')

def verify_password(password: str, hashed_password: str) -> bool:
    """
    Vérifie qu'un mot de passe correspond au hachage stocké.
    """
    decoded = b64decode(hashed_password.encode('utf-8'))
    salt = decoded[:16]  # Récupère les 16 premiers octets comme sel
    hash_stored = decoded[16:]  # Récupère le reste comme hachage
    hash_bytes = pbkdf2_hmac(
        'sha256',
        password.encode('utf-8'),
        salt,
        100_000
    )
    return hash_bytes == hash_stored

class LoginView(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        # Vérification dans la table Admin
        admin = Admin.objects.filter(email=email).first()
        if admin and verify_password(password, admin.password):
            return Response({"id": admin.id, "role": "admin", "message": "Login successful"}, status=status.HTTP_200_OK)

        # Vérification dans la table PersonnelMedical
        personnel = PersonnelMedical.objects.filter(email=email).first()
        if personnel and verify_password(password, personnel.password):
            return Response({"id": personnel.id, "role": personnel.role, "message": "Login successful"}, status=status.HTTP_200_OK)

        # Vérification dans la table Patient
        patient = Patient.objects.filter(email=email).first()
        if patient and verify_password(password, patient.password):
            return Response({"id": patient.id, "role": "patient", "message": "Login successful"}, status=status.HTTP_200_OK)

        return Response({"error": "Invalid email or password"}, status=status.HTTP_401_UNAUTHORIZED)

class ForgotPasswordView(APIView):
    def post(self, request):
        email = request.data.get("email")

        # Recherche dans la table Admin
        admin = Admin.objects.filter(email=email).first()
        if admin:
            code = get_random_string(length=4, allowed_chars='0123456789')
            RESET_CODES[email] = code
            self.send_email(email, code)
            return Response({"message": "Reset code sent to your email"}, status=status.HTTP_200_OK)

        # Recherche dans la table PersonnelMedical
        personnel = PersonnelMedical.objects.filter(email=email).first()
        if personnel:
            code = get_random_string(length=4, allowed_chars='0123456789')
            RESET_CODES[email] = code
            self.send_email(email, code)
            return Response({"message": "Reset code sent to your email"}, status=status.HTTP_200_OK)

        # Recherche dans la table Patient
        patient = Patient.objects.filter(email=email).first()
        if patient:
            code = get_random_string(length=4, allowed_chars='0123456789')
            RESET_CODES[email] = code
            self.send_email(email, code)
            return Response({"message": "Reset code sent to your email"}, status=status.HTTP_200_OK)

        return Response({"error": "Email not found"}, status=status.HTTP_404_NOT_FOUND)

    def send_email(self, email, code):
        subject = "MedTech Password Reset Code"
        message = f"Your password reset code is: {code}"
        html_message = f"""
        <html>
        <body style="font-family: Arial, sans-serif;">
            <div style="text-align: center; background-color: #f0f8ff; padding: 20px;">
                <h2 style="color: #007BFF;">MedTech</h2>
                <p style="color: #333;">Your password reset code is:</p>
                <h1 style="color: #007BFF;">{code}</h1>
                <p style="color: #333;">Please enter this code to reset your password.</p>
            </div>
        </body>
        </html>
        """
        send_mail(subject, message, 'ms_namoune@esi.dz', [email], fail_silently=False, html_message=html_message)

class VerifyResetCodeView(APIView):
    def post(self, request):
        email = request.data.get("email")
        code = request.data.get("code")

        if RESET_CODES.get(email) == code:
            return Response({"message": "Code verified. You can now reset your password."}, status=status.HTTP_200_OK)

        return Response({"error": "Invalid or expired code"}, status=status.HTTP_400_BAD_REQUEST)

class ResetPasswordView(APIView):
    def post(self, request):
        email = request.data.get("email")
        code = request.data.get("code")
        new_password = request.data.get("new_password")
        confirm_password = request.data.get("confirm_password")

        if RESET_CODES.get(email) != code:
            return Response({"error": "Invalid or expired code"}, status=status.HTTP_400_BAD_REQUEST)

        if new_password != confirm_password:
            return Response({"error": "Passwords do not match"}, status=status.HTTP_400_BAD_REQUEST)

        # Met à jour le mot de passe dans la table Admin
        admin = Admin.objects.filter(email=email).first()
        if admin:
            admin.password = custom_hash_password(new_password)
            admin.save()
            del RESET_CODES[email]
            return Response({"message": "Password reset successful"}, status=status.HTTP_200_OK)

        # Met à jour le mot de passe dans la table PersonnelMedical
        personnel = PersonnelMedical.objects.filter(email=email).first()
        if personnel:
            personnel.password = custom_hash_password(new_password)
            personnel.save()
            del RESET_CODES[email]
            return Response({"message": "Password reset successful"}, status=status.HTTP_200_OK)

        # Met à jour le mot de passe dans la table Patient
        patient = Patient.objects.filter(email=email).first()
        if patient:
            patient.password = custom_hash_password(new_password)
            patient.save()
            del RESET_CODES[email]
            return Response({"message": "Password reset successful"}, status=status.HTTP_200_OK)

        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

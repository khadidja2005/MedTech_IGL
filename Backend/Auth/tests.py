from rest_framework.test import APITestCase
from rest_framework import status
from django.core import mail
from .models import Admin

class ForgotPasswordEmailTests(APITestCase):
    def setUp(self):
        # Ajouter un utilisateur Admin pour le test
        self.admin = Admin.objects.create(
            id="admin1",
            nom_complet="Admin Test",
            email="admin@example.com",
            password="hashed_password"
        )
    
    def test_forgot_password_email(self):
        response = self.client.post('/auth/forgot-password/', {
            "email": "admin@example.com"
        })
        
        # Vérifie que l'email a été envoyé
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(mail.outbox), 1)  # 1 email dans la boîte aux lettres simulée
        self.assertIn("MedTech Password Reset Code", mail.outbox[0].subject)  # Vérifie le sujet de l'email
        self.assertIn("Your password reset code is:", mail.outbox[0].body)  # Vérifie le contenu

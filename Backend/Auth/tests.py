from django.test import TestCase
from django.core import mail
from rest_framework import status
from rest_framework.test import APIClient

class ForgotPasswordEmailTest(TestCase):

    def setUp(self):
        self.client = APIClient()
        # L'email à tester
        self.test_email = 'saad.namoune28@gmail.com'

    def test_send_reset_email(self):
        # Appel API pour simuler la demande de réinitialisation de mot de passe
        response = self.client.post('/forgot-password/', {'email': self.test_email}, format='json')

        # Vérifier que la réponse est correcte
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('Reset code sent to your email', response.data.get('message'))

        # Vérifier qu'un email a été envoyé
        self.assertEqual(len(mail.outbox), 1)

        # Vérifier que l'email a été envoyé à la bonne adresse
        self.assertEqual(mail.outbox[0].to, [self.test_email])

        # Vérifier que l'email contient le bon sujet
        self.assertEqual(mail.outbox[0].subject, 'MedTech Password Reset Code')

        # Vérifier que l'email contient le code de réinitialisation
        code_in_email = mail.outbox[0].body  # Le message texte brut de l'email
        self.assertIn('Your password reset code is:', code_in_email)

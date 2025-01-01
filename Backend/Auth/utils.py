# utils.py
import random
import string
from django.core.mail import send_mail
from django.conf import settings

def generate_reset_code():
    """Generate a 6-digit reset code"""
    return ''.join(random.choices(string.digits, k=6))

def send_reset_code_email(email, code):
    """Send reset code via email"""
    subject = 'Password Reset Code'
    message = f'Your password reset code is: {code}\nThis code will expire in 15 minutes.'
    
    send_mail(
        subject,
        message,
        settings.DEFAULT_FROM_EMAIL,
        [email],
        fail_silently=False,
    )

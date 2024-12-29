from django.core.mail import send_mail
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import os


@csrf_exempt
def contact_us(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            email = data.get("email")
            message = data.get("message")
            if not email:
                return JsonResponse({"error": "email is required"}, status=400)
            if not message:
                return JsonResponse({"error": "Message is required"}, status=400)
            subject = "New Contact Us Message"
            message_body = f"Email: {email}\n\nMessage:\n{message}"

            send_mail(
                subject,
                message_body,
                os.environ.get("EMAIL_HOST_USER"),  # From email
                [os.environ.get("EMAIL_HOST_USER")],
                fail_silently=False,
            )

            return JsonResponse({"message": "Message sent successfully."}, status=200)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return JsonResponse({"error": "Method not allowed"}, status=405)

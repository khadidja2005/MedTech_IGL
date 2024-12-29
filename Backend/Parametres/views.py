from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from django.views.decorators.http import require_http_methods
from datetime import datetime
from BDD.models import PersonnelMedical, Admin, Patient


@csrf_exempt
@require_http_methods(["GET"])  # Handle GET requests
def get_infos(request):
    if request.method == "GET":
        data = json.loads(request.body)
        id = data.get("id")
        if not id:
            return JsonResponse({"error": "An 'id' is required."}, status=400)
        try:
            admin = Admin.objects.get(id=id)
            return JsonResponse(
                {
                    "nom_complet": admin.nom_complet,
                    "email": admin.email,
                    "telephone": admin.telephone,
                }
            )
        except Admin.DoesNotExist:
            try:
                personnel_medical = PersonnelMedical.objects.get(id=id)
                return JsonResponse(
                    {
                        "nom_complet": personnel_medical.nom_complet,
                        "email": personnel_medical.email,
                        "telephone": personnel_medical.telephone,
                        "specialite": personnel_medical.specialite,
                        "role": personnel_medical.role,
                    }
                )
            except PersonnelMedical.DoesNotExist:
                return JsonResponse(
                    {"error": "No user with the provided id found."}, status=404
                )
    else:
        return JsonResponse({"error": "Invalid request method"}, status=405)


@csrf_exempt
def modifier_infos_personnel(request):
    if request.method == "POST":
        data = json.loads(request.body)
        id = data.get("id")
        if not id:
            return JsonResponse({"error": "An 'id' is required."}, status=400)
        try:
            personnel_medical = PersonnelMedical.objects.get(id=id)
            if not all(
                [
                    "nom_complet" in data,
                    "email" in data,
                    "telephone" in data,
                    "specialite" in data,
                ]
            ):
                return JsonResponse(
                    {
                        "error": "A 'nom_complet','email','telephone' and 'specialite' are required."
                    },
                    status=400,
                )
            personnel_medical.nom_complet = data["nom_complet"]
            personnel_medical.email = data["email"]
            personnel_medical.telephone = data["telephone"]
            personnel_medical.specialite = data["specialite"]
            personnel_medical.save()
            return JsonResponse(
                {"success": "Personnel medical informations updated successfully."}
            )
        except PersonnelMedical.DoesNotExist:
            try:
                admin = Admin.objects.get(id=id)
                if not all(
                    ["nom_complet" in data, "email" in data, "telephone" in data]
                ):
                    return JsonResponse(
                        {"error": "A 'nom_complet' and 'email' are required."},
                        status=400,
                    )
                admin.nom_complet = data["nom_complet"]
                admin.email = data["email"]
                admin.telephone = data["telephone"]
                admin.save()
                return JsonResponse(
                    {"success": "Admin informations updated successfully."}
                )
            except Admin.DoesNotExist:
                return JsonResponse(
                    {"error": "No user with the provided id found."}, status=404
                )
    else:
        return JsonResponse({"error": "Invalid request method"}, status=405)


@csrf_exempt
def modifier_password(request):
    if request.method == "POST":
        data = json.loads(request.body)
        id = data.get("id")
        new_password = data.get("new_password")
        old_password = data.get("old_password")
        if not id:
            return JsonResponse({"error": "An 'id' is required."}, status=400)
        if not new_password:
            return JsonResponse({"error": "A 'new_password' is required."}, status=400)
        if not old_password:
            return JsonResponse({"error": "An 'old_password' is required."}, status=400)
        try:
            personne = PersonnelMedical.objects.get(id=id)
        except PersonnelMedical.DoesNotExist:
            try:
                personne = Admin.objects.get(id=id)
            except Admin.DoesNotExist:
                try:
                    personne = Patient.objects.get(id=id)
                except Patient.DoesNotExist:
                    return JsonResponse(
                        {"error": "No user with the provided id found."}, status=404
                    )
        print(personne.password)
        if personne.password != old_password:
            return JsonResponse(
                {"error": "The old password provided is incorrect."}, status=400
            )
        personne.password = new_password
        personne.save()
        return JsonResponse({"success": "Password updated successfully."})
    else:
        return JsonResponse({"error": "Invalid request method"}, status=405)

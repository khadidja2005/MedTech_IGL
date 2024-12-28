from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from django.views.decorators.http import require_http_methods
from datetime import datetime
from BDD.models import (
    Ordonnance,
    Medicament,
    Consultation,
    PersonnelMedical,
    etablissement_personnel_medical,
)


@csrf_exempt
@require_http_methods(["GET"])  # Handle GET requests
def get_infos(request):
    if request.method == "GET":
        data = json.loads(request.body)
        ordonnance_id = data.get("ordonnance_id")
        if not ordonnance_id:
            return JsonResponse({"error": "A 'ordonnance_id' is required."}, status=400)
        try:
            ordonnance = Ordonnance.objects.get(id=ordonnance_id)
        except Ordonnance.DoesNotExist:
            return JsonResponse(
                {"error": "Ordonnance with the provided id not found."}, status=404
            )
        meds = Medicament.objects.filter(ordonnance=ordonnance)
        return JsonResponse(
            {
                "date": ordonnance.consultation.date,
                "medecin": ordonnance.consultation.Medecin.nom_complet,
                "patient": ordonnance.consultation.Hospitalisation.DPI.patient.nom_complet,
                "estValide": ordonnance.estValide,
                "estTerminer": ordonnance.estTerminer,
                "medicaments": [
                    {
                        "medicament_id": med.id,
                        "nom": med.nom,
                        "dosage": med.dosage,
                        "duree": med.duree,
                    }
                    for med in meds
                ],
            }
        )
    else:
        return JsonResponse({"error": "Invalid request method"}, status=405)


@csrf_exempt
def supprimer_ordonnance(request):
    if request.method == "DELETE":
        data = json.loads(request.body)
        ordonnance_id = data.get("ordonnance_id")
        if not ordonnance_id:
            return JsonResponse({"error": "A 'ordonnance_id' is required."}, status=400)
        try:
            ordonnance = Ordonnance.objects.get(id=ordonnance_id)
        except Ordonnance.DoesNotExist:
            return JsonResponse(
                {"error": "Ordonnance with the provided id not found."}, status=404
            )
        ordonnance.delete()
        return JsonResponse({"success": "Ordonnance deleted successfully."})
    else:
        return JsonResponse({"error": "Invalid request method"}, status=405)


@csrf_exempt
def ajouter_medicament(request):
    if request.method == "POST":
        data = json.loads(request.body)
        ordonnance_id = data.get("ordonnance_id")
        nom = data.get("nom")
        dosage = data.get("dosage")
        duree = data.get("duree")
        if not all([ordonnance_id, nom, dosage, duree]):
            return JsonResponse(
                {
                    "error": "A 'ordonnance_id', 'nom', 'dosage', and 'duree' are required."
                },
                status=400,
            )
        try:
            ordonnance = Ordonnance.objects.get(id=ordonnance_id)
        except Ordonnance.DoesNotExist:
            return JsonResponse(
                {"error": "Ordonnance with the provided id not found."}, status=404
            )
        med = Medicament.objects.create(
            nom=nom, dosage=dosage, duree=duree, ordonnance=ordonnance
        )
        return JsonResponse(
            {"success": "Medicament added successfully.", "medicament_id": med.id}
        )
    else:
        return JsonResponse({"error": "Invalid request method"}, status=405)


@csrf_exempt
def modifier_medicament(request):
    if request.method == "POST":
        data = json.loads(request.body)
        medicament_id = data.get("medicament_id")
        nom = data.get("nom")
        dosage = data.get("dosage")
        duree = data.get("duree")
        if not all([medicament_id, nom, dosage, duree]):
            return JsonResponse(
                {
                    "error": "A 'medicament_id', 'nom', 'dosage', and 'duree' are required."
                },
                status=400,
            )
        try:
            medicament = Medicament.objects.get(id=medicament_id)
        except Medicament.DoesNotExist:
            return JsonResponse(
                {"error": "Medicament with the provided id not found."}, status=404
            )
        medicament.nom = nom
        medicament.dosage = dosage
        medicament.duree = duree
        medicament.save()
        return JsonResponse({"success": "Medicament updated successfully."})
    else:
        return JsonResponse({"error": "Invalid request method"}, status=405)


@csrf_exempt
def supprimer_medicament(request):
    if request.method == "DELETE":
        data = json.loads(request.body)
        medicament_id = data.get("medicament_id")
        if not medicament_id:
            return JsonResponse({"error": "A 'medicament_id' is required."}, status=400)
        try:
            medicament = Medicament.objects.get(id=medicament_id)
        except Medicament.DoesNotExist:
            return JsonResponse(
                {"error": "Medicament with the provided id not found."}, status=404
            )
        medicament.delete()
        return JsonResponse({"success": "Medicament deleted successfully."})
    else:
        return JsonResponse({"error": "Invalid request method"}, status=405)


def peut_modifier_ordonnance(request):
    if request.method == "GET":
        data = json.loads(request.body)
        ordonnance_id = data.get("ordonnance_id")
        if not ordonnance_id:
            return JsonResponse({"error": "A 'ordonnance_id' is required."}, status=400)
        try:
            ordonnance = Ordonnance.objects.get(id=ordonnance_id)
        except Ordonnance.DoesNotExist:
            return JsonResponse(
                {"error": "Ordonnance with the provided id not found."}, status=404
            )
        if ordonnance.estValide:
            return JsonResponse({"peut_modifier": False})
        return JsonResponse({"peut_modifier": True})
    else:
        return JsonResponse({"error": "Invalid request method"}, status=405)


@csrf_exempt
def valider_ordonnance(request):
    if request.method == "POST":
        data = json.loads(request.body)
        ordonnance_id = data.get("ordonnance_id")
        pharmacien_id = data.get("pharmacien_id")
        if not all([ordonnance_id, pharmacien_id]):
            return JsonResponse(
                {"error": "A 'ordonnance_id' and 'pharmacien_id' are required."},
                status=400,
            )
        try:
            ordonnance = Ordonnance.objects.get(id=ordonnance_id)
        except Ordonnance.DoesNotExist:
            return JsonResponse(
                {"error": "Ordonnance with the provided id not found."}, status=404
            )
        try:
            pharmacien = PersonnelMedical.objects.get(id=pharmacien_id)
        except PersonnelMedical.DoesNotExist:
            return JsonResponse(
                {"error": "Pharmacien with the provided id not found."}, status=404
            )
        if ordonnance.estTerminer:
            if not ordonnance.estValide:
                ordonnance.estValide = True
                ordonnance.pharmacien_id = pharmacien
                ordonnance.save()
            else:
                return JsonResponse(
                    {"message": "Ordonnance est dejas valide."},
                )
        else:
            return JsonResponse(
                {"message": "Ordonnance est en cours de modification."},
            )
        return JsonResponse({"success": "Ordonnance validated successfully."})
    else:
        return JsonResponse({"error": "Invalid request method"}, status=405)


@csrf_exempt
def terminer_ordonnance(request):
    if request.method == "POST":
        data = json.loads(request.body)
        ordonnance_id = data.get("ordonnance_id")
        if not ordonnance_id:
            return JsonResponse({"error": "A 'ordonnance_id' is required."}, status=400)
        try:
            ordonnance = Ordonnance.objects.get(id=ordonnance_id)
        except Ordonnance.DoesNotExist:
            return JsonResponse(
                {"error": "Ordonnance with the provided id not found."}, status=404
            )
        meds = Medicament.objects.filter(ordonnance=ordonnance)
        if meds.count() != 0:
            ordonnance.estTerminer = True
            ordonnance.save()
        else:
            return JsonResponse(
                {"error": "Ordonnance must have at least one medicament."}, status=400
            )
        return JsonResponse({"success": "Ordonnance updated successfully."})
    else:
        return JsonResponse({"error": "Invalid request method"}, status=405)


@csrf_exempt
def peut_terminer_ordonnance(request):
    if request.method == "GET":
        data = json.loads(request.body)
        ordonnance_id = data.get("ordonnance_id")
        if not ordonnance_id:
            return JsonResponse({"error": "A 'ordonnance_id' is required."}, status=400)
        try:
            ordonnance = Ordonnance.objects.get(id=ordonnance_id)
        except Ordonnance.DoesNotExist:
            return JsonResponse(
                {"error": "Ordonnance with the provided id not found."}, status=404
            )
        meds = Medicament.objects.filter(ordonnance=ordonnance)
        if meds.count() != 0:
            return JsonResponse({"peut_terminer": True})
        return JsonResponse({"peut_terminer": False})
    else:
        return JsonResponse({"error": "Invalid request method"}, status=405)

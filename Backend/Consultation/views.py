from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from django.views.decorators.http import require_http_methods
from datetime import datetime
from BDD.models import (
    Ordonnance,
    Consultation,
    BilanBio,
    BilanRadio,
    PersonnelMedical,
    etablissement_personnel_medical,
)


@csrf_exempt
@require_http_methods(["GET"])
def get_infos(request):
    if request.method == "GET":
        consultation_id = request.GET.get("consultation_id")
        if not consultation_id:
            return JsonResponse(
                {"error": "A 'consultation_id' is required."}, status=400
            )
        try:
            consultation = Consultation.objects.get(id=consultation_id)
        except Consultation.DoesNotExist:
            return JsonResponse(
                {"error": "Consultation with the provided id not found."}, status=404
            )
        ordonnances = Ordonnance.objects.filter(consultation=consultation)
        bilans_bio = BilanBio.objects.filter(Consultation=consultation)
        bilans_radio = BilanRadio.objects.filter(Consultation=consultation)
        return JsonResponse(
            {
                "medecin": consultation.Medecin.nom_complet,
                "date": consultation.date,
                "resume": consultation.resume,
                "ordonnances": [
                    {
                        "ordonnance_id": ordonnance.id,
                        "estValide": ordonnance.estValide,
                        "pharmacien_id": (
                            ordonnance.pharmacien_id.id
                            if ordonnance.pharmacien_id
                            else None
                        ),
                        "pharmacien_nom": (
                            ordonnance.pharmacien_id.nom_complet
                            if ordonnance.pharmacien_id
                            else None
                        ),
                    }
                    for ordonnance in ordonnances
                ],
                "bilans_bio": [
                    {
                        "id": bilan_bio.id,
                        "etat": "fini" if bilan_bio.est_resultat else "non finis",
                        "type": "bio",
                    }
                    for bilan_bio in bilans_bio
                ],
                "bilans_radio": [
                    {
                        "id": bilan_radio.id,
                        "etat": "fini" if bilan_radio.est_resultat else "non finis",
                        "type": "radio",
                    }
                    for bilan_radio in bilans_radio
                ],
            }
        )
    else:
        return JsonResponse({"error": "Invalid request method"}, status=405)


def get_medecins(request):
    if request.method == "GET":
        consultation_id = request.GET.get("consultation_id")
        if not consultation_id:
            return JsonResponse(
                {"error": "A 'consultation_id' is required."}, status=400
            )
        try:
            consultation = Consultation.objects.get(id=consultation_id)
        except Consultation.DoesNotExist:
            return JsonResponse(
                {"error": "Consultation with the provided id not found."}, status=404
            )
        etablissement = consultation.Hospitalisation.DPI.etablissement_id
        persons_etabs = etablissement_personnel_medical.objects.filter(
            etablissement_id=etablissement
        )
        medecins = []
        for medecin_etab in persons_etabs:
            if medecin_etab.personnel_medical.role == "MEDECIN":
                medecins.append(medecin_etab.personnel_medical)
        return JsonResponse(
            {
                "medecins": [
                    {
                        "medecin_id": medecin.id,
                        "nom_complet": medecin.nom_complet,
                    }
                    for medecin in medecins
                ]
            }
        )
    else:
        return JsonResponse({"error": "Invalid request method"}, status=405)


@csrf_exempt
@require_http_methods(["POST"])
def modifier_consultation(request):
    try:
        data = json.loads(request.body)
        consultation_id = data.get("consultation_id")
        date = data.get("date")
        medecin_id = data.get("medecin_id")

        if (not consultation_id) or (not date and not medecin_id):
            return JsonResponse({"error": "Missing required fields."}, status=400)
        try:
            consultation = Consultation.objects.get(id=consultation_id)
        except Consultation.DoesNotExist:
            return JsonResponse(
                {"error": "Consultation with the provided id not found."}, status=404
            )
        if medecin_id:
            medecin = PersonnelMedical.objects.get(id=medecin_id)
            consultation.Medecin = medecin

        consultation.date = datetime.strptime(date, "%Y-%m-%d")

        consultation.save()

        return JsonResponse({"success": "Consultation updated successfully."})
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


@csrf_exempt
def modifier_resume(request):
    if request.method == "POST":
        data = json.loads(request.body)
        consultation_id = data.get("consultation_id")
        resume = data.get("resume")
        if not consultation_id:
            return JsonResponse(
                {"error": "A 'consultation_id' is required."}, status=400
            )
        if not resume:
            return JsonResponse({"error": "A 'resume' is required."}, status=400)
        try:
            consultation = Consultation.objects.get(id=consultation_id)
        except Consultation.DoesNotExist:
            return JsonResponse(
                {"error": "Consultation with the provided id not found."}, status=404
            )
        if resume == "vide":
            resume = ""
        consultation.resume = resume
        consultation.save()
        return JsonResponse({"success": "Consultation updated successfully."})
    else:
        return JsonResponse({"error": "Invalid request method"}, status=405)


@csrf_exempt
def supprimer_consultation(request):
    if request.method == "DELETE":
        consultation_id = request.GET.get("consultation_id")
        if not consultation_id:
            return JsonResponse(
                {"error": "A 'consultation_id' is required."}, status=400
            )
        try:
            consultation = Consultation.objects.get(id=consultation_id)
        except Consultation.DoesNotExist:
            return JsonResponse(
                {"error": "Consultation with the provided id not found."}, status=404
            )
        consultation.delete()
        return JsonResponse({"success": "Consultation deleted successfully."})
    else:
        return JsonResponse({"error": "Invalid request method"}, status=405)


@csrf_exempt
def ajouter_ordonnance(request):
    if request.method == "POST":
        data = json.loads(request.body)
        consultation_id = data.get("consultation_id")
        if not consultation_id:
            return JsonResponse(
                {"error": "A 'consultation_id' is required."}, status=400
            )
        try:
            consultation = Consultation.objects.get(id=consultation_id)
        except Consultation.DoesNotExist:
            return JsonResponse(
                {"error": "Consultation with the provided id not found."}, status=404
            )
        ordonnance = Ordonnance(
            consultation=consultation,
            pharmacien_id=None,
            estValide=False,
            estTerminer=False,
        )
        ordonnance.save()
        return JsonResponse(
            {
                "message": "Ordonnance added successfully.",
                "ordonnance": {
                    "ordonnance_id": ordonnance.id,
                    "estValide": ordonnance.estValide,
                    "pharmacien_id": (
                        ordonnance.pharmacien_id.id
                        if ordonnance.pharmacien_id
                        else None
                    ),
                    "pharmacien_nom": (
                        ordonnance.pharmacien_id.nom_complet
                        if ordonnance.pharmacien_id
                        else None
                    ),
                },
            }
        )
    else:
        return JsonResponse({"message": "Invalid request method"}, status=405)


@csrf_exempt
def ajouter_bilan(request):
    if request.method == "POST":
        data = json.loads(request.body)
        consultation_id = data.get("consultation_id")
        type = data.get("type")
        if not consultation_id:
            return JsonResponse(
                {"error": "A 'consultation_id' is required."}, status=400
            )
        if not type:
            return JsonResponse({"error": "A 'type' is required."}, status=400)
        try:
            consultation = Consultation.objects.get(id=consultation_id)
        except Consultation.DoesNotExist:
            return JsonResponse(
                {"error": "Consultation with the provided id not found."}, status=404
            )
        if type == "bio":
            bilan = BilanBio(
                Consultation=consultation,
                est_resultat=False,
                est_complet=False,
                date_debut=datetime.now(),
                parametres="",
                date_fin=None,
            )
        elif type == "radio":
            bilan = BilanRadio(
                Consultation=consultation,
                est_resultat=False,
                date_debut=datetime.now(),
                est_complet=False,
                description="",
                date_fin=None,
                resultat_id=None,
            )
        else:
            return JsonResponse({"error": "Invalid 'type'."}, status=400)
        bilan.save()
        return JsonResponse(
            {
                "message": "Bilan added successfully.",
                "bilan": bilan.id,
            }
        )
    else:
        return JsonResponse({"message": "Invalid request method"}, status=405)

from datetime import datetime
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from django.views.decorators.http import require_http_methods
from BDD.models import BilanRadio, ResultatRadio, PersonnelMedical


@csrf_exempt
@require_http_methods(["GET"])
def get_info_bilan_radio(request):
    if request.method == "GET":
        data = json.loads(request.body)
        bilan_id = data.get("bilan_id")
        if not bilan_id:
            return JsonResponse({"error": "bilan_id is required"})
        try:
            bilan = BilanRadio.objects.get(id=bilan_id)
        except BilanRadio.DoesNotExist:
            return JsonResponse({"error": "BilanRadio not found"})
        if bilan.resultat_id:
            resultat = bilan.resultat_id
            resultat_response = {
                "id": resultat.id,
                "piece_jointe": resultat.piece_jointe,
                "date": resultat.date,
                "compte_rendu": resultat.compte_rendu,
                "radiologue_compte_rendu": resultat.radiologue_compte_rendu.nom_complet,
                "radiologue_compte_rendu_id": resultat.radiologue_compte_rendu.id,
                "radiologue": resultat.radiologue.nom_complet,
                "radiologue_id": resultat.radiologue.id,
            }
        else:
            resultat_response = {}

        return JsonResponse(
            {
                "date_debut": bilan.date_debut,
                "date_fin": bilan.date_fin,
                "type_radio": bilan.type_radio,
                "description": bilan.description,
                "est_complet": bilan.est_complet,
                "est_resultat": bilan.est_resultat,
                "medecin_id": bilan.medecin.id,
                "medecin": bilan.medecin.nom_complet,
                "resultats": resultat_response,
            }
        )
    else:
        return JsonResponse({"error": "Invalid request"})


@csrf_exempt
def valider_bilan_radio(request):
    if request.method == "POST":
        data = json.loads(request.body)
        bilan_id = data.get("bilan_id")
        if not bilan_id:
            return JsonResponse({"error": "Invalid request"})
        try:
            bilan = BilanRadio.objects.get(id=bilan_id)
        except BilanRadio.DoesNotExist:
            return JsonResponse({"error": "BilanRadio not found"})
        bilan.est_resultat = True
        bilan.date_fin = datetime.now()
        bilan.save()
        return JsonResponse({"success": "BilanRadio validated"})
    else:
        return JsonResponse({"error": "Invalid request"})


@csrf_exempt
def peut_valider(request):
    if request.method == "GET":
        data = json.loads(request.body)
        bilan_id = data.get("bilan_id")
        if not bilan_id:
            return JsonResponse({"error": "Invalid request"})
        try:
            bilan = BilanRadio.objects.get(id=bilan_id)
        except BilanRadio.DoesNotExist:
            return JsonResponse({"error": "BilanRadio not found"})

        if (
            bilan.est_complet
            and bilan.resultat_id
            and not bilan.est_resultat
            and bilan.resultat_id.piece_jointe
        ):
            return JsonResponse({"peut_valider": True})
        else:
            return JsonResponse({"peut_valider": False})
    else:
        return JsonResponse({"error": "Invalid request"})


@csrf_exempt
def peut_terminer(request):
    if request.method == "GET":
        data = json.loads(request.body)
        bilan_id = data.get("bilan_id")
        if not bilan_id:
            return JsonResponse({"error": "Invalid request"})
        try:
            bilan = BilanRadio.objects.get(id=bilan_id)
        except BilanRadio.DoesNotExist:
            return JsonResponse({"error": "BilanRadio not found"})
        if bilan.type_radio and bilan.description:
            return JsonResponse({"peut_terminer": True})
        else:
            return JsonResponse({"peut_terminer": False})
    else:
        return JsonResponse({"error": "Invalid request"})


@csrf_exempt
def terminer(request):
    if request.method == "POST":
        data = json.loads(request.body)
        bilan_id = data.get("bilan_id")
        if not bilan_id:
            return JsonResponse({"error": "Invalid request"})
        try:
            bilan = BilanRadio.objects.get(id=bilan_id)
        except BilanRadio.DoesNotExist:
            return JsonResponse({"error": "BilanRadio not found"})
        bilan.est_complet = True
        bilan.save()
        return JsonResponse({"success": "BilanRadio completed"})
    else:
        return JsonResponse({"error": "Invalid request"})


@csrf_exempt
def supprimer_bilan_radio(request):
    if request.method == "POST":
        data = json.loads(request.body)
        bilan_id = data.get("bilan_id")
        if not bilan_id:
            return JsonResponse({"error": "Invalid request"})
        try:
            bilan = BilanRadio.objects.get(id=bilan_id)
        except BilanRadio.DoesNotExist:
            return JsonResponse({"error": "BilanRadio not found"})
        bilan.delete()
        return JsonResponse({"success": "BilanRadio deleted"})
    else:
        return JsonResponse({"error": "Invalid request"})


@csrf_exempt
def ajouter_resultat_radio_pdf(request):
    if request.method == "POST":
        data = json.loads(request.body)
        bilan_id = data.get("bilan_id")
        pdf = data.get("pdf")
        radiologue_id = data.get("radiologue_id")
        if not bilan_id:
            return JsonResponse({"error": "bilan_id is required"})
        if not pdf:
            return JsonResponse({"error": "pdf is required"})
        if not radiologue_id:
            return JsonResponse({"error": "radiologue_id is required"})
        try:
            bilan = BilanRadio.objects.get(id=bilan_id)
        except BilanRadio.DoesNotExist:
            return JsonResponse({"error": "BilanRadio not found"})
        try:
            radiologue = PersonnelMedical.objects.get(id=radiologue_id)
        except PersonnelMedical.DoesNotExist:
            return JsonResponse({"error": "Radiologue not found"})
        if not bilan.resultat_id:
            resultat = ResultatRadio(
                piece_jointe=pdf,
                date=datetime.now(),
                radiologue=radiologue,
            )
            resultat.save()
            bilan.resultat_id = resultat
            bilan.save()
        else:
            if bilan.resultat_id.radiologue != radiologue:
                return JsonResponse({"error": "Radiologue ne peut pas changer le pdf"})
            bilan.resultat_id.piece_jointe = pdf
            bilan.resultat_id.date = datetime.now()
            bilan.resultat_id.save()
        return JsonResponse({"success": "Resultat added"})
    else:
        return JsonResponse({"error": "Invalid request"})


@csrf_exempt
def ajouter_resultat_radio_compte_rendu(request):
    if request.method == "POST":
        data = json.loads(request.body)
        bilan_id = data.get("bilan_id")
        compte = data.get("compte-rendu")
        radiologue_id = data.get("radiologue_id")
        if not bilan_id:
            return JsonResponse({"error": "bilan_id is required"})
        if not compte:
            return JsonResponse({"error": "compte is required"})
        if not radiologue_id:
            return JsonResponse({"error": "radiologue_id is required"})
        try:
            bilan = BilanRadio.objects.get(id=bilan_id)
        except BilanRadio.DoesNotExist:
            return JsonResponse({"error": "BilanRadio not found"})
        try:
            radiologue = PersonnelMedical.objects.get(id=radiologue_id)
        except PersonnelMedical.DoesNotExist:
            return JsonResponse({"error": "Radiologue not found"})
        if not bilan.resultat_id:
            return JsonResponse(
                {"error": "Compte rendu ne peut pa etre ecrite avant le piece jointe"}
            )
        if bilan.resultat_id.radiologue_compte_rendu:
            if bilan.resultat_id.radiologue_compte_rendu != radiologue:
                return JsonResponse(
                    {"error": "Radiologue ne peut pas changer le compte rendu"}
                )
        bilan.resultat_id.compte_rendu = compte
        bilan.resultat_id.radiologue_compte_rendu = radiologue
        bilan.resultat_id.save()
        bilan.save()
        return JsonResponse({"success": "Resultat added"})
    else:
        return JsonResponse({"error": "Invalid request"})


@csrf_exempt
def supprimer_resultat_radio_compte_rendu(request):
    if request.method == "POST":
        data = json.loads(request.body)
        bilan_id = data.get("bilan_id")
        radiologue_id = data.get("radiologue_id")
        if not bilan_id:
            return JsonResponse({"error": "bilan_id is required"})
        if not radiologue_id:
            return JsonResponse({"error": "radiologue_id is required"})
        try:
            bilan = BilanRadio.objects.get(id=bilan_id)
        except BilanRadio.DoesNotExist:
            return JsonResponse({"error": "BilanRadio not found"})
        try:
            radiologue = PersonnelMedical.objects.get(id=radiologue_id)
        except PersonnelMedical.DoesNotExist:
            return JsonResponse({"error": "Radiologue not found"})
        if bilan.resultat_id.compte_rendu:
            if bilan.resultat_id.radiologue_compte_rendu != radiologue:
                return JsonResponse(
                    {"error": "Radiologue ne peut pas supprimer le compte rendu"}
                )
            bilan.resultat_id.compte_rendu = ""
            bilan.resultat_id.radiologue_compte_rendu = None
            bilan.resultat_id.save()
            bilan.save()
        return JsonResponse({"success": "Compte rendu deleted"})
    else:
        return JsonResponse({"error": "Invalid request"})

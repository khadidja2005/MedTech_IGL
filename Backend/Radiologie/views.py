from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from django.views.decorators.http import require_http_methods
from BDD.models import (
    PersonnelMedical,
    etablissement_personnel_medical,
    BilanRadio,
)


@csrf_exempt
@require_http_methods(["GET"])
def archive_radio(request):
    if request.method == "GET":
        Radiologue = request.GET.get("Radiologue")
        if not Radiologue:
            return JsonResponse({"error": "Radiologue not provided"}, status=400)
        try:
            Radiologue = PersonnelMedical.objects.get(id=Radiologue)
        except PersonnelMedical.DoesNotExist:
            return JsonResponse({"error": "Radiologue not found"}, status=404)
        if Radiologue.role != "RADIOLOGUE":
            return JsonResponse({"error": "Personnel is not a Radiologue"}, status=400)
        etab_perso = etablissement_personnel_medical.objects.filter(
            personnel_medical=Radiologue
        )
        etablissement = []
        count = 0
        for ep in etab_perso:
            etablissement.append(ep.etablissement)
        bilans = []
        for bilan in BilanRadio.objects.all():
            etab = bilan.Consultation.Hospitalisation.DPI.etablissement_id
            if etab in etablissement and bilan.est_resultat:
                count += 1
                bilans.append(
                    {
                        "id": bilan.id,
                        "date": bilan.date_debut.strftime("%Y-%m-%d"),
                        "etablissement": etab.nom_etablissement,
                    }
                )
        return JsonResponse({"bilans": bilans, "numBilans": count}, status=200)
    else:
        return JsonResponse({"error": "Method not allowed"}, status=405)


def get_radios(request):
    if request.method == "GET":
        Radiologue = request.GET.get("Radiologue")
        if not Radiologue:
            return JsonResponse({"error": "Radiologue not provided"}, status=400)
        try:
            Radiologue = PersonnelMedical.objects.get(id=Radiologue)
        except PersonnelMedical.DoesNotExist:
            return JsonResponse({"error": "Radiologue not found"}, status=404)
        if Radiologue.role != "RADIOLOGUE":
            return JsonResponse({"error": "Personnel is not a Radiologue"}, status=400)
        etab_perso = etablissement_personnel_medical.objects.filter(
            personnel_medical=Radiologue
        )
        etablissement = []
        count = 0
        for ep in etab_perso:
            etablissement.append(ep.etablissement)
        bilans = []
        for bilan in BilanRadio.objects.all():
            etab = bilan.Consultation.Hospitalisation.DPI.etablissement_id
            if etab in etablissement and not bilan.est_resultat:
                count += 1
                bilans.append(
                    {
                        "id": bilan.id,
                        "date": bilan.date_debut.strftime("%Y-%m-%d"),
                        "etablissement": etab.nom_etablissement,
                    }
                )
        return JsonResponse({"bilans": bilans, "numBilans": count})
    else:
        return JsonResponse({"error": "Method not allowed"}, status=405)

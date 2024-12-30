from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from django.views.decorators.http import require_http_methods
from BDD.models import (
    PersonnelMedical,
    etablissement_personnel_medical,
    BilanBio,
)


@csrf_exempt
@require_http_methods(["GET"])
def archive_labo(request):
    if request.method == "GET":
        data = json.loads(request.body)
        laborantin = data.get("laborantin")
        if not laborantin:
            return JsonResponse({"error": "Laborantin not provided"}, status=400)
        try:
            laborantin = PersonnelMedical.objects.get(id=laborantin)
        except PersonnelMedical.DoesNotExist:
            return JsonResponse({"error": "Laborantin not found"}, status=404)
        if laborantin.role != "LABORANTIN":
            return JsonResponse({"error": "Personnel is not a laborantin"}, status=400)
        etab_perso = etablissement_personnel_medical.objects.filter(
            personnel_medical=laborantin
        )
        etablissement = []
        count = 0
        for ep in etab_perso:
            etablissement.append(ep.etablissement)
        bilans = []
        for bilan in BilanBio.objects.all():
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


def get_bilans(request):
    if request.method == "GET":
        data = json.loads(request.body)
        laborantin = data.get("laborantin")
        if not laborantin:
            return JsonResponse({"error": "Laborantin not provided"}, status=400)
        try:
            laborantin = PersonnelMedical.objects.get(id=laborantin)
        except PersonnelMedical.DoesNotExist:
            return JsonResponse({"error": "Laborantin not found"}, status=404)
        if laborantin.role != "LABORANTIN":
            return JsonResponse({"error": "Personnel is not a laborantin"}, status=400)
        etab_perso = etablissement_personnel_medical.objects.filter(
            personnel_medical=laborantin
        )
        etablissement = []
        count = 0
        for ep in etab_perso:
            etablissement.append(ep.etablissement)
        bilans = []
        for bilan in BilanBio.objects.all():
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

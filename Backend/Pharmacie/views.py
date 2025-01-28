from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from django.views.decorators.http import require_http_methods
from BDD.models import (
    PersonnelMedical,
    etablissement_personnel_medical,
    Ordonnance,
)


@csrf_exempt
@require_http_methods(["GET"])
def archive_pharmacie(request):
    if request.method == "GET":
        pharmacien = request.GET.get("pharmacien")
        try:
            pharmacien = PersonnelMedical.objects.get(id=pharmacien)
        except PersonnelMedical.DoesNotExist:
            return JsonResponse({"error": "Pharmacien not found"}, status=404)
        if pharmacien.role != "PHARMACIEN":
            return JsonResponse({"error": "Personnel is not a pharmacien"}, status=400)
        etab_perso = etablissement_personnel_medical.objects.filter(
            personnel_medical=pharmacien
        )
        etablissement = []
        count = 0
        for ep in etab_perso:
            etablissement.append(ep.etablissement)
            count += 1

        if count == 0:
            return JsonResponse(
                {"error": "Pharmacien has no etablissement"}, status=400
            )
        ords = []
        for ord in Ordonnance.objects.all():
            etab = ord.consultation.Hospitalisation.DPI.etablissement_id
            if etab in etablissement and ord.estValide:
                ords.append(
                    {
                        "id": ord.id,
                        "date": ord.consultation.date.strftime("%Y-%m-%d"),
                        "etablissement": etab.nom_etablissement,
                    }
                )
        return JsonResponse({"ordonnances": ords, "numOrdonnances": len(ords)})
    else:
        return JsonResponse({"error": "Method not allowed"}, status=405)


def get_ordonnances(request):
    if request.method == "GET":
        pharmacien = request.GET.get("pharmacien")
        try:
            pharmacien = PersonnelMedical.objects.get(id=pharmacien)
        except PersonnelMedical.DoesNotExist:
            return JsonResponse({"error": "Pharmacien not found"}, status=404)
        if pharmacien.role != "PHARMACIEN":
            return JsonResponse({"error": "Personnel is not a pharmacien"}, status=400)
        etab_perso = etablissement_personnel_medical.objects.filter(
            personnel_medical=pharmacien
        )
        etablissement = []
        for ep in etab_perso:
            etablissement.append(ep.etablissement)
        ords = []
        count = 0
        for ord in Ordonnance.objects.all():
            etab = ord.consultation.Hospitalisation.DPI.etablissement_id
            if etab in etablissement and not ord.estValide:
                count += 1
                ords.append(
                    {
                        "id": ord.id,
                        "date": ord.consultation.date.strftime("%Y-%m-%d"),
                        "etablissement_id": etab.id,
                        "etablissement": etab.nom_etablissement,
                    }
                )
        return JsonResponse({"ordonnances": ords})
    else:
        return JsonResponse({"error": "Method not allowed"}, status=405)

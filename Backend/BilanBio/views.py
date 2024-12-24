from datetime import datetime
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from django.views.decorators.http import require_http_methods
from BDD.models import BilanBio, ResultatBio, PersonnelMedical


@csrf_exempt
@require_http_methods(["GET"])
def get_info_bilan_bio(request):
    if request.method == "GET":
        data = json.loads(request.body)
        bilan_id = data.get("bilan_id")
        if not bilan_id:
            return JsonResponse({"error": "bilan_id is required"})
        try:
            bilan = BilanBio.objects.get(id=bilan_id)
        except BilanBio.DoesNotExist:
            return JsonResponse({"error": "BilanBio not found"})
        if bilan.est_resultat:
            resultats = ResultatBio.objects.filter(bilan_bio=bilan)
            resultats_response = []
            for res in resultats:
                resultats_response.append(
                    {
                        "id": res.id,
                        "valeur_mesure": res.valeur_mesure,
                        "date_mesure": res.date_mesure.strftime("%Y-%m-%d"),
                        "heure_mesure": res.heure_mesure.strftime("%H:%M:%S"),
                        "parametre": res.parametre,
                        "norme": res.norme,
                        "laborantin_id": res.laborantin.id,
                        "laborantin": res.laborantin.nom_complet,
                    }
                )

        else:
            resultats_response = []
        return JsonResponse(
            {
                "date_debut": bilan.date_debut,
                "date_fin": bilan.date_fin,
                "parametres": bilan.parametres,
                "est_complet": bilan.est_complet,
                "est_resultat": bilan.est_resultat,
                "medecin_id": bilan.medecin.id,
                "medecin": bilan.medecin.nom_complet,
                "resultats": resultats_response,
            }
        )
    else:
        return JsonResponse({"error": "Invalid request"})


@csrf_exempt
def valider_bilan_bio(request):
    if request.method == "POST":
        data = json.loads(request.body)
        bilan_id = data.get("bilan_id")
        if not bilan_id:
            return JsonResponse({"error": "Invalid request"})
        try:
            bilan = BilanBio.objects.get(id=bilan_id)
        except BilanBio.DoesNotExist:
            return JsonResponse({"error": "BilanBio not found"})
        bilan.est_resultat = True
        bilan.save()
        return JsonResponse({"success": "BilanBio validated"})
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
            bilan = BilanBio.objects.get(id=bilan_id)
        except BilanBio.DoesNotExist:
            return JsonResponse({"error": "BilanBio not found"})
        resultats = ResultatBio.objects.filter(bilan_bio=bilan)
        if bilan.est_complet and resultats.len() == len(bilan.parametres.split(",")):
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
            bilan = BilanBio.objects.get(id=bilan_id)
        except BilanBio.DoesNotExist:
            return JsonResponse({"error": "BilanBio not found"})

        if bilan.parametres.len() == 0:
            return JsonResponse({"peut_terminer": False})
        else:
            return JsonResponse({"peut_terminer": True})
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
            bilan = BilanBio.objects.get(id=bilan_id)
        except BilanBio.DoesNotExist:
            return JsonResponse({"error": "BilanBio not found"})
        bilan.est_complet = True
        bilan.save()
        return JsonResponse({"success": "BilanBio completed"})
    else:
        return JsonResponse({"error": "Invalid request"})


@csrf_exempt
def supprimer_bilan_bio(request):
    if request.method == "POST":
        data = json.loads(request.body)
        bilan_id = data.get("bilan_id")
        if not bilan_id:
            return JsonResponse({"error": "Invalid request"})
        try:
            bilan = BilanBio.objects.get(id=bilan_id)
        except BilanBio.DoesNotExist:
            return JsonResponse({"error": "BilanBio not found"})
        bilan.delete()
        return JsonResponse({"success": "BilanBio deleted"})
    else:
        return JsonResponse({"error": "Invalid request"})


@csrf_exempt
def ajouter_parametre(request):
    if request.method == "POST":
        data = json.loads(request.body)
        bilan_id = data.get("bilan_id")
        parametre = data.get("parametre")
        if not bilan_id:
            return JsonResponse({"error": "Billan id is required"})
        if not parametre:
            return JsonResponse({"error": "parametre is required"})
        try:
            bilan = BilanBio.objects.get(id=bilan_id)
        except BilanBio.DoesNotExist:
            return JsonResponse({"error": "BilanBio not found"})
        bilan.parametres += "," + parametre
        bilan.save()
        return JsonResponse({"success": "Parametre added"})
    else:
        return JsonResponse({"error": "Invalid request"})


@csrf_exempt
def modifier_parametre(request):
    if request.method == "POST":
        data = json.loads(request.body)
        bilan_id = data.get("bilan_id")
        parametre_old = data.get("parametre_old")
        parametre_new = data.get("parametre_new")
        if not bilan_id:
            return JsonResponse({"error": "Billan id is required"})
        if not parametre_old:
            return JsonResponse({"error": "Old parametre is required"})
        if not parametre_new:
            return JsonResponse({"error": "New parametre is required"})
        try:
            bilan = BilanBio.objects.get(id=bilan_id)
        except BilanBio.DoesNotExist:
            return JsonResponse({"error": "BilanBio not found"})
        parametres = bilan.parametres.split(",")
        if parametre_old in parametres:
            parametres.remove(parametre_old)
            bilan.parametres = ",".join(parametres)
            bilan.parametres += "," + parametre_new
            bilan.save()
            return JsonResponse({"success": "Parametre modified"})
        else:
            return JsonResponse({"error": "Parametre not found"})
    else:
        return JsonResponse({"error": "Invalid request"})


@csrf_exempt
def supprimer_parametre(request):
    if request.method == "POST":
        data = json.loads(request.body)
        bilan_id = data.get("bilan_id")
        parametre = data.get("parametre")
        if not bilan_id:
            return JsonResponse({"error": "Billan id is required"})
        if not parametre:
            return JsonResponse({"error": "Parametre is required"})
        try:
            bilan = BilanBio.objects.get(id=bilan_id)
        except BilanBio.DoesNotExist:
            return JsonResponse({"error": "BilanBio not found"})
        parametres = bilan.parametres.split(",")
        if parametre in parametres:
            parametres.remove(parametre)
            bilan.parametres = ",".join(parametres)
            bilan.save()
            return JsonResponse({"success": "Parametre removed"})
        else:
            return JsonResponse({"error": "Parametre not found"})
    else:
        return JsonResponse({"error": "Invalid request"})


@csrf_exempt
def ajouter_resultat_bio(request):
    if request.method == "POST":
        data = json.loads(request.body)
        bilan_id = data.get("bilan_id")
        valeur_mesure = data.get("valeur_mesure")
        date_mesure = data.get("date_mesure")
        heure_mesure = data.get("heure_mesure")
        parametre = data.get("parametre")
        norme = data.get("norme")
        laborantin_id = data.get("laborantin_id")
        if not bilan_id:
            return JsonResponse({"error": "Billan id is required"})
        if not valeur_mesure:
            return JsonResponse({"error": "Valeur mesure is required"})
        if not date_mesure:
            return JsonResponse({"error": "Date mesure is required"})
        if not heure_mesure:
            return JsonResponse({"error": "Heure mesure is required"})
        if not parametre:
            return JsonResponse({"error": "Parametre is required"})
        if not norme:
            return JsonResponse({"error": "Norme is required"})
        if not laborantin_id:
            return JsonResponse({"error": "Laborantin id is required"})
        try:
            bilan = BilanBio.objects.get(id=bilan_id)
        except BilanBio.DoesNotExist:
            return JsonResponse({"error": "BilanBio not found"})
        try:
            laborantin = PersonnelMedical.objects.get(id=laborantin_id)
        except PersonnelMedical.DoesNotExist:
            return JsonResponse({"error": "Laborantin not found"})
        if parametre not in bilan.parametres.split(","):
            return JsonResponse({"error": "Parametre not found in bilan"})
        resultat = ResultatBio(
            valeur_mesure=valeur_mesure,
            date_mesure=datetime.strptime(date_mesure, "%d/%m/%Y").strftime("%Y-%m-%d"),
            heure_mesure=datetime.strptime(heure_mesure, "%H:%M").strftime("%H:%M:%S"),
            parametre=parametre,
            norme=norme,
            bilan_bio=bilan,
            laborantin=laborantin,
        )
        resultat.save()
        return JsonResponse({"success": "Resultat added"})
    else:
        return JsonResponse({"error": "Invalid request"})


@csrf_exempt
def modifier_resultat_bio(request):
    if request.method == "POST":
        data = json.loads(request.body)
        bilan_id = data.get("bilan_id")
        valeur_mesure = data.get("valeur_mesure")
        date_mesure = data.get("date_mesure")
        heure_mesure = data.get("heure_mesure")
        parametre = data.get("parametre")
        norme = data.get("norme")
        laborantin_id = data.get("laborantin_id")
        if not bilan_id:
            return JsonResponse({"error": "Billan id is required"})
        if not valeur_mesure:
            return JsonResponse({"error": "Valeur mesure is required"})
        if not date_mesure:
            return JsonResponse({"error": "Date mesure is required"})
        if not heure_mesure:
            return JsonResponse({"error": "Heure mesure is required"})
        if not parametre:
            return JsonResponse({"error": "Parametre is required"})
        if not norme:
            return JsonResponse({"error": "Norme is required"})
        if not laborantin_id:
            return JsonResponse({"error": "Laborantin id is required"})
        try:
            bilan = BilanBio.objects.get(id=bilan_id)
        except BilanBio.DoesNotExist:
            return JsonResponse({"error": "BilanBio not found"})
        try:
            laborantin = PersonnelMedical.objects.get(id=laborantin_id)
        except PersonnelMedical.DoesNotExist:
            return JsonResponse({"error": "Laborantin not found"})
        if parametre not in bilan.parametres.split(","):
            return JsonResponse({"error": "Parametre not found in bilan"})
        resultat = ResultatBio.objects.get(bilan_bio=bilan, parametre=parametre)
        if not resultat:
            return JsonResponse({"error": "Resultat not found"})
        if resultat.laborantin != laborantin:
            return JsonResponse(
                {"error": "Laborantin not allowed to modify this result"}
            )
        resultat.valeur_mesure = valeur_mesure
        resultat.date_mesure = datetime.strptime(date_mesure, "%d/%m/%Y").strftime(
            "%Y-%m-%d"
        )
        resultat.heure_mesure = datetime.strptime(heure_mesure, "%H:%M").strftime(
            "%H:%M:%S"
        )
        resultat.norme = norme
        resultat.save()
        return JsonResponse({"success": "Resultat modified"})
    else:
        return JsonResponse({"error": "Invalid request"})


@csrf_exempt
def supprimer_resultat_bio(request):
    if request.method == "POST":
        data = json.loads(request.body)
        bilan_id = data.get("bilan_id")
        parametre = data.get("parametre")
        laborantin_id = data.get("laborantin_id")
        if not bilan_id:
            return JsonResponse({"error": "Billan id is required"})
        if not parametre:
            return JsonResponse({"error": "Parametre is required"})
        if not laborantin_id:
            return JsonResponse({"error": "Laborantin id is required"})
        try:
            laborantin = PersonnelMedical.objects.get(id=laborantin_id)
        except PersonnelMedical.DoesNotExist:
            return JsonResponse({"error": "Laborantin not found"})
        try:
            bilan = BilanBio.objects.get(id=bilan_id)
        except BilanBio.DoesNotExist:
            return JsonResponse({"error": "BilanBio not found"})
        if parametre not in bilan.parametres.split(","):
            return JsonResponse({"error": "Parametre not found in bilan"})
        resultat = ResultatBio.objects.get(bilan_bio=bilan, parametre=parametre)
        if not resultat:
            return JsonResponse({"error": "Resultat not found"})
        if resultat.laborantin != laborantin:
            return JsonResponse(
                {"error": "Laborantin not allowed to delete this result"}
            )
        resultat.delete()
        return JsonResponse({"success": "Resultat deleted"})
    else:
        return JsonResponse({"error": "Invalid request"})

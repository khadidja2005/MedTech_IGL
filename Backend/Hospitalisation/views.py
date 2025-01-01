from BDD.models import (
    Hospitalisation,
    Consultation,
    Soins,
    etablissement_personnel_medical,
    PersonnelMedical,
)
from datetime import datetime
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from django.views.decorators.http import require_http_methods


@csrf_exempt
@require_http_methods(["GET"])
def get_info_hospitalisation(request):
    if request.method == "GET":
        hospitalisation_id = request.GET.get("hospitalisation_id")
        if not hospitalisation_id:
            return JsonResponse(
                {"error": "hospitalisation_id is required."}, status=400
            )
        try:
            # Fetch the Hospitalisation object
            hospitalisation = Hospitalisation.objects.get(id=hospitalisation_id)
        except Hospitalisation.DoesNotExist:
            return JsonResponse(
                {"error": "Hospitalisation with the provided id not found."}, status=404
            )

    # Ensure all fields are JSON-serializable
    response_data = {
        "date_debut": hospitalisation.date_debut.strftime("%Y-%m-%d"),
        "medecin": hospitalisation.medecin_responsable.nom_complet,
        "date_fin": (
            hospitalisation.date_fin.strftime("%Y-%m-%d")
            if hospitalisation.date_fin
            else None
        ),
    }

    # Return the response as JSON
    return JsonResponse(response_data)


def get_consultations(request):
    if request.method == "GET":
        hospitalisation_id = request.GET.get("hospitalisation_id")
        if not hospitalisation_id:
            return JsonResponse(
                {"error": "hospitalisation_id is required."}, status=400
            )

        try:
            # Fetch the Hospitalisation object
            hospitalisation = Hospitalisation.objects.get(id=hospitalisation_id)
        except Hospitalisation.DoesNotExist:
            return JsonResponse(
                {"error": "Hospitalisation with the provided id not found."}, status=404
            )

        # Fetch all Consultation objects related to the Hospitalisation
        consultations = Consultation.objects.filter(Hospitalisation=hospitalisation_id)

        # Ensure all fields are JSON-serializable
        response_data = [
            {
                "id": consultation.id,
                "date": consultation.date.strftime("%Y-%m-%d"),
                "medecin": consultation.Medecin.nom_complet,
            }
            for consultation in consultations
        ]

        # Return the response as JSON
        return JsonResponse(response_data, safe=False)


def get_soins(request):
    if request.method == "GET":
        hospitalisation_id = request.GET.get("hospitalisation_id")
        if not hospitalisation_id:
            return JsonResponse(
                {"error": "hospitalisation_id is required."}, status=400
            )

        try:
            # Fetch the Hospitalisation object
            hospitalisation = Hospitalisation.objects.get(id=hospitalisation_id)
        except Hospitalisation.DoesNotExist:
            return JsonResponse(
                {"error": "Hospitalisation with the provided id not found."}, status=404
            )

        # Fetch all Consultation objects related to the Hospitalisation
        soins = Soins.objects.filter(hospitalisation=hospitalisation)

        # Ensure all fields are JSON-serializable
        response_data = [
            {
                "id": soin.id,
                "date": soin.date.strftime("%Y-%m-%d"),
                "heur": soin.heure.strftime("%H:%M:%S"),
                "infermier": soin.infermier.nom_complet,
                "type_soins": soin.type_soins,
            }
            for soin in soins
        ]

        # Return the response as JSON
        return JsonResponse(response_data, safe=False)
    else:
        return JsonResponse({"error": "Invalid request method."}, status=405)


def get_all_medecins(request):
    if request.method == "GET":
        hospitalisation_id = request.GET.get("hospitalisation_id")
        if not hospitalisation_id:
            return JsonResponse(
                {"error": "hospitalisation_id is required."}, status=400
            )

        try:
            # Fetch the Hospitalisation object
            hospitalisation = Hospitalisation.objects.get(id=hospitalisation_id)
        except Hospitalisation.DoesNotExist:
            return JsonResponse(
                {"error": "Hospitalisation with the provided id not found."}, status=404
            )

        etablissement_id = hospitalisation.DPI.etablissement_id

        medecins = etablissement_personnel_medical.objects.filter(
            etablissement=etablissement_id
        )

        response = [
            {
                "id": medecin.personnel_medical.id,
                "nom": medecin.personnel_medical.nom_complet,
            }
            for medecin in medecins
        ]
        return JsonResponse(response, safe=False)
    else:
        return JsonResponse({"error": "Invalid request method."}, status=405)


@csrf_exempt
def modifier(request):
    if request.method == "POST":
        data = json.loads(request.body)
        hospitalisation_id = data.get("hospitalisation_id")
        medecin_id = data.get("medecin_id")
        date_debut = data.get("date_debut")
        date_fin = data.get("date_fin")
        if not hospitalisation_id:
            return JsonResponse(
                {"error": "hospitalisation_id is required."}, status=400
            )
        try:
            hospitalisation = Hospitalisation.objects.get(id=hospitalisation_id)
        except Hospitalisation.DoesNotExist:
            return JsonResponse(
                {"error": "Hospitalisation with the provided id not found."}, status=404
            )
        if medecin_id:
            try:
                medecin = PersonnelMedical.objects.get(id=medecin_id)
            except PersonnelMedical.DoesNotExist:
                return JsonResponse(
                    {"error": "Medecin with the provided id not found."}, status=404
                )
            hospitalisation.medecin_responsable = medecin

        if date_debut:
            hospitalisation.date_debut = date_debut
        if date_fin:
            hospitalisation.date_fin = date_fin
        else:
            status = data.get("status")
            if status == "fini":
                hospitalisation.date_fin = None
        hospitalisation.save()
        return JsonResponse({"message": "Hospitalisation updated successfully."})
    else:
        return JsonResponse({"error": "Invalid request method."}, status=405)


@csrf_exempt
def ajouter_consultation(request):
    if request.method == "POST":
        data = json.loads(request.body)
        hospitalisation_id = data.get("hospitalisation_id")
        medecin_id = data.get("medecin_id")
        date = data.get("date")
        if not hospitalisation_id:
            return JsonResponse(
                {"error": "hospitalisation_id is required."}, status=400
            )
        try:
            hospitalisation = Hospitalisation.objects.get(id=hospitalisation_id)
        except Hospitalisation.DoesNotExist:
            return JsonResponse(
                {"error": "Hospitalisation with the provided id not found."}, status=404
            )
        if medecin_id:
            try:
                medecin = PersonnelMedical.objects.get(id=medecin_id)
            except PersonnelMedical.DoesNotExist:
                return JsonResponse(
                    {"error": "Medecin with the provided id not found."}, status=404
                )
        if not date:
            return JsonResponse({"error": "'date' is required."}, status=400)

        consultation = Consultation(
            date=datetime.strptime(date, "%d/%m/%Y").strftime("%Y-%m-%d"),
            Hospitalisation=hospitalisation,
            Medecin=medecin,
        )
        consultation.save()
        return JsonResponse({"message": "Consultation added successfully."})
    else:
        return JsonResponse({"error": "Invalid request method."}, status=405)


@csrf_exempt
def ajouter_soin(request):
    if request.method == "POST":
        data = json.loads(request.body)
        hospitalisation_id = data.get("hospitalisation_id")
        infermier_id = data.get("infermier_id")
        date = data.get("date")
        heure = data.get("heure")
        type_soins = data.get("type_soin")
        medicament = data.get("medicament")
        dose = data.get("dose")
        description = data.get("description")
        if not hospitalisation_id:
            return JsonResponse(
                {"error": "hospitalisation_id is required."}, status=400
            )
        if not infermier_id:
            return JsonResponse({"error": "infermier_id is required."}, status=400)
        if not date:
            return JsonResponse({"error": "'date' is required."}, status=400)
        if not heure:
            return JsonResponse({"error": "'heure' is required."}, status=400)
        if not type_soins:
            return JsonResponse({"error": "'type_soins' is required."}, status=400)
        try:
            hospitalisation = Hospitalisation.objects.get(id=hospitalisation_id)
        except Hospitalisation.DoesNotExist:
            return JsonResponse(
                {"error": "Hospitalisation with the provided id not found."}, status=404
            )
        try:
            infermier = PersonnelMedical.objects.get(id=infermier_id)
        except PersonnelMedical.DoesNotExist:
            return JsonResponse(
                {"error": "Infermier with the provided id not found."}, status=404
            )
        if type_soins not in Soins.typeSoinsChoices.values:
            return JsonResponse(
                {"error": f"'{type_soins}' is not a valid type of soins."}, status=400
            )
        if (
            type_soins == "ADMINISTRATION DE MEDICAMENT"
            or type_soins == "Administration de médicament"
            or type_soins == "Administration de medicament"
        ):
            if not medicament:
                return JsonResponse({"error": "'medicament' is required."}, status=400)
            if not dose:
                return JsonResponse({"error": "'dose' is required."}, status=400)
        else:
            if not description:
                return JsonResponse({"error": "'description' is required."}, status=400)

        soin = Soins(
            date=datetime.strptime(date, "%d/%m/%Y").strftime("%Y-%m-%d"),
            heure=datetime.strptime(heure, "%H:%M").strftime("%H:%M:%S"),
            type_soins=type_soins,
            hospitalisation=hospitalisation,
            infermier=infermier,
            description=description,
            medicament=medicament,
            dose=dose,
        )
        soin.save()
        return JsonResponse({"message": "Soins added successfully."})
    else:
        return JsonResponse({"error": "Invalid request method."}, status=405)


@csrf_exempt
def supprimer(request):
    if request.method == "DELETE":
        data = json.loads(request.body)
        hospitalisation_id = data.get("hospitalisation_id")
        if not hospitalisation_id:
            return JsonResponse(
                {"error": "hospitalisation_id is required."}, status=400
            )
        try:
            hospitalisation = Hospitalisation.objects.get(id=hospitalisation_id)
        except Hospitalisation.DoesNotExist:
            return JsonResponse(
                {"error": "Hospitalisation with the provided id not found."}, status=404
            )
        hospitalisation.delete()
        return JsonResponse({"message": "Hospitalisation deleted successfully."})
    else:
        return JsonResponse({"error": "Invalid request method."}, status=405)

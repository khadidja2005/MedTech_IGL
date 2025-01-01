from BDD.models import (
    DPI,
    Etablissement,
    Patient,
    Admin,
    PersonnelMedical,
    etablissement_personnel_medical,
)
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from django.views.decorators.http import require_http_methods
from datetime import datetime


@csrf_exempt
@require_http_methods(["GET"])  # Handle GET requests
def get_num_DPIS(request):
    if request.method == "GET":
        # Count the total number of DPIs in the database
        total_dpis = DPI.objects.count()

        # Return the count as a JSON response
        return JsonResponse({"total_dpis_number": total_dpis})
    else:
        return JsonResponse({"error": "Invalid request method"}, status=405)


def get_all_DPIS(request):
    if request.method == "GET":
        personnel_id = request.GET.get("personnel_id")
        if not personnel_id:
            return JsonResponse({"error": "Personnel ID is required."}, status=400)
        try:
            personnel = PersonnelMedical.objects.get(id=personnel_id)
            etabs = etablissement_personnel_medical.objects.filter(
                personnel_medical_id=personnel
            )
            respose_data = []
            for etab in etabs:
                dpis = DPI.objects.filter(etablissement_id=etab.etablissement)
                for dpi in dpis:
                    respose_data.append(
                        {
                            "id": dpi.id,
                            "nom_complet": dpi.patient.nom_complet,
                            "nss": dpi.patient.nss,
                            "etablissement": dpi.etablissement_id.id,
                        }
                    )
        except PersonnelMedical.DoesNotExist:
            try:
                personnel = Admin.objects.get(id=personnel_id)
                # Get all DPIs in the database
                all_dpis = DPI.objects.all()
                respose_data = []
                for dpi in all_dpis:
                    respose_data.append(
                        {
                            "id": dpi.id,
                            "nom_complet": dpi.patient.nom_complet,
                            "nss": dpi.patient.nss,
                            "etablissement": dpi.etablissement_id.id,
                        }
                    )
            except Admin.DoesNotExist:
                return JsonResponse(
                    {"error": "Personnel with the provided ID not found."}, status=404
                )
        # Return the DPIs as a JSON response
        return JsonResponse({"all_dpis": respose_data})
    else:
        return JsonResponse({"error": "Invalid request method"}, status=405)


def get_DPI(request):
    if request.method == "GET":
        data = json.loads(request.body)
        nss = data.get("nss")
        etablissement_id = data.get("etablissement_id")

        if not nss or not etablissement_id:
            return JsonResponse(
                {"error": "Both 'nss' and 'etablissement_id' are required."}, status=400
            )

        # Retrieve the patient by NSS
        try:
            patient = Patient.objects.get(nss=nss)
        except Patient.DoesNotExist:
            return JsonResponse(
                {"error": "Patient with the provided NSS not found."}, status=404
            )

        try:
            etablissement = Etablissement.objects.get(id=etablissement_id)
        except Etablissement.DoesNotExist:
            return JsonResponse(
                {"error": "Etablissement with the provided id not found."}, status=404
            )

        # Retrieve the DPI by patient_id and etablissement_id
        try:
            dpi = DPI.objects.get(patient=patient, etablissement_id=etablissement_id)
        except DPI.DoesNotExist:
            return JsonResponse(
                {"error": "DPI not found for the given patient and etablissement."},
                status=404,
            )

        # Return the DPI data (you can customize the fields you want to return)
        return JsonResponse(
            {
                "dpi_id": dpi.id,
            }
        )
    else:
        return JsonResponse({"error": "Invalid request method."}, status=405)


def get_DPIS_patient(request):
    if request.method == "GET":
        nss = request.GET.get("nss")
        if not nss:
            return JsonResponse({"error": "NSS is required."}, status=400)

        # Retrieve the patient by NSS
        try:
            patient = Patient.objects.get(nss=nss)
        except Patient.DoesNotExist:
            return JsonResponse(
                {"error": "Patient with the provided NSS not found."}, status=200
            )

        # Retrieve all DPIs associated with the patient and include related Etablissement
        patient_dpis = DPI.objects.filter(patient=patient)
        dpi_data = []
        for dpi in patient_dpis:
            dpi_data.append(
                {
                    "dpi_id": dpi.id,
                    "etablissement_nom": dpi.etablissement_id.nom_etablissement,
                }
            )
        # Prepare the response data
        response_data = {
            "patient_name": patient.nom_complet,
            "dpis": dpi_data,
        }

        return JsonResponse(response_data)

    else:
        return JsonResponse({"error": "Invalid request method."}, status=405)


@csrf_exempt
def creer_DPI(request):
    if request.method == "POST":
        data = json.loads(request.body)
        nss = data.get("nss")
        etablissement_id = data.get("etablissement_id")
        nom_complet = data.get("nom_complet")
        createur_id = data.get("createur_id")

        if not nss or not etablissement_id or not createur_id:
            return JsonResponse(
                {
                    "error": "Both 'nss', 'etablissement_id' and 'createur_id' are required."
                },
                status=400,
            )
        # Retrieve the patient by NSS
        try:
            patient = Patient.objects.get(nss=nss)
        except Patient.DoesNotExist:
            patient = Patient.objects.create(nss=nss, nom_complet=nom_complet)

        # Retrieve the Etablissement by ID
        try:
            etablissement = Etablissement.objects.get(id=etablissement_id)
        except Etablissement.DoesNotExist:
            return JsonResponse(
                {"error": "Etablissement with the provided ID not found."}, status=404
            )
        # check if the DPI already exists
        try:
            dpi = DPI.objects.get(patient=patient, etablissement_id=etablissement)
            return JsonResponse(
                {
                    "error": "DPI already exists for the given patient and etablissement."
                },
                status=400,
            )
        except DPI.DoesNotExist:
            pass
        # Retrieve the Admin by ID
        try:
            createur = Admin.objects.get(id=createur_id)
            # Create a new DPI
            new_dpi = DPI.objects.create(
                patient=patient,
                etablissement_id=etablissement,
                createur_id=createur,
                date_creation=datetime.now(),
            )
        except Admin.DoesNotExist:
            try:
                createur = PersonnelMedical.objects.get(id=createur_id)
                if createur.role != "MEDECIN":
                    return JsonResponse({"error": "User not allowed"}, status=404)
                # check si createur appartient a l'etablissemnt
                try:
                    check = etablissement_personnel_medical.objects.get(
                        etablissement_id=etablissement, personnel_medical_id=createur
                    )
                except etablissement_personnel_medical.DoesNotExist:
                    return JsonResponse(
                        {"error": "medecin not dans etablissement"}, status=404
                    )
                # Create a new DPI
                new_dpi = DPI.objects.create(
                    patient=patient,
                    etablissement_id=etablissement,
                    medecin_id=createur,
                    date_creation=datetime.now(),
                )
            except PersonnelMedical.DoesNotExist:
                return JsonResponse({"error": "User not allowed"}, status=404)

        # Return the newly created DPI data
        return JsonResponse(
            {
                "success": True,
                "dpi_id": new_dpi.id,
            }
        )
    else:
        return JsonResponse({"error": "Invalid request method."}, status=405)


def get_etablissements(request):
    if request.method == "GET":
        personnel_id = request.GET.get("personnel_id")
        if not personnel_id:
            return JsonResponse({"error": "Personnel ID is required."}, status=400)
        try:
            personnel = PersonnelMedical.objects.get(id=personnel_id)
            etabs = etablissement_personnel_medical.objects.filter(
                personnel_medical_id=personnel
            )
            respose_data = []
            for etab in etabs:
                respose_data.append(
                    {
                        "id": etab.etablissement.id,
                        "nom": etab.etablissement.nom_etablissement,
                    }
                )
        except PersonnelMedical.DoesNotExist:
            try:
                personnel = Admin.objects.get(id=personnel_id)
                # Get all etablissements in the database
                all_etablissements = Etablissement.objects.all()
                respose_data = []
                for etablissement in all_etablissements:
                    respose_data.append(
                        {
                            "id": etablissement.id,
                            "nom": etablissement.nom_etablissement,
                        }
                    )
            except Admin.DoesNotExist:
                return JsonResponse(
                    {"error": "Personnel with the provided ID not found."}, status=404
                )
        # Return the etablissements as a JSON response
        return JsonResponse({"all_etablissements": respose_data})
    else:
        return JsonResponse({"error": "Invalid request method"}, status=405)

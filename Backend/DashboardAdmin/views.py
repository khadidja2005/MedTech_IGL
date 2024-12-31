from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from BDD.models import *


# CRUD Etablissement
@api_view(["POST"])
def create_etablissement(request):
    print(request.data)
    try:
        etablissement = Etablissement.objects.create(
            nom_etablissement=request.data.get("nom_etablissement"),
            adresse=request.data.get("adresse"),
            telephone=request.data.get("telephone"),
            email=request.data.get("email"),
        )
        return Response(
            {
                "status": "success",
                "data": {
                    "id": etablissement.id,
                    "nom_etablissement": etablissement.nom_etablissement,
                    "adresse": etablissement.adresse,
                    "telephone": etablissement.telephone,
                    "email": etablissement.email,
                },
            },
            status=status.HTTP_201_CREATED,
        )
    except Exception as e:
        print(e)
        return Response(
            {"status": "error", "message": str(e)}, status=status.HTTP_400_BAD_REQUEST
        )


@api_view(["GET"])
def get_etablissement(request, etablissement_id):
    try:
        etablissement = get_object_or_404(Etablissement, id=etablissement_id)
        return Response(
            {
                "status": "success",
                "data": {
                    "id": etablissement.id,
                    "nom_etablissement": etablissement.nom_etablissement,
                    "adresse": etablissement.adresse,
                    "telephone": etablissement.telephone,
                    "email": etablissement.email,
                },
            }
        )
    except Exception as e:
        return Response(
            {"status": "error", "message": str(e)}, status=status.HTTP_404_NOT_FOUND
        )


@api_view(["GET"])
def get_all_etablissements(request):
    try:
        etablissements = Etablissement.objects.all()
        data = [
            {
                "id": etab.id,
                "nom_etablissement": etab.nom_etablissement,
                "adresse": etab.adresse,
                "telephone": etab.telephone,
                "email": etab.email,
            }
            for etab in etablissements
        ]
        return Response({"status": "success", "data": data})
    except Exception as e:
        return Response(
            {"status": "error", "message": str(e)}, status=status.HTTP_400_BAD_REQUEST
        )


@api_view(["PUT"])
def update_etablissement(request, etablissement_id):
    try:
        etablissement = get_object_or_404(Etablissement, id=etablissement_id)
        etablissement.nom_etablissement = request.data.get(
            "nom_etablissement", etablissement.nom_etablissement
        )
        etablissement.adresse = request.data.get("adresse", etablissement.adresse)
        etablissement.telephone = request.data.get("telephone", etablissement.telephone)
        etablissement.email = request.data.get("email", etablissement.email)
        etablissement.save()
        return Response(
            {
                "status": "success",
                "data": {
                    "id": etablissement.id,
                    "nom_etablissement": etablissement.nom_etablissement,
                    "adresse": etablissement.adresse,
                    "telephone": etablissement.telephone,
                    "email": etablissement.email,
                },
            }
        )
    except Exception as e:
        return Response(
            {"status": "error", "message": str(e)}, status=status.HTTP_400_BAD_REQUEST
        )


@api_view(["DELETE"])
def delete_etablissement(request, etablissement_id):
    try:
        etablissement = get_object_or_404(Etablissement, id=etablissement_id)
        etablissement.delete()
        return Response(
            {"status": "success", "message": "Etablissement supprimé avec succès"}
        )
    except Exception as e:
        return Response(
            {"status": "error", "message": str(e)}, status=status.HTTP_400_BAD_REQUEST
        )


# Personnel Medical Operations
@api_view(["GET"])
def get_personnel_medical_by_etablissement(request, etablissement_id):
    try:
        personnel_medical = PersonnelMedical.objects.filter(
            etablissement_personnel_medical__etablissement_id=etablissement_id
        ).values("id", "nom_complet", "email", "specialite", "telephone", "role")
        return Response({"status": "success", "data": list(personnel_medical)})
    except Exception as e:
        return Response(
            {"status": "error", "message": str(e)}, status=status.HTTP_400_BAD_REQUEST
        )


@api_view(["POST"])
def add_personnel_medical_to_etablissement(request, etablissement_id):
    try:
        etablissement = get_object_or_404(Etablissement, id=etablissement_id)

        # Créer le personnel médical
        personnel = PersonnelMedical.objects.create(
            id=request.data.get("id"),
            nom_complet=request.data.get("nom_complet"),
            email=request.data.get("email"),
            specialite=request.data.get("specialite"),
            telephone=request.data.get("telephone"),
            password=request.data.get("password"),
            role=request.data.get("role"),
        )

        # Créer la relation avec l'établissement
        etablissement_personnel_medical.objects.create(
            id=request.data.get("relation_id"),
            etablissement=etablissement,
            personnel_medical=personnel,
        )

        return Response(
            {
                "status": "success",
                "data": {
                    "id": personnel.id,
                    "nom_complet": personnel.nom_complet,
                    "email": personnel.email,
                    "specialite": personnel.specialite,
                    "telephone": personnel.telephone,
                    "role": personnel.role,
                },
            },
            status=status.HTTP_201_CREATED,
        )
    except Exception as e:
        return Response(
            {"status": "error", "message": str(e)}, status=status.HTTP_400_BAD_REQUEST
        )


@api_view(["PUT"])
def update_personnel_medical_in_etablissement(request, etablissement_id, personnel_id):
    try:
        personnel = get_object_or_404(
            PersonnelMedical,
            id=personnel_id,
            etablissement_personnel_medical__etablissement_id=etablissement_id,
        )

        personnel.nom_complet = request.data.get("nom_complet", personnel.nom_complet)
        personnel.email = request.data.get("email", personnel.email)
        personnel.specialite = request.data.get("specialite", personnel.specialite)
        personnel.telephone = request.data.get("telephone", personnel.telephone)
        personnel.role = request.data.get("role", personnel.role)
        personnel.save()

        return Response(
            {
                "status": "success",
                "data": {
                    "id": personnel.id,
                    "nom_complet": personnel.nom_complet,
                    "email": personnel.email,
                    "specialite": personnel.specialite,
                    "telephone": personnel.telephone,
                    "role": personnel.role,
                },
            }
        )
    except Exception as e:
        return Response(
            {"status": "error", "message": str(e)}, status=status.HTTP_400_BAD_REQUEST
        )


@api_view(["DELETE"])
def delete_personnel_medical_from_etablissement(
    request, etablissement_id, personnel_id
):
    try:
        etablissement_personnel = get_object_or_404(
            etablissement_personnel_medical,
            etablissement_id=etablissement_id,
            personnel_medical_id=personnel_id,
        )
        etablissement_personnel.delete()
        return Response(
            {
                "status": "success",
                "message": "Personnel medical supprimé de l'établissement avec succès",
            }
        )
    except Exception as e:
        return Response(
            {"status": "error", "message": str(e)}, status=status.HTTP_400_BAD_REQUEST
        )


# DPI Operations
@api_view(["GET"])
def get_dpis_by_etablissement(request, etablissement_id):
    try:
        dpis = (
            DPI.objects.filter(
                patient__antecedent__patient__mutuelle__patient__contact__patient__id__in=Patient.objects.filter(
                    contact__patient__hospitalisation__consultation__medecin__etablissement_personnel_medical__etablissement_id=etablissement_id
                ).values_list(
                    "id", flat=True
                )
            )
            .distinct()
            .values("id", "date_creation", "patient__nom_complet", "patient__nss")
        )

        return Response({"status": "success", "data": list(dpis)})
    except Exception as e:
        return Response(
            {"status": "error", "message": str(e)}, status=status.HTTP_400_BAD_REQUEST
        )


@api_view(["POST"])
def create_dpi(request):
    try:
        dpi = DPI.objects.create(
            date_creation=request.data.get("date_creation"),
            patient_id=request.data.get("patient_id"),
        )
        return Response(
            {
                "status": "success",
                "data": {
                    "id": dpi.id,
                    "date_creation": dpi.date_creation,
                    "patient_id": dpi.patient_id,
                },
            },
            status=status.HTTP_201_CREATED,
        )
    except Exception as e:
        return Response(
            {"status": "error", "message": str(e)}, status=status.HTTP_400_BAD_REQUEST
        )


@api_view(["PUT"])
def update_dpi(request, dpi_id):
    try:
        dpi = get_object_or_404(DPI, id=dpi_id)
        dpi.date_creation = request.data.get("date_creation", dpi.date_creation)
        dpi.save()
        return Response(
            {
                "status": "success",
                "data": {
                    "id": dpi.id,
                    "date_creation": dpi.date_creation,
                    "patient_id": dpi.patient_id,
                },
            }
        )
    except Exception as e:
        return Response(
            {"status": "error", "message": str(e)}, status=status.HTTP_400_BAD_REQUEST
        )


@api_view(["DELETE"])
def delete_dpi(request, dpi_id):
    try:
        dpi = get_object_or_404(DPI, id=dpi_id)
        dpi.delete()
        return Response({"status": "success", "message": "DPI supprimé avec succès"})
    except Exception as e:
        return Response(
            {"status": "error", "message": str(e)}, status=status.HTTP_400_BAD_REQUEST
        )

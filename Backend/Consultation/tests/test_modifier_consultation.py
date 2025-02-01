import pytest
from django.urls import reverse
from BDD.models import Consultation, PersonnelMedical, Hospitalisation, DPI, Patient, Etablissement, Admin
from datetime import datetime
import json

@pytest.mark.django_db
def test_modifier_consultation(client):
    etablissement = Etablissement.objects.create(
        nom_etablissement="Test Hospital",
        adresse="123 Test St",
        telephone="1234567890",
        email="test@hospital.com",
        type=Etablissement.TypeChoices.HOPITAL
    )
    admin = Admin.objects.create(
        nom_complet="Admin User",
        email="admin@hospital.com",
        telephone="0987654321",
        password="admin_unique_password_123",
        lienPhoto="http://example.com/photo.jpg"
    )
    patient = Patient.objects.create(
        nss="1234567890",
        nom_complet="John Doe",
        date_naissance="1980-01-01",
        adresse="456 Patient St",
        telephone="1234567890",
        email="john.doe@example.com",
        password="patient_unique_password_123",
        lienPhoto="http://example.com/photo.jpg",
        lieu_naissance="Test City",
        genre="Male",
        statueMatrimonial="Single"
    )
    dpi = DPI.objects.create(
        patient=patient,
        date_creation=datetime.now(),
        etablissement_id=etablissement,
        createur_id=admin
    )
    medecin_responsable = PersonnelMedical.objects.create(
        nom_complet="Dr. Responsible",
        email="dr.responsible@example.com",
        telephone="1234567890",
        password="medecin_resp_unique_123",
        lienPhoto="http://example.com/photo.jpg",
        specialite="General Medicine",
        role=PersonnelMedical.RoleChoices.MEDECIN
    )
    hospitalisation = Hospitalisation.objects.create(
        date_debut=datetime.now(),
        DPI=dpi,
        medecin_responsable=medecin_responsable
    )
    medecin = PersonnelMedical.objects.create(
        nom_complet="Dr. Smith",
        email="dr.smith@example.com",
        telephone="1234567890",
        password="medecin_unique_password_123",
        lienPhoto="http://example.com/photo.jpg",
        specialite="Cardiology",
        role=PersonnelMedical.RoleChoices.MEDECIN
    )
    consultation = Consultation.objects.create(
        date=datetime.now(),
        resume="Consultation summary",
        Medecin=medecin,
        Hospitalisation=hospitalisation
    )

    # Call the API with valid data
    url = reverse("modifier_consultation")
    payload = {
        "consultation_id": consultation.id,
        "date": "2025-02-01",
        "medecin_id": medecin.id,
    }
    response = client.post(url, data=json.dumps(payload), content_type="application/json")
    assert response.status_code == 200
    assert response.json()["success"] == "Consultation updated successfully."
    
    # Verify the changes in the database
    consultation.refresh_from_db()
    assert str(consultation.date) == "2025-02-01"
    assert consultation.Medecin == medecin
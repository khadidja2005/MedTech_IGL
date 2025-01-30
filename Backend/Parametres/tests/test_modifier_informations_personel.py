import pytest
from django.urls import reverse
from BDD.models import PersonnelMedical, Admin
from django.test import Client
import json

@pytest.mark.django_db
def test_modifier_infos_personnel(client):
    # Create necessary related objects
    personnel_medical = PersonnelMedical.objects.create(
        nom_complet="Dr. Smith",
        email="dr.smith@example.com",
        telephone="1234567890",
        password="medecinpassword",
        lienPhoto="http://example.com/photo.jpg",
        specialite="Cardiology",
        role=PersonnelMedical.RoleChoices.MEDECIN
    )
    
    admin = Admin.objects.create(
        nom_complet="Admin User",
        email="admin@hospital.com",
        telephone="0987654321",
        password="adminpassword",
        lienPhoto="http://example.com/photo.jpg"
    )
    
    # Test modifying PersonnelMedical information
    url = reverse("modifier_infos_personnel")
    payload = {
        "id": personnel_medical.id,
        "nom_complet": "Dr. John Smith",
        "email": "dr.john.smith@example.com",
        "telephone": "0987654321",
        "specialite": "Neurology"
    }
    response = client.post(url, data=json.dumps(payload), content_type="application/json")
    assert response.status_code == 200
    assert response.json()["success"] == "Personnel medical informations updated successfully."
    
    # Verify the changes in the database
    personnel_medical.refresh_from_db()
    assert personnel_medical.nom_complet == "Dr. John Smith"
    assert personnel_medical.email == "dr.john.smith@example.com"
    assert personnel_medical.telephone == "0987654321"
    assert personnel_medical.specialite == "Neurology"
    
    # Test modifying Admin information
    payload = {
        "id": admin.id,
        "nom_complet": "Admin John",
        "email": "admin.john@example.com",
        "telephone": "1234567890"
    }
    response = client.post(url, data=json.dumps(payload), content_type="application/json")
    assert response.status_code == 200
    assert response.json()["success"] == "Admin informations updated successfully."
    
    # Verify the changes in the database
    admin.refresh_from_db()
    assert admin.nom_complet == "Admin John"
    assert admin.email == "admin.john@example.com"
    assert admin.telephone == "1234567890"
    
    # Test with missing ID
    payload = {
        "nom_complet": "Dr. John Smith",
        "email": "dr.john.smith@example.com",
        "telephone": "0987654321",
        "specialite": "Neurology"
    }
    response = client.post(url, data=json.dumps(payload), content_type="application/json")
    assert response.status_code == 400
    assert response.json()["error"] == "An 'id' is required."
    
    # Test with missing required fields
    payload = {
        "id": personnel_medical.id,
        "nom_complet": "Dr. John Smith",
        "email": "dr.john.smith@example.com"
    }
    response = client.post(url, data=json.dumps(payload), content_type="application/json")
    assert response.status_code == 400
    assert response.json()["error"] == "A 'nom_complet','email','telephone' and 'specialite' are required."
    
    # Test with non-existent ID
    payload = {
        "id": 999,
        "nom_complet": "Dr. John Smith",
        "email": "dr.john.smith@example.com",
        "telephone": "0987654321",
        "specialite": "Neurology"
    }
    response = client.post(url, data=json.dumps(payload), content_type="application/json")
    assert response.status_code == 404
    assert response.json()["error"] == "No user with the provided id found."
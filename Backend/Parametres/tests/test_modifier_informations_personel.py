import pytest
from django.urls import reverse
from BDD.models import PersonnelMedical, Admin
import json

@pytest.mark.django_db
def test_modifier_infos_personnel(client):
    personnel_medical = PersonnelMedical.objects.create(
        nom_complet="Dr. Smith",
        email="dr.smith@example.com",
        telephone="1234567890",
        password="unique_personnel_password_123",
        lienPhoto="http://example.com/photo.jpg",
        specialite="Cardiology",
        role=PersonnelMedical.RoleChoices.MEDECIN
    )
    
    admin = Admin.objects.create(
        nom_complet="Admin User",
        email="admin@hospital.com",
        telephone="0987654321",
        password="unique_admin_password_123",
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
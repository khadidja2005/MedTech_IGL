# Etablissements/urls.py
from django.urls import path
from .views import (
    EtablissementDetailView, AddPersonnelMedicalView, CreatePersonnelMedicalView, CreateDPIView
)

urlpatterns = [
    path('<int:etablissement_id>/', EtablissementDetailView.as_view(), name='etablissement-detail'),
    path('<int:etablissement_id>/add-personnel/', AddPersonnelMedicalView.as_view(), name='add-personnel'),
    path('<int:etablissement_id>/create-personnel/', CreatePersonnelMedicalView.as_view(), name='create-personnel'),
    path('<int:etablissement_id>/create-dpi/', CreateDPIView.as_view(), name='create-dpi'),
]

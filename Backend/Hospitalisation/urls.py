from django.urls import path
from . import views

urlpatterns = [
    path("", views.get_info_hospitalisation, name="get_info_hospitalisation"),
    path("consultations", views.get_consultations, name="get_consultations"),
    path("Soins", views.get_soins, name="get_soins"),
    path("modifier/medecins", views.get_all_medecins, name="get_all_medecins"),
    path("modifier", views.modifier, name="modifier"),
    path(
        "ajouter/consultation", views.ajouter_consultation, name="ajouter_consultation"
    ),
    path("ajouter/soin", views.ajouter_soin, name="ajouter_soin"),
    path("supprimer", views.supprimer, name="supprimer"),
]

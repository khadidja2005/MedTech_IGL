from django.urls import path
from . import views

urlpatterns = [
    # DPI recherche
    path("", views.get_infos, name="recherche_get_consultation_infos"),
    path("modifier/", views.modifier_consultation, name="modifier_consultation"),
    path("medecins/", views.get_medecins, name="get_medecins"),
    path("modifier/resume/", views.modifier_resume, name="modifier_resume"),
    path("supprimer/", views.supprimer_consultation, name="supprimer_consultation"),
    path("ajouter/ordonnance/", views.ajouter_ordonnance, name="ajouter_ordonnance"),
    path("ajouter/bilan/", views.ajouter_bilan, name="ajouter_bilan"),
]

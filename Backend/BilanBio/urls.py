from django.urls import path
from . import views

urlpatterns = [
    path("", views.get_info_bilan_bio, name="get_info_bilan_bio"),
    path("valider", views.valider_bilan_bio, name="valider_bilan_bio"),
    path("peut-valider", views.peut_valider, name="peut_valider"),
    path("peut-terminer", views.peut_terminer, name="peut_terminer"),
    path("terminer", views.terminer, name="bilan_bio_terminer"),
    path("supprimer", views.supprimer_bilan_bio, name="supprimer_bilan_bio"),
    path("ajouter/param", views.ajouter_parametre, name="ajouter_parametre"),
    path("modifier/param", views.modifier_parametre, name="modifier_parametre"),
    path("supprimer/param", views.supprimer_parametre, name="supprimer_parametre"),
    path("ajouter/resultat", views.ajouter_resultat_bio, name="ajouter_resultat_bio"),
    path(
        "modifier/resultat", views.modifier_resultat_bio, name="modifier_resultat_bio"
    ),
    path(
        "supprimer/resultat/<int:id_resultat>",
        views.supprimer_resultat_bio,
        name="supprimer_resultat_bio",
    ),
]

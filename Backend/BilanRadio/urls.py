from django.urls import path
from . import views

urlpatterns = [
    path("", views.get_info_bilan_radio, name="get_info_bilan_radio"),
    path("valider", views.valider_bilan_radio, name="valider_bilan_radio"),
    path("peut-valider", views.peut_valider, name="peut_valider"),
    path("peut-terminer", views.peut_terminer, name="peut_terminer"),
    path("terminer", views.terminer, name="bilan_radio_terminer"),
    path("supprimer", views.supprimer_bilan_radio, name="supprimer_bilan_radio"),
    path(
        "ajouter/resultat/pdf",
        views.ajouter_resultat_radio_pdf,
        name="ajouter_resultat_radio_pdf",
    ),
    path(
        "ajouter/resultat/compte-rendu",
        views.ajouter_resultat_radio_compte_rendu,
        name="ajouter_resultat_radio_compte_rendu",
    ),
    path(
        "supprimer/resultat/compte-rendu/<int:bilan_id>",
        views.supprimer_resultat_radio_compte_rendu,
        name="supprimer_resultat_radio_compte_rendu",
    ),
    path(
        "modifier/type",
        views.modifier_type_bilan_radio,
        name="modifier_type_bilan_radio",
    ),
    path(
        "modifier/description", views.modifier_description, name="modifier_description"
    ),
]

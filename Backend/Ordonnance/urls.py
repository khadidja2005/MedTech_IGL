from django.urls import path
from . import views

urlpatterns = [
    path("", views.get_infos, name="get_ordonnance_infos"),
    path("supprimer", views.supprimer_ordonnance, name="supprimer_ordonnance"),
    path(
        "supprimer/medicament", views.supprimer_medicament, name="supprimer_medicament"
    ),
    path("ajouter/medicament", views.ajouter_medicament, name="ajouter_medicament"),
    path("modifier/medicament", views.modifier_medicament, name="modifier_medicament"),
    path(
        "modifier/peut-modifier",
        views.peut_modifier_ordonnance,
        name="peut_modifier_ordonnance",
    ),
    path("terminer/", views.terminer_ordonnance, name="terminer_ordonnance"),
    path(
        "terminer/peut-terminer",
        views.peut_terminer_ordonnance,
        name="peut_terminer_ordonnance",
    ),
    path("valider", views.valider_ordonnance, name="valider_ordonnance"),
]

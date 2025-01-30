from django.urls import path
from . import views

urlpatterns = [
    path("archive", views.archive_pharmacie, name="archive_pharmacie"),
    path("home", views.get_ordonnances, name="get_ordonnances"),
    path("pharmaciens", views.get_pharmaciens, name="get_pharmaciens"),  # Nouvel endpoint
]
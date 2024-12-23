from django.urls import path
from . import views

urlpatterns = [
    path("", views.archive_pharmacie, name="archive_pharmacie"),
]

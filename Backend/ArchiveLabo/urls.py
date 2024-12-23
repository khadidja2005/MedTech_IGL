from django.urls import path
from . import views

urlpatterns = [
    path("", views.archive_labo, name="archive_labo"),
]

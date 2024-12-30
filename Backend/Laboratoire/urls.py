from django.urls import path
from . import views

urlpatterns = [
    path("archive", views.archive_labo, name="archive_labo"),
    path("home", views.get_bilans, name="get_bilans"),
]

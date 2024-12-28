from django.urls import path
from . import views

urlpatterns = [
    path("archive", views.archive_radio, name="archive_radio"),
    path("home", views.get_radios, name="get_radios"),
]

from django.urls import path
from . import views

urlpatterns = [
    path("", views.archive_radio, name="archive_radio"),
]

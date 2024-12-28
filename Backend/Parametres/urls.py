from django.urls import path
from . import views

urlpatterns = [
    path("", views.get_infos, name="get_infos"),
    path(
        "modifier/infos-personnel",
        views.modifier_infos_personnel,
        name="modifier_infos_personnel",
    ),
    path("modifier/password", views.modifier_password, name="modifier_password"),
]

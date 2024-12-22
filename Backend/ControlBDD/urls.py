from django.urls import path

from . import views


urlpatterns = [
     path('seed_database/', views.seed_database),
]

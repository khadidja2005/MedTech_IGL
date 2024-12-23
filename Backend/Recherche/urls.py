from django.urls import path
from . import views

urlpatterns = [
    #DPI recherche
    path('DPIS', views.get_all_DPIS, name='recherche_get_all_DPIS'),
    path('Patient/DPIS', views.get_DPIS_patient, name='recherche_get_DPIS_patient'),
    path('DPI/', views.get_DPI, name='recherche_get_DPI'),
    path('NumDPIS', views.get_num_DPIS, name='get_number_DPIS'),
]
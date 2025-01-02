from django.urls import path
from . import views

urlpatterns = [
    # Etablissement CRUD
    path('etablissements/', views.get_all_etablissements, name='get_all_etablissements'),
    path('etablissements/<str:etablissement_id>/', views.get_etablissement, name='get_etablissement'),
    path('etablissements/create/user/', views.create_etablissement, name='create_etablissement'),
    path('etablissements/<str:etablissement_id>/update/', views.update_etablissement, name='update_etablissement'),
    path('etablissements/<str:etablissement_id>/delete/', views.delete_etablissement, name='delete_etablissement'),
    
    # Personnel Medical Operations
    path ('personnel-medical/', views.personnel_medical_list_create, name='get_all_personnel_medical'),
    path('personnel-medical/<int:pk>/', views.personnel_medical_detail, name='get_personnel_medical'),
    path('etablissements/<str:etablissement_id>/personnel/', views.get_personnel_medical_by_etablissement, name='get_personnel_medical_by_etablissement'),
    path('etablissements/<str:etablissement_id>/personnel/add/', views.add_personnel_medical_to_etablissement, name='add_personnel_medical_to_etablissement'),
    path('etablissements/<str:etablissement_id>/personnel/<str:personnel_id>/update/', views.update_personnel_medical_in_etablissement, name='update_personnel_medical_in_etablissement'),
    path('etablissements/<str:etablissement_id>/personnel/<str:personnel_id>/delete/', views.delete_personnel_medical_from_etablissement, name='delete_personnel_medical_from_etablissement'),
    
    # DPI Operations
    path('etablissements/<str:etablissement_id>/dpis/', views.get_dpis_by_etablissement, name='get_dpis_by_etablissement'),
    path('dpis/create/', views.create_dpi, name='create_dpi'),
    path('dpis/<str:dpi_id>/update/', views.update_dpi, name='update_dpi'),
    path('dpis/<str:dpi_id>/delete/', views.delete_dpi, name='delete_dpi'),
]
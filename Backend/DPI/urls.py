from django.urls import path
from . import views

urlpatterns = [
    # DPI endpoints
    path('dpi/<str:dpi_id>/', views.get_dpi),
    path('dpi/<str:dpi_id>/patient/', views.update_patient_info),
    path('dpi/<str:dpi_id>/etablissement/', views.update_dpi_etablissement),
    path('dpi/<str:dpi_id>/delete/', views.delete_dpi),
    
    # Antecedent endpoints
    path('dpi/<str:dpi_id>/antecedents/add/', views.add_antecedant),
    path('dpi/<str:dpi_id>/antecedents/<str:antecedent_id>/', views.update_antecedent),
    path('dpi/<str:dpi_id>/antecedents/<str:antecedent_id>/delete/', views.delete_antecedent) ,

    # Hospitalisation endpoints
    path('dpi/<str:dpi_id>/hospitalisations/', views.get_hospitalisations),
    path('dpi/<str:dpi_id>/hospitalisations/add/', views.add_hospitalisation),
    
    # Bilan endpoints
    path('dpi/<str:dpi_id>/bilans/', views.get_all_bilans),
    path('dpi/<str:dpi_id>/bilans/create/', views.create_bilan),
    
        # Mutuelle endpoints
    path('dpi/<str:dpi_id>/mutuelles/', views.get_mutuelles),
    path('dpi/<str:dpi_id>/mutuelles/add/', views.add_mutuelle),
    path('dpi/<str:dpi_id>/mutuelles/<str:mutuelle_id>/', views.update_mutuelle),
    
    # Contact endpoints
    path('dpi/<str:dpi_id>/contacts/', views.get_contacts),
    path('dpi/<str:dpi_id>/contacts/add/', views.add_contact),
    path('dpi/<str:dpi_id>/contacts/<str:contact_id>/', views.update_contact),



    # QR_code endpoints
    path('dpi/<str:dpi_id>/qr-code/', views.generate_nss_qr),
    ]

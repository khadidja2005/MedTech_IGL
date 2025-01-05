from django.urls import path
from . import views

urlpatterns = [
    path('dpi/<str:dpi_id>/soins/', views.get_all_soins),
    path('dpi/soins/add/', views.add_soin),
    path('dpi/soins/<str:soin_id>/', views.get_soin_by_id),
    path('dpi/soins/<str:soin_id>/update/', views.update_soin),
    path('dpi/soins/<str:soin_id>/delete/', views.delete_soin),
    path('dpipage/<str:dpi_id>/', views.get_dpi_by_id),
    path("dpipage/antecedants/<str:dpi_id>/" , views.get_antecedants_by_dpi),
    path("dpipage/hospitalizations/<str:dpi_id>/" , views.get_hospitalizations_by_dpi) ,
    path('dpipage/bilans/<str:dpi_id>/', views.get_all_bilans),
    path('dpipage/mutuelles/<str:dpi_id>/', views.get_mutuelles_by_dpi),
    path('dpipage/<str:dpi_id>/mutuelles/add/', views.add_mutuelle),
    path("dpipage/dpi/<str:dpi_id>/delete/" , views.delete_dpi),
]
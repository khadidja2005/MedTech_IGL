from django.urls import path
from . import views

urlpatterns = [
    path('dpi/<str:dpi_id>/soins/', views.get_all_soins),
    path('dpi/soins/add/', views.add_soin),
    path('dpi/soins/<str:soin_id>/', views.get_soin_by_id),
    path('dpi/soins/<str:soin_id>/update/', views.update_soin),
    path('dpi/soins/<str:soin_id>/delete/', views.delete_soin),
]
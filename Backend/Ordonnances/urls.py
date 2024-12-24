from django.urls import path
from .views import OrdonnanceDetailView, AddMedicamentView, RemoveMedicamentView, ValidateOrdonnanceView

urlpatterns = [
    path('ordonnance/<int:ordonnance_id>/', OrdonnanceDetailView.as_view(), name='ordonnance_detail'),
    path('ordonnance/<int:ordonnance_id>/add-medicament/', AddMedicamentView.as_view(), name='add_medicament'),
    path('ordonnance/<int:ordonnance_id>/remove-medicament/<int:medicament_id>/', RemoveMedicamentView.as_view(), name='remove_medicament'),
    path('ordonnance/<int:ordonnance_id>/validate/', ValidateOrdonnanceView.as_view(), name='validate_ordonnance'),
]

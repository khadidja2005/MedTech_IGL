from django.urls import path
from .views import change_admin_personnel_info, change_patient_password

urlpatterns = [
    path('change-info/', change_admin_personnel_info, name='change_admin_personnel_info'),  # Pour Admin et Personnel Médical
    path('change-password/', change_patient_password, name='change_patient_password'),  # Pour Patient
]

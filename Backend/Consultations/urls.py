
# Consultations/urls.py
from django.urls import path
from .views import (
    ConsultationDetailView, ConsultationCreateView, ConsultationUpdateResumeView,
    ConsultationDeleteView, OrdonnanceListView, OrdonnanceCreateView,
    BilanListView, AntecedentListView, AntecedentCreateView,
    ResultatBioCreateView, ResultatRadioCreateView
)

urlpatterns = [
    path('consultations/<str:consultation_id>/', ConsultationDetailView.as_view()),
    path('consultations/create/', ConsultationCreateView.as_view()),
    path('consultations/<str:consultation_id>/resume/', ConsultationUpdateResumeView.as_view()),
    path('consultations/<str:consultation_id>/delete/', ConsultationDeleteView.as_view()),
    path('consultations/<str:consultation_id>/ordonnances/', OrdonnanceListView.as_view()),
    path('consultations/<str:consultation_id>/ordonnances/create/', OrdonnanceCreateView.as_view()),
    path('consultations/<str:consultation_id>/bilans/', BilanListView.as_view()),
    path('patients/<str:patient_id>/antecedents/', AntecedentListView.as_view()),
    path('patients/<str:patient_id>/antecedents/create/', AntecedentCreateView.as_view()),
    path('bilans/<str:bilan_id>/resultat-bio/create/', ResultatBioCreateView.as_view()),
    path('bilans/<str:bilan_id>/resultat-radio/create/', ResultatRadioCreateView.as_view()),
]

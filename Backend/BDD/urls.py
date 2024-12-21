from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    EtablissementViewSet, AdminViewSet, PersonnelMedicalViewSet,
    MutuelleViewSet, PatientViewSet, ContactViewSet, AntecedentViewSet,
    DPIViewSet, HospitalisationViewSet, ConsultationViewSet,
    OrdonnanceViewSet, MedicamentViewSet, SoinsViewSet, BilanBioViewSet,
    ResultatBioViewSet, BilanRadioViewSet, ResultatRadioViewSet , EtablissementPersonnelMedicalViewSet
)
router = DefaultRouter()
router.register(r'etablissements', EtablissementViewSet)
router.register(r'admins', AdminViewSet)
router.register(r'personnel-medical', PersonnelMedicalViewSet)
router.register(r'mutuelles', MutuelleViewSet)
router.register(r'patients', PatientViewSet)
router.register(r'contacts', ContactViewSet)
router.register(r'antecedents', AntecedentViewSet)
router.register(r'dpi', DPIViewSet)
router.register(r'hospitalisations', HospitalisationViewSet)
router.register(r'consultations', ConsultationViewSet)
router.register(r'ordonnances', OrdonnanceViewSet)
router.register(r'medicaments', MedicamentViewSet)
router.register(r'soins', SoinsViewSet)
router.register(r'bilan-bio', BilanBioViewSet)
router.register(r'resultat-bio', ResultatBioViewSet)
router.register(r'bilan-radio', BilanRadioViewSet)
router.register(r'resultat-radio', ResultatRadioViewSet)
router.register(r'etablissement-personnel-medical',EtablissementPersonnelMedicalViewSet )
urlpatterns = [
    path('', include(router.urls)),
]
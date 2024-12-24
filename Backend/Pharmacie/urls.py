# Pharmacie/urls.py
from django.urls import path
from .views import OrdonnanceListView, OrdonnanceArchiveListView, OrdonnanceResetFiltersView

urlpatterns = [
    path('ordonnances/', OrdonnanceListView.as_view(), name='ordonnance-list'),
    path('ordonnances/archives/', OrdonnanceArchiveListView.as_view(), name='ordonnance-archive'),
    path('ordonnances/reset-filters/', OrdonnanceResetFiltersView.as_view(), name='ordonnance-reset-filters'),
]

from django.urls import path
from .views import HomePageView, FilterBilanView, ResetFilterView, laboratoire_home

urlpatterns = [
    path('home/', laboratoire_home, name='laboratoire_home'),
    path('api/home/', HomePageView.as_view(), name='api_home'),  # For API
    path('api/filter-bilan/', FilterBilanView.as_view(), name='api_filter_bilan'),
    path('api/reset-filter/', ResetFilterView.as_view(), name='api_reset_filter'),
]

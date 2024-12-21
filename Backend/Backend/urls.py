"""
URL configuration for Backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('Auth.urls')),  # Assure-toi d'inclure l'URL de l'application Auth
    path('laboratoire/', include('LaboratoireRadiologi.urls')),  # Ajoute les routes de LaboratoireRadiologi
    path('ordonnances/', include('Ordonnances.urls')),  # Ajoute les routes de Ordonnances
    path('consultations/', include('Consultations.urls')),  # Ajoute les routes de Consultations
    path('parametres/', include('Parametres.urls')), # Ajoute les routes de Parametres
    path('etablissements/', include('Etablissements.urls')),  # Ajoute les routes de Etablissements
    path('pharmacie/',include('Pharmacie.urls')), # Ajoute les routes de Pharmacie
    # Ajoute ici toutes les autres routes de ton API
]

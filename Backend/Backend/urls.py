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
from BDD.urls import urlpatterns as bdd_urls
from ControlBDD.urls import urlpatterns as control_bdd_urls
from DashboardAdmin.urls import urlpatterns as dashboard_urls
from DPI.urls import urlpatterns as dpi_urls
from Soins.urls import urlpatterns as soins_urls
from Cloudinary.urls import urlpatterns as cloudinary_urls
from Recherche.urls import urlpatterns as recherche_urls
from Hospitalisation.urls import urlpatterns as hospitalisation_urls
from BilanBio.urls import urlpatterns as bilan_bio_urls

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include(bdd_urls)),
    path("control/", include(control_bdd_urls)),
    path("dashboard/", include(dashboard_urls)),
    path("dpi/", include(dpi_urls)),
    path("soins/", include(soins_urls)),
    path("cloudinary/", include(cloudinary_urls)),
    path("recherche/", include(recherche_urls)),
    path("hospitalisation/", include(hospitalisation_urls)),
    path("bilanbio/", include(bilan_bio_urls)),
]

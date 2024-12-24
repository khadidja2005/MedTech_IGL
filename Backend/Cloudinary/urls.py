from django.urls import path
from .views import ImageUploadView, ImageDeleteView

urlpatterns = [
    path('upload/', ImageUploadView.as_view(), name='image-upload'),
    path('delete/<str:public_id>/', ImageDeleteView.as_view(), name='image-delete'),
]
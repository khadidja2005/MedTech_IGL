# models.py
from django.db import models
import cloudinary
from cloudinary.models import CloudinaryField

class Image(models.Model):
    image = CloudinaryField('image')
    public_id = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Image {self.id} - {self.public_id}"
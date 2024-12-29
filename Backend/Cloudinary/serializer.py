from rest_framework import serializers
from .models import Image

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['id', 'image', 'public_id', 'created_at']
        read_only_fields = ['public_id', 'created_at']
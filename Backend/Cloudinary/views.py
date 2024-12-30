import cloudinary
import cloudinary.uploader
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from django.conf import settings
from .models import Image
from .serializer import ImageSerializer

class ImageUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        try:
            # Get the uploaded file
            image_file = request.FILES.get('image')
            if not image_file:
                return Response(
                    {'error': 'No image file provided'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Upload to Cloudinary
            upload_result = cloudinary.uploader.upload(
                image_file,
                folder='my-uploads'  # Optional folder name
            )

            # Create Image instance
            image = Image.objects.create(
                image=upload_result['secure_url'],
                public_id=upload_result['public_id']
            )

            serializer = ImageSerializer(image)
            return Response(
                {
                    'success': True,
                    'message': 'Upload successful',
                    'data': serializer.data
                },
                status=status.HTTP_201_CREATED
            )

        except Exception as e:
            return Response(
                {
                    'success': False,
                    'message': 'Upload failed',
                    'error': str(e)
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class ImageDeleteView(APIView):
    def delete(self, request, public_id):
        try:
            # Find the image in database
            image = Image.objects.filter(public_id=public_id).first()
            if not image:
                return Response(
                    {'error': 'Image not found'},
                    status=status.HTTP_404_NOT_FOUND
                )

            # Delete from Cloudinary
            cloudinary.uploader.destroy(public_id)
            
            # Delete from database
            image.delete()

            return Response(
                {
                    'success': True,
                    'message': 'Image deleted successfully'
                },
                status=status.HTTP_200_OK
            )

        except Exception as e:
            return Response(
                {
                    'success': False,
                    'message': 'Delete failed',
                    'error': str(e)
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
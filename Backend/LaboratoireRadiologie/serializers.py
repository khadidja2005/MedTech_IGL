from rest_framework import serializers
from .models import Bilan, BilanArchive, Etablissement

class BilanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bilan
        fields = '__all__'


class BilanArchiveSerializer(serializers.ModelSerializer):
    class Meta:
        model = BilanArchive
        fields = '__all__'


class EtablissementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Etablissement
        fields = '__all__'

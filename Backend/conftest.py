import os
import django
from django.conf import settings

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Backend.settings')
django.setup()

import pytest
from rest_framework.test import APIClient

@pytest.fixture
def client():
    return APIClient()
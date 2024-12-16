"""
Tests for the user API.
"""
import tempfile
from django.test import TestCase
from django.contrib.auth import get_user_model
from documents.models import Document
from django.urls import reverse

from rest_framework.test import APIClient
from rest_framework import status

LIST_CREATE_DOCUMENT_URL = reverse('api:documents')
RETRIEVE_UPDATE_DESTROY_DOCUMENT_URL = reverse('api:document', args=[1])


def create_user(**params):
    return get_user_model().objects.create_user(**params)


def create_document(user, **params):
    return Document.objects.create(user=user, **params)


def create_temp_file():
    file = tempfile.NamedTemporaryFile(suffix='.pdf')
    file.write(b'Hello World!')
    file.seek(0)
    return file


class DocumentApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = create_user(
            email='test@example.com',
            password='testpass123',
            username='Test User'
        )
        self.client.force_authenticate(user=self.user)

    
    def test_create_document_success(self):
        temp_file = create_temp_file()
        payload = {
            'description': 'This is a test document.',
            'file': temp_file
        }
        res = self.client.post(LIST_CREATE_DOCUMENT_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        document = Document.objects.get(id=res.data['id'])
        self.assertEqual(document.description, payload['description'])
        self.assertEqual(document.user, self.user)

    def test_retrieve_document_success(self):
        temp_file = create_temp_file()
        document = create_document(
            user=self.user,
            file=temp_file,
            description='This is a test document.'
        )
        res = self.client.get(RETRIEVE_UPDATE_DESTROY_DOCUMENT_URL)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data['description'], document.description)
        self.assertEqual(res.data['user'], document.user.id)


    def test_delete_document_success(self):
        temp_file = create_temp_file()
        document = create_document(
            user=self.user,
            file=temp_file,
            description='This is a test document.'
        )
        res = self.client.delete(RETRIEVE_UPDATE_DESTROY_DOCUMENT_URL)

        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Document.objects.filter(id=document.id).exists())

    
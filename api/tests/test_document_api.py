"""
Tests for the user API.
"""
from django.test import TestCase
from django.contrib.auth import get_user_model
from django.core.files.uploadedfile import SimpleUploadedFile
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

def document_detail_url(document_id):
    return reverse('api:document', args=[document_id])


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
        """
        Test creating a new document
        """
        payload = {
            'description': 'Test Document',
            'file': SimpleUploadedFile('test.txt', b'test content'),
        }
        res = self.client.post(LIST_CREATE_DOCUMENT_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Document.objects.count(), 1)
        document = Document.objects.first()
        self.assertEqual(document.user, self.user)


    def test_create_invalid_document(self):
       """
       Test uploading invalid document, exe file
       """
       payload = {
            'description': 'Invalid Document',
            'file': SimpleUploadedFile('test.csv', b'name,age\nJohn,30\nDoe,25', content_type='text/csv'),
       }
       res = self.client.post(LIST_CREATE_DOCUMENT_URL, payload)
       self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)


    def test_get_single_document(self):
        """
        Test retrieving a document
        """
        payload = {
            'description': 'Test Document',
            'file': SimpleUploadedFile('test.txt', b'test content'),
        }
        document = create_document(user=self.user, **payload)
        res = self.client.get(document_detail_url(document.id))
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data['description'], document.description)


    def test_delete_document(self):
        """
        Test deleting a document
        """
        payload = {
            'description': 'Test Document',
            'file': SimpleUploadedFile('test.txt', b'test content'),
        }
        document = create_document(user=self.user, **payload)
        res = self.client.delete(document_detail_url(document.id))
        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Document.objects.count(), 0)

    
    def test_get_multiple_documents(self):
        """
        Test retrieving multiple documents
        """
        payload1 = {
            'description': 'Test Document',
            'file': SimpleUploadedFile('test.txt', b'test content'),
        }
        payload2 = {
            'description': 'Test Document 2',
            'file': SimpleUploadedFile('test2.txt', b'test content 2'),
        }
        document1 = create_document(user=self.user, **payload1)
        document2 = create_document(user=self.user, **payload2)
        res = self.client.get(LIST_CREATE_DOCUMENT_URL)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data), 2)
        self.assertEqual(res.data[0]['description'], document1.description)
        self.assertEqual(res.data[1]['description'], document2.description)

       
        

        


    
    
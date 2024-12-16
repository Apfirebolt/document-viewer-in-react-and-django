from rest_framework.generics import (
    ListAPIView,
    CreateAPIView,
    RetrieveUpdateDestroyAPIView,
    ListCreateAPIView,
)
from .serializers import (
    CustomUserSerializer,
    CustomTokenObtainPairSerializer,
    ListCreateDocumentSerializer,
    ListUserSerializer,
    UpdateUserSerializer,
)
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.views import TokenObtainPairView
from accounts.models import CustomUser
from documents.models import Document


class CreateCustomUserApiView(CreateAPIView):
    serializer_class = CustomUserSerializer
    queryset = CustomUser.objects.all()
    permission_classes = []


class CustomTokenObtainPairView(TokenObtainPairView):
    # Replace the serializer with your custom
    serializer_class = CustomTokenObtainPairSerializer
    permission_classes = []


class ListCustomUsersApiView(ListAPIView):
    serializer_class = ListUserSerializer
    queryset = CustomUser.objects.all()
    permission_classes = []


class RetrieveUpdateDestroyCustomUserApiView(RetrieveUpdateDestroyAPIView):
    serializer_class = UpdateUserSerializer
    queryset = CustomUser.objects.all()
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        try:
            user = CustomUser.objects.get(id=kwargs["pk"])
            serializer = CustomUserSerializer(user)
            return Response(serializer.data)
        except CustomUser.DoesNotExist:
            return Response(
                {"error": "User does not exist"}, status=status.HTTP_404_NOT_FOUND
            )

    def update(self, request, *args, **kwargs):
        try:
            user = CustomUser.objects.get(id=kwargs["pk"])
            # check if the user is updating his own profile
            if user.id != request.user.id:
                return Response(
                    {"error": "You are not allowed to update this user"},
                    status=status.HTTP_403_FORBIDDEN,
                )
            # check if username already exists in the database
            if CustomUser.objects.filter(username=request.data["username"]).exists():
                return Response(
                    {"error": "Username already exists"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            serializer = UpdateUserSerializer(user, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except CustomUser.DoesNotExist:
            return Response(
                {"error": "User does not exist"}, status=status.HTTP_404_NOT_FOUND
            )


class ListCreateDocumentApiView(ListCreateAPIView):
    serializer_class = ListCreateDocumentSerializer
    queryset = Document.objects.all()
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Document.objects.filter(user=self.request.user)


class RetrieveUpdateDestroyDocumentApiView(RetrieveUpdateDestroyAPIView):
    serializer_class = ListCreateDocumentSerializer
    queryset = Document.objects.all()
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        try:
            document = Document.objects.get(id=kwargs["pk"])
            serializer = ListCreateDocumentSerializer(document)
            return Response(serializer.data)
        except Document.DoesNotExist:
            return Response(
                {"error": "Document does not exist"}, status=status.HTTP_404_NOT_FOUND
            )

    def update(self, request, *args, **kwargs):
        try:
            document = Document.objects.get(id=kwargs["pk"])
            serializer = ListCreateDocumentSerializer(document, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Document.DoesNotExist:
            return Response(
                {"error": "Document does not exist"}, status=status.HTTP_404_NOT_FOUND
            )

    def delete(self, request, *args, **kwargs):
        try:
            document = Document.objects.get(id=kwargs["pk"])
            # also delete the file from the storage
            document.file.delete()
            document.delete()
            return Response(
                {"message": "Document deleted successfully"},
                status=status.HTTP_204_NO_CONTENT,
            )
        except Document.DoesNotExist:
            return Response(
                {"error": "Document does not exist"}, status=status.HTTP_404_NOT_FOUND
            )

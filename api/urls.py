from django.urls import path
from .views import (
    CreateCustomUserApiView,
    CustomTokenObtainPairView,
    ListCustomUsersApiView,
    ListCreateDocumentApiView,
    RetrieveUpdateDestroyDocumentApiView,
)
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path("register", CreateCustomUserApiView.as_view(), name="signup"),
    path("login", CustomTokenObtainPairView.as_view(), name="signin"),
    path("refresh", TokenRefreshView.as_view(), name="refresh"),
    path("users", ListCustomUsersApiView.as_view(), name="users"),
    path("documents", ListCreateDocumentApiView.as_view(), name="documents"),
    path(
        "documents/<int:pk>",
        RetrieveUpdateDestroyDocumentApiView.as_view(),
        name="document",
    ),
]

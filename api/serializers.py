from rest_framework import serializers
from accounts.models import CustomUser
from documents.models import Document
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    default_error_messages = {
        'no_active_account': ('No account exists with these credentials, check password and email')
    }

    def validate(self, attrs):
        
        data = super(CustomTokenObtainPairSerializer, self).validate(attrs)
        # Custom data 
        data['username'] = self.user.username
        data['email'] = self.user.email
        data['id'] = self.user.id
        data['is_admin'] = self.user.is_superuser
        return data


class CustomUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        required=True,
        help_text='Leave empty if no change needed',
        min_length=8,
        style={'input_type': 'password', 'placeholder': 'Password'}
    )
    access = serializers.SerializerMethodField()
    refresh = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = ('username', 'email', 'id', 'is_staff', 'password', 'access', 'refresh',)
    
    def get_refresh(self, user):
        refresh = RefreshToken.for_user(user)
        return str(refresh)

    def get_access(self, user):
        refresh = RefreshToken.for_user(user)
        access = str(refresh.access_token),
        return access

    def create(self, validated_data):
        user = super(CustomUserSerializer, self).create(validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user
    

class ListUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomUser
        fields = ('username', 'email', 'id', 'is_staff', 'is_superuser')
    

class ListCreateDocumentSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Document
        fields = ('id', 'user', 'file', 'uploaded_at', 'description')
        read_only_fields = ('id', 'user', 'created_at',)
        extra_kwargs = {
            'user': {'read_only': True}
        }

    def validate_file(self, value):
        max_size = 5 * 1024 * 1024  # 5 MB
        if value.size > max_size:
            raise serializers.ValidationError("File size should not exceed 5 MB.")
        # valid files types are only jpg, jpeg, png, pdf and txt
        valid_extensions = ['jpg', 'jpeg', 'png', 'pdf', 'txt']
        ext = value.name.split('.')[-1]
        if ext not in valid_extensions:
            raise serializers.ValidationError("File type not supported.")
        return value
    
    def create(self, validated_data):
        user = self.context['request'].user
        document = Document.objects.create(user=user, **validated_data)
        return document
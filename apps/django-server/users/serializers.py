from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import *
from django.core.cache import cache
import os

class UserRegisterSerializer(serializers.ModelSerializer):
    confirm = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'confirm')
        write_only_fields = ('confirm', )
    
    def validate(self, attrs):
        username = cache.get(f'register_id_{attrs['username']}', False)    
        email = cache.get(f'register_email_{attrs["email"]}', False)             

        if username or email:
            if username: cache.delete(f'register_code_{username}')
            if email: cache.delete(f'register_code_{email}')
            cache.delete(f'register_id_{attrs['username']}')
            cache.delete(f'register_email_{attrs["email"]}')

        if attrs['password'] != attrs['confirm']:
            raise serializers.ValidationError({'detail': 'Пароли не совпадают'})
        attrs.pop('confirm', None)
        return attrs

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    remember_me = serializers.BooleanField(default=False)

    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')

        errors = {}
        if username is None: errors['username'] = ['Обязательное поле.']
        if password is None: errors['password'] = ['Обязательное поле.']
        if errors: raise serializers.ValidationError(errors)

        user = None
        
        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            try:
                user = User.objects.get(email=username)
            except User.DoesNotExist: 
                raise serializers.ValidationError({"detail": "Не найдено активной учетной записи с указанными данными"})

        self.user = user

        if not user.check_password(password) or not user.is_active:
            raise serializers.ValidationError({"detail": "Не найдено активной учетной записи с указанными данными"})

        data = super().validate({'username': user.username, 'password': password})
        return data
    
class CodeSerializer(serializers.Serializer):
    code = serializers.CharField(required=True)

class EmailCodeSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    code = serializers.CharField(required=True)

class EmailSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)

    def validate_email(self, value):
        if not User.objects.filter(email=value).exists(): raise serializers.ValidationError('Пользователя с таким email не существует')
        return value
    
class EmailExistsSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)

    def validate_email(self, value):
        if User.objects.filter(email=value).exists(): raise serializers.ValidationError('Почта уже занята')
        return value

class CodeConfirmSerializer(serializers.Serializer):
    code = serializers.CharField(required=True)
    password = serializers.CharField(required=True)
    confirm = serializers.CharField(required=True, write_only=True)

    def validate(self, attrs):
        if attrs['password'] != attrs['confirm']:
            raise serializers.ValidationError({'detail': 'Пароли не совпадают'})
        attrs.pop('confirm', None)
        return attrs
    
class ResetPasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    password = serializers.CharField(required=True)
    confirm = serializers.CharField(required=True, write_only=True)

    def validate(self, attrs):
        if attrs['password'] != attrs['confirm']:
            raise serializers.ValidationError({'detail': 'Пароли не совпадают'})
        attrs.pop('confirm', None)
        return attrs

class UserCreateSerializer(serializers.ModelSerializer):
    confirm = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'first_name', 'last_name', 'middle_name', 'phone', 'photo', 'password', 'confirm')
    
    def validate(self, attrs):
        if attrs['password'] != attrs['confirm']:
            raise serializers.ValidationError({'detail': 'Пароли не совпадают'})
        attrs.pop('confirm', None)
        return attrs
    
    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user

class GetUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'username', 'vk_id', 'email', 'first_name', 'last_name', 'middle_name', 'phone', 'photo', 'tg', 'is_staff', 'is_team')

class TeamLeaderSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = '__all__'
    
class EditUserSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    phone = serializers.CharField(required=True, min_length=11, max_length=11)
    
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'middle_name', 'phone', 'tg')
    

class UpdatePhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['photo']

    def update(self, instance, validated_data):
        old_photo = instance.photo.path if instance.photo and instance.photo.name != 'users/none.jpg' else None
        instance = super().update(instance, validated_data)
        
        if old_photo and os.path.exists(old_photo) and old_photo != instance.photo.path:
            try:
                os.remove(old_photo)
            except Exception as e:
                pass

        return instance
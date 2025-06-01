from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from drf_spectacular.utils import extend_schema
from rest_framework.response import Response
from rest_framework import generics, status
from rest_framework.views import APIView
from django.core.cache import cache
import string, random, requests
from .permissions import IsStaff

from .utils.auth import set_auth_cookies
from services.email_sender import EmailSender
from .serializers import *
from core import settings
from .models import *

class UserRegisterView(APIView):
    serializer_class = UserRegisterSerializer

    @extend_schema(summary="Регистрация пользователя", tags=["Регистрация"])
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        user_data = serializer.validated_data.copy()

        code = str(random.randint(100000, 999999))
        cache.set(f'register_code_{code}', user_data, timeout=300)
        cache.set(f'register_email_{serializer.validated_data['email']}', code, timeout=300)
        cache.set(f'register_id_{serializer.validated_data['username']}', code, timeout=300)
        
        EmailSender.send_email(email=serializer.validated_data['email'], code=code, email_type=1)
        return Response({'detail': ['Код подтверждения отправлен на почту']}, status=status.HTTP_200_OK)
    
class UserRegisterConfirmView(APIView):
    serializer_class = CodeSerializer

    @extend_schema(summary="Подтверждение регистрации", tags=["Регистрация"])
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        user_data = cache.get(f'register_code_{serializer.validated_data['code']}')
        if not user_data: return Response({'detail': ['Неправильный или истёкший код']}, status=400)

        user = User.objects.create_user(
            username=user_data['username'],
            email=user_data['email'],
            password=user_data['password']
        )

        cache.delete(f'register_code_{serializer.validated_data['code']}')
        cache.delete(f'register_email_{user_data['email']}')
        cache.delete(f'register_id_{user_data['username']}')
        
        return Response(status=status.HTTP_201_CREATED)

@extend_schema(summary="Аутентификация", tags=["Авторизация"])
class CookieTokenObtainPairView(TokenObtainPairView):
    serializer_class=CustomTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        response = super().post(request, *args, **kwargs)
        access_token = response.data.get('access')
        refresh_token = response.data.get('refresh')

        user = serializer.user
        if 'remember_me' in request.data:
            user.remember_me = request.data.get('remember_me')
            user.save()

        set_auth_cookies(response, access_token, refresh_token, user.remember_me)

        del response.data['access']
        del response.data['refresh']
        return response

@extend_schema(request=None, summary="Обновление refresh и access", tags=["Авторизация"])
class CookieTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get('refresh')
        if not refresh_token: return Response({'detail': ['Токен не был передан']}, status=401)

        request.data['refresh'] = refresh_token
        response = super().post(request, *args, **kwargs)

        access_token = response.data.get('access')
        old_refresh = RefreshToken(refresh_token)
        user_id = old_refresh.payload.get("user_id")
        user = User.objects.get(username=user_id)
        new_refresh = RefreshToken.for_user(user)

        set_auth_cookies(response, access_token, str(new_refresh), user.remember_me)

        del response.data['access']
        return response
    
@extend_schema(summary="Удаление куков (logout)", tags=["Авторизация"])
class LogoutView(APIView):
    def post(self, request):
        response = Response(status=status.HTTP_200_OK)
        response.delete_cookie(key='access', path='/', samesite='None')
        response.delete_cookie(key='refresh', path='/', samesite='None')
        return response

@extend_schema(summary="Выслать код на почту", tags=["Восстановление пароля по почте"])
class ResetPasswordByEmailView(APIView):
    serializer_class = EmailSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        code = ''.join(random.choices(string.ascii_letters + string.digits, k=16))
        cache.set(f'reset_code_{code}', serializer.validated_data['email'], timeout=300)
        
        EmailSender.send_email(email=serializer.validated_data['email'], code=code, email_type=1)
        return Response({'detail': ['Код восстановления отправлен на почту']}, status=status.HTTP_200_OK)
        
@extend_schema(summary="Отправить код с новым паролем", tags=["Восстановление пароля по почте"])
class ResetPasswordByEmailConfirmView(APIView):
    serializer_class = CodeConfirmSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        user_email = cache.get(f'reset_code_{serializer.validated_data['code']}')
        if not user_email: return Response({'detail': ['Неправильный или истёкший код']}, status=status.HTTP_400_BAD_REQUEST)
        
        user = User.objects.get(email=user_email)
        user.set_password(serializer.validated_data['password'])
        user.save()

        cache.delete(f'reset_code_{serializer.validated_data['code']}')

        return Response(status=status.HTTP_200_OK)
    
@extend_schema(summary="Авторизация по VK ID (или привязка)", tags=["Авторизация"])
class VKAuthView(APIView):

    def post(self, request, *args, **kwargs):
        try:
            vk_response = requests.post(
                "https://id.vk.com/oauth2/user_info",
                headers={
                    "Authorization": f"Bearer {request.data.get("access_token")}",
                    "Content-Type": "application/json"
                },
                json={
                    "client_id": settings.VK_CLIENT
                }
            )

            user_info = vk_response.json().get("user", {})
            user_id = int(user_info.get("user_id"))
            is_authenticated = request.user.is_authenticated
            vk_user = User.objects.filter(vk_id=user_id).first()
            if is_authenticated:
                if vk_user and request.user.vk_id != user_id: return Response({"detail": ["Данный аккаунт VK уже принадлежит другому пользователю"]}, status=status.HTTP_400_BAD_REQUEST)
                request.user.vk_id = user_id
                request.user.save()
                serialized_user = GetUserSerializer(request.user, context={"request": request})
                return Response(serialized_user.data, status=status.HTTP_200_OK)
            
            if vk_user:
                response = Response(status=status.HTTP_200_OK)
                refresh = RefreshToken.for_user(vk_user)
                set_auth_cookies(response, str(refresh.access_token), str(refresh))
                return response
            
            return Response({"detail": ["Пользователь не найден"]}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"detail": ["Ошибка при обращении к VK ID"]}, status=status.HTTP_502_BAD_GATEWAY)


# IsAuthenticated
@extend_schema(summary="Создать тимлида", tags=["Менеджер"])
class LeaderCreateAPIView(generics.CreateAPIView):
    permission_classes = [IsStaff]
    serializer_class = UserCreateSerializer
    queryset = User.objects.all()

    def perform_create(self, serializer):
        serializer.save(is_team=True, photo='users/none.png')

@extend_schema(summary="Удалить тимлида", tags=["Менеджер"])
class LeaderDestroyAPIView(generics.DestroyAPIView):
    permission_classes = [IsStaff]
    queryset = User.objects.all()

@extend_schema(summary="Все тимлиды", tags=["Менеджер"])
class LeadersListAPIView(generics.ListAPIView):
    permission_classes = [IsStaff]
    serializer_class = TeamLeaderSerializer
    queryset = User.objects.filter(is_team=True)
    
@extend_schema(summary="Обновление данных пользователя", tags=["Пользователь"])
class UserUpdateAPIView(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = EditUserSerializer
    http_method_names = ['put']

    def get_object(self):
        return self.request.user

@extend_schema(summary="Отвязка VK", tags=["Авторизация"])
class VKLogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = request.user
        user.vk_id = None
        user.save()
        return Response(status=status.HTTP_200_OK)
            
@extend_schema(summary="Получение данных пользователя", tags=["Пользователь"])
class UserMeAPIView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = GetUserSerializer

    def get_object(self):
        return User.objects.get(id=self.request.user.id)
    
@extend_schema(summary="Получение данных пользователя по id", tags=["Пользователь"])
class UserDetailAPIView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = GetUserSerializer
    queryset = User.objects.all()
    lookup_field = 'id'

@extend_schema(summary="Изменение фото профиля", tags=["Пользователь"])
class UpdateUserPhotoView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UpdatePhotoSerializer

    def put(self, request):
        user = request.user
        serializer = self.serializer_class(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(GetUserSerializer(user, context={"request": request}).data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@extend_schema(summary="Изменение пароля по старому", tags=["Изменение пароля по старому в лк"])
class ResetPasswordView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ResetPasswordSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = request.user
        old_password = request.data.get("old_password")
        if not user.check_password(old_password):
            return Response({"detail": ["Неверный пароль"]}, status=400)
        user.set_password(request.data.get("password"))
        user.save()
        return Response({"detail": ["Пароль успешно изменён"]}, status=status.HTTP_200_OK)
    
@extend_schema(summary="Ввод новой почты", tags=["Изменение почты в лк"])
class ResetOldEmailView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = EmailExistsSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        old_email = cache.get(f'new_email_{request.user.email}')
        if old_email: 
            cache.delete(f'new_email_{old_email}')
            cache.delete(f'new_email_{request.user.email}')

        code = str(random.randint(100000, 999999))
        cache.set(f'new_email_{code}', {"old": request.user.email, "new": serializer.validated_data['email']}, timeout=300)
        cache.set(f'new_email_{request.user.email}', code, timeout=300)
        
        EmailSender.send_email(email=serializer.validated_data['email'], code=code, email_type=1)
        return Response({'detail': ['Код отправлен на почту']}, status=status.HTTP_200_OK)
    
@extend_schema(summary="Подтверждение изменения почты", tags=["Изменение почты в лк"])
class ResetOldEmailConfirmView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CodeSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        emails = cache.get(f'new_email_{serializer.validated_data['code']}')
        if not emails: return Response({'detail': ['Неправильный или истёкший код']}, status=400)
        
        user = User.objects.filter(email=emails.get('old')).first()
        user.email = emails.get('new')
        user.save()

        cache.delete(f'new_email_{serializer.validated_data['code']}')

        return Response({'detail': ['Почта успешно именена']}, status=status.HTTP_200_OK)

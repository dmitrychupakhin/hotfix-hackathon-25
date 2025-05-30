from django.urls import path
from .views import *

urlpatterns = [
    path('users/register', UserRegisterView.as_view()),
    path('users/register/confirm', UserRegisterConfirmView.as_view()),

    path('users/login', CookieTokenObtainPairView.as_view()),
    path('users/logout', LogoutView.as_view()),

    path('users/refresh', CookieTokenRefreshView.as_view()),

    path('users/vk/login', VKAuthView.as_view()),
    path('users/vk/logout', VKLogoutView.as_view()),

    path('users/me', UserMeAPIView.as_view()),
    path('users/photo', UpdateUserPhotoView.as_view()),
    path('users/edit', UserUpdateAPIView.as_view()),
    
    path('users/pwd/reset', ResetPasswordView.as_view()),
    path('users/pwd/reset/email', ResetPasswordByEmailView.as_view()),
    path('users/pwd/reset/email/confirm', ResetPasswordByEmailConfirmView.as_view()),

    path('users/email/reset', ResetOldEmailView.as_view()),
    path('users/email/reset/confirm', ResetOldEmailConfirmView.as_view()),
]
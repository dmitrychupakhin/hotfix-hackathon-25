from rest_framework_simplejwt.authentication import JWTAuthentication
from datetime import timedelta
from django.utils import timezone
from core import settings

class CookieJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        access_token = request.COOKIES.get('access')
        if access_token is None:
            return None
        validated_token = self.get_validated_token(access_token)
        return self.get_user(validated_token), validated_token
    
def set_auth_cookies(response, access_token: str, refresh_token: str, remember_me=True):
    access_expires = timezone.now() + settings.SIMPLE_JWT["ACCESS_TOKEN_LIFETIME"]
    refresh_expires = timezone.now() + settings.SIMPLE_JWT["REFRESH_TOKEN_LIFETIME"]

    response.set_cookie(
        key='access',
        value=access_token,
        httponly=True,
        secure=True,
        samesite='None',
        expires=access_expires
    )
    response.set_cookie(
        key='refresh',
        value=refresh_token,
        httponly=True,
        secure=True,
        samesite='None',
        expires=refresh_expires if remember_me else None
    )
    return response
from urllib.parse import parse_qs
from jwt import decode as jwt_decode, InvalidTokenError
from django.conf import settings
from channels.db import database_sync_to_async
from django.contrib.auth.models import AnonymousUser
from rest_framework_simplejwt.tokens import UntypedToken
from django.contrib.auth import get_user_model

@database_sync_to_async
def get_user(token):
    try:
        UntypedToken(token)
        payload = jwt_decode(token, settings.SECRET_KEY, algorithms=["HS256"])
        return get_user_model().objects.get(id=payload["user_id"])
    except (InvalidTokenError, get_user_model().DoesNotExist):
        return AnonymousUser()

class JWTAuthMiddleware:
    def __init__(self, inner):
        self.inner = inner

    async def __call__(self, scope, receive, send):
        headers = dict(scope["headers"])
        token = None
        if b"authorization" in headers:
            auth = headers[b"authorization"].decode()
            if auth.startswith("Bearer "):
                token = auth[7:]
        if not token:
            qs = parse_qs(scope["query_string"].decode())
            token = qs.get("token", [None])[0]
        scope["user"] = await get_user(token)
        return await self.inner(scope, receive, send)

def JWTAuthMiddlewareStack(inner):
    from channels.sessions import CookieMiddleware, SessionMiddleware
    return CookieMiddleware(SessionMiddleware(JWTAuthMiddleware(inner)))
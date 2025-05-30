from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from drf_spectacular.utils import extend_schema
from .serializers import *

@extend_schema(summary="Создание заявки заказчиком", tags=["Заявки"])
class OrderCreateAPIView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CreateOrderSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

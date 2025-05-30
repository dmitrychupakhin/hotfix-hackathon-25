from rest_framework import generics, filters
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.pagination import PageNumberPagination
from drf_spectacular.utils import extend_schema
from .serializers import *
from users.permissions import IsStaff, IsOrderRelatedUser
from .models import *

@extend_schema(summary="Создание заявки заказчиком", tags=["Заявки"])
class OrderCreateAPIView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CreateOrderSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class OrderListPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 10000

@extend_schema(summary="Заявки заказчиков", tags=["Заявки"])
class OrderListAPIView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = GetOrderSerializer
    pagination_class = OrderListPagination

    filter_backends = [filters.OrderingFilter, filters.SearchFilter]
    search_fields = ['title']
    ordering_fields = ['status', 'created_at', 'start', 'end']
    ordering = ['-created_at']

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated and (user.is_staff or user.is_superuser):
            return Order.objects.all()
        if user.is_team:
            return Order.objects.filter(team=user)
        return Order.objects.filter(user=user)
    
@extend_schema(summary="Получение заявки по ID", tags=["Заявки"])
class EventDetailRetrieveAPIView(generics.RetrieveAPIView):
    permission_classes = [IsOrderRelatedUser]
    queryset = Order.objects.all()
    serializer_class = GetOrderSerializer
    lookup_field = 'id'
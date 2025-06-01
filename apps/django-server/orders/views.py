from rest_framework import generics, filters
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.pagination import PageNumberPagination
from drf_spectacular.utils import extend_schema
from .serializers import *
from rest_framework.views import APIView
from users.permissions import IsStaff, IsOrderRelatedUser, IsLeader
from .models import *
from rest_framework.response import Response
from rest_framework import status

@extend_schema(summary="Создание заявки заказчиком", tags=["Заявки"])
class OrderCreateAPIView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CreateOrderSerializer
    
    def perform_create(self, serializer):
        order = serializer.save(user=self.request.user)
        
class OrderListPagination(PageNumberPagination):
    page_size = 4
    page_size_query_param = 'page_size'
    max_page_size = 10000

@extend_schema(summary="Заявки заказчиков", tags=["Заявки"])
class OrderListAPIView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = GetOrderSerializer
    pagination_class = OrderListPagination

    filter_backends = [DjangoFilterBackend, filters.OrderingFilter, filters.SearchFilter]
    search_fields = ['title']
    filterset_fields = ['status']
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
class OrderDetailRetrieveAPIView(generics.RetrieveAPIView):
    permission_classes = [IsOrderRelatedUser]
    queryset = Order.objects.all()
    serializer_class = GetOrderSerializer
    lookup_field = 'id'

@extend_schema(summary="Изменение заявки по ID", tags=["Заявки"])
class OrderUpdateAPIView(generics.UpdateAPIView):
    permission_classes = [IsStaff, IsLeader]
    queryset = Order.objects.all()
    serializer_class = UpdateOrderSerializer
    lookup_field = 'id'
    
    def perform_update(self, serializer):
        serializer.save(status='inwork')

@extend_schema(summary="Отклонить заявку", tags=["Заявки"])
class OrderCancelView(APIView):
    permission_classes = [IsStaff]

    def post(self, request, id):
        try:
            order = Order.objects.get(id=id)
        except Order.DoesNotExist:
            return Response({'detail': ['Заявка не найдена']}, status=status.HTTP_404_NOT_FOUND)

        order.status = 'denied'
        order.save()

        return Response(status=status.HTTP_200_OK)
    
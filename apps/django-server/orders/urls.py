from django.urls import path
from .views import *

urlpatterns = [
    path('orders/create', OrderCreateAPIView.as_view()),
    path('orders', OrderListAPIView.as_view()),
    path('orders/<int:id>', EventDetailRetrieveAPIView.as_view()),
]
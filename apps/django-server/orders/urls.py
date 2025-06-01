from django.urls import path
from .views import *

urlpatterns = [
    path('orders/create', OrderCreateAPIView.as_view()),
    path('orders', OrderListAPIView.as_view()),
    path('orders/<int:id>', OrderDetailRetrieveAPIView.as_view()),
    path('orders/<int:id>/cancel', OrderCancelView.as_view()),
    path('orders/<int:id>/update', OrderUpdateAPIView.as_view()),
    path('orders/<int:id>/done', OrderDoneView.as_view()),
]
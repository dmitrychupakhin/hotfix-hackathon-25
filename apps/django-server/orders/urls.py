from django.urls import path
from .views import *

urlpatterns = [
    path('orders', OrderCreateAPIView.as_view()),
]
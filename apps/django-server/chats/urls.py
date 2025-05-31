from django.urls import path
from .views import *

urlpatterns = [
    path("api/threads/", MyThreads.as_view()),
    path("api/threads/<int:pk>/messages/", ThreadMessages.as_view()),
]
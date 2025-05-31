from django.urls import path
from .views import *

urlpatterns = [
    path('predictors/<int:id>/start', PredictionCatsView.as_view()),
    path('predictors/result/<str:task_id>', PredictionResultView.as_view()),
]
from django.urls import path
from .views import *

urlpatterns = [
    path('predictors/<int:id>/start', OrderPredictionStartView.as_view()),
    path('predictors/result/<int:id>', OrderPredictionResultView.as_view()),
]
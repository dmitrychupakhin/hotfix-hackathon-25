from django.urls import path
from .views import *

urlpatterns = [
    path('predictors/<int:id>/start', PredictionCatsView.as_view()),
    path('predictors/result/<int:id>', PredictionResultView.as_view()),
]
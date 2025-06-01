from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .tasks import run_ml_prediction
from celery.result import AsyncResult
from rest_framework import status
from orders.models import Order
from drf_spectacular.utils import extend_schema

data = {
  "predict_team": 3,
  "task": "мне нужно сделать онлайн-платформу для просмотра и скачивания фильмов",
  "teams": [
    {
      "team": 3,
      "last_end_date": "2026-06-10",
      "stack": "HTML, js, typescript, fast-api, docker",
      "count_frontend": 2,
      "count_backend": 1,
      "count_ml": 1,
      "count_designer": 1,
      "count_devops": 0
    },
    {
      "team": 4,
      "last_end_date": "2026-07-06",
      "stack": "Java, Flutter, Kotlin",
      "count_frontend": 2,
      "count_backend": 1,
      "count_ml": 2,
      "count_designer": 1,
      "count_devops": 1
    }
  ]
}

@extend_schema(summary="Узнать состояние плана", tags=["План"])
class OrderPredictionResultView(APIView):
    def get(self, request, id):
        order = Order.objects.filter(id=id).first()
        if order.gen_status == 1: return Response({'status': 'success'})
        return Response({'status': 'pending'})

@extend_schema(summary="Сгенерировать план", tags=["План"])
class OrderPredictionStartView(APIView):
    def post(self, request, id):
        order = Order.objects.get(id=id)
        order.gen_status = 0
        order.save()
        task = run_ml_prediction.delay(data, id)
        return Response({'task_id': task.id}, status=status.HTTP_202_ACCEPTED)
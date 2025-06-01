from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .tasks import run_ml_prediction
from celery.result import AsyncResult
from rest_framework import status
from orders.models import Order
from drf_spectacular.utils import extend_schema

@extend_schema(summary="Узнать состояние плана", tags=["План"])
class OrderPredictionResultView(APIView):
    def get(self, request, id):
        order = Order.objects.filter(id=id).first()
        if order: return Response({'status': 'success'})
        return Response({'status': 'pending'})

@extend_schema(summary="Сгенерировать план", tags=["План"])
class OrderPredictionStartView(APIView):
    def post(self, request, id):
        task = run_ml_prediction.delay({"data": "data"}, id)
        return Response({'task_id': task.id}, status=status.HTTP_202_ACCEPTED)
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .tasks import run_ml_prediction
from celery.result import AsyncResult
from rest_framework import status
from orders.models import Order
from drf_spectacular.utils import extend_schema
from .utils import generate_plan_input
from users.permissions import IsStaff

@extend_schema(summary="Узнать состояние плана", tags=["План"])
class OrderPredictionResultView(APIView):
    permission_classes = [IsStaff]
    
    def get(self, request, id):
        order = Order.objects.filter(id=id).first()
        if order.gen_status == 1: return Response({'status': 'success'})
        return Response({'status': 'pending'})

@extend_schema(summary="Сгенерировать план", tags=["План"])
class OrderPredictionStartView(APIView):
    permission_classes = [IsStaff]
    
    def post(self, request, id):
        order = Order.objects.get(id=id)
        order.gen_status = 0
        order.save()
        data = generate_plan_input(order_id=id)
        task = run_ml_prediction.delay(data, id)
        return Response({'task_id': task.id}, status=status.HTTP_202_ACCEPTED)
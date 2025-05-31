from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from core.tasks import run_ml_prediction_cats
from celery.result import AsyncResult
from rest_framework import status
from orders.models import Order
from teams.models import TeamMember

class PredictionResultView(APIView):
    def get(self, request, task_id):
        result = AsyncResult(task_id)
        if result.ready():
            return Response({'status': 'done', 'result': result.result})
        return Response({'status': 'pending'})
    
class PredictionCatsView(APIView):
    def post(self, request, id):
        task = run_ml_prediction_cats.delay({"data": "data"}, id)
        return Response({'task_id': task.id}, status=status.HTTP_202_ACCEPTED)
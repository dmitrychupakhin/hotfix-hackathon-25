from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from core.tasks import run_ml_prediction_cats
from celery.result import AsyncResult
from rest_framework import status
from orders.models import Order
from teams.models import TeamMember
from predictors.models import Plan

class PredictionResultView(APIView):
    def get(self, request, id):
        plan = Plan.objects.filter(order=id).first()
        if plan:
            return Response({'status': 'success'})
        return Response({'status': 'pending'})
    
class PredictionCatsView(APIView):
    def post(self, request, id):
        task = run_ml_prediction_cats.delay({"data": "data"}, id)
        return Response({'task_id': task.id}, status=status.HTTP_202_ACCEPTED)
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
        try:
            order = Order.objects.get(id=id)
        except Order.DoesNotExist:
            return Response({'detail': ['Заявка не найдена']}, status=status.HTTP_404_NOT_FOUND)

        team_ids = (
            TeamMember.objects
            .values_list("leader_id", flat=True)
            .distinct()
        )

        teams_data = []
        for team_id in team_ids:
            category_orders = (
                Order.objects
                .filter(team_id=team_id)
                .exclude(category__isnull=True)
                .exclude(category="")
                .order_by("-end", "-created_at")[:5]
            )
            categories = [o.category for o in category_orders]

            last_order = (
                Order.objects
                .filter(team_id=team_id)
                .order_by("-end", "-created_at")
                .first()
            )
            last_end_date = last_order.end.strftime("%Y-%m-%d") if last_order and last_order.end else ""

            teams_data.append({
                "team": team_id,
                "categories": categories,
                "last_end_date": last_end_date
            })

        data = {
            "teams": teams_data,
            "task": order.title
        }

        task = run_ml_prediction_cats.delay(data, id)
        return Response({'task_id': task.id}, status=status.HTTP_202_ACCEPTED)
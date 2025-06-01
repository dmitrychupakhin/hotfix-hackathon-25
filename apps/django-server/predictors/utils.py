from orders.models import Order
from collections import Counter
from django.utils.timezone import now
from users.models import User
from teams.models import TeamMember
import json

def add_plan(data, order_id):
    try:
        order = Order.objects.get(id=order_id)
    except Order.DoesNotExist:
        return {"detail": ["Заявка не найдена"]}

    project_plan = data.get("project_plan", [])

    for item in project_plan:
        item["progress"] = 0

    plan_data = json.dumps(project_plan, ensure_ascii=False)

    predict_team = data.get("predict_team")
    if predict_team != "":
        order.predicted_team = int(predict_team)

    order.plan = plan_data
    order.gen_status = 1
    order.save()

    return {"status": "updated", "order_id": order.id}

def generate_plan_input(order_id):
    try:
        order = Order.objects.get(id=order_id)
    except Order.DoesNotExist:
        return {"detail": "Заявка не найдена"}

    task = order.title
    predict_team = order.predicted_team if order.predicted_team else ""

    leaders = User.objects.filter(is_team=True)
    teams = []

    for leader in leaders:
        members = TeamMember.objects.filter(leader=leader)
        role_counts = Counter(member.role for member in members)

        stack = []
        for member in members:
            if member.stack:
                stack.extend([s.strip() for s in member.stack.split(',') if s.strip()])
        stack = ", ".join(sorted(set(stack)))

        last_order = leader.team_orders.exclude(end__isnull=True).order_by('-end').first()
        last_end_date = last_order.end.strftime('%Y-%m-%d') if last_order else now().strftime('%Y-%m-%d')

        teams.append({
            "team": leader.id,
            "last_end_date": last_end_date,
            "stack": stack,
            "count_frontend": role_counts.get("frontend", 0),
            "count_backend": role_counts.get("backend", 0),
            "count_ml": role_counts.get("ml", 0),
            "count_designer": role_counts.get("design", 0),
            "count_devops": role_counts.get("devops", 0),
        })

    return {
        "predict_team": predict_team,
        "task": task,
        "teams": teams
    }
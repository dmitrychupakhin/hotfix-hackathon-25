from orders.models import Order
import json

def add_plan(data, order_id):
    try:
        order = Order.objects.get(id=order_id)
    except Order.DoesNotExist:
        return {"detail": ["Заявка не найдена"]}

    
    plan_data = json.dumps(data) if isinstance(data, dict) else data

    order.plan = plan_data
    order.save()

    return {"status": "updated", "order_id": order.id}
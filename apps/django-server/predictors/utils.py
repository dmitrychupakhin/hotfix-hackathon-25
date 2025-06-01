from orders.models import Order
import json

def add_plan(data, order_id):
    try:
        order = Order.objects.get(id=order_id)
    except Order.DoesNotExist:
        return {"detail": ["Заявка не найдена"]}

    if isinstance(data, dict):
        plan_data = json.dumps(data, ensure_ascii=False)
    else:
        plan_data = data

    order.plan = plan_data
    order.gen_status = 1
    order.save()

    return {"status": "updated", "order_id": order.id}
from orders.models import Order

def edit_order(data, order_id):
    predict_category = data.get("predict_category")
    predict_team = int(data.get("predict_team"))
    order = Order.objects.get(id=order_id)
    order.category = predict_category
    order.predicted_team = predict_team
    order.save()
    return {"status": "updated", "order_id": order.id}
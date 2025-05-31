from django.db import models
from users.models import *
from orders.models import Order
    
class Plan(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='plan', verbose_name="План")
    data = models.TextField(blank=False, null=False)
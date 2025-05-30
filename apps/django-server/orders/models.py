from django.db import models
from users.models import *

class Status(models.TextChoices):
    WAITING = "waiting", "Ожидание"
    INWORK  = "inwork",  "В работе"
    DONE  = "done",  "Выполнено"
    DENIED  = "denied",  "Отказано"
    
class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="Заказчик")
    title = models.CharField(max_length=128, verbose_name="Тема")
    description = models.TextField(blank=False, null=False, verbose_name="Описание")
    status = models.CharField(max_length=16, choices=Status.choices, default=Status.WAITING, verbose_name="Статус")
    start = models.DateTimeField(verbose_name="Начало", null=True, blank=True)
    end = models.DateTimeField(verbose_name="Конец", null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Создано")
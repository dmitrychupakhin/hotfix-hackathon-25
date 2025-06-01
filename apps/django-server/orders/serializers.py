from rest_framework import serializers
from .models import *
import os
import json
import ast
    
class CreateOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['title', 'description']
        
class GetOrderSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    plan = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = [
            'id', 'user', 'team', 'title', 'description', 'status',
            'start', 'end', 'created_at', 'predicted_team', 'plan'
        ]

    def get_user(self, obj):
        return f"{obj.user.last_name} {obj.user.first_name}"

    def get_plan(self, obj):
        plan = getattr(obj, 'plan', None)
        if plan:
            plan_obj = plan.first()
            if plan_obj:
                # Преобразуем строку в список словарей
                data = ast.literal_eval(plan_obj.data)
                return data  # просто возвращаем как объект
        return None
    
class ConnectOrderSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Order
        fields = ['team',]
    


    

from rest_framework import serializers
from .models import *
import json
import os
    
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
        plan_qs = getattr(obj, 'plan', None)
        if plan_qs:
            plan_obj = plan_qs.first()
            if plan_obj:
                try:
                    return json.loads(plan_obj.data)
                except json.JSONDecodeError:
                    return None
        return None
    
class ConnectOrderSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Order
        fields = ['team',]
    


    

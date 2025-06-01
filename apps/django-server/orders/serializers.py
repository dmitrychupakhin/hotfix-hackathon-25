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
    plan = serializers.SerializerMethodField()
    
    class Meta:
        model = Order
        fields = [
            'id', 'user', 'team', 'title', 'description', 'status',
            'start', 'end', 'created_at', 'predicted_team', 'plan'
        ]

    def get_plan(self, obj):
        if obj.plan:
            return ast.literal_eval(obj.plan)
        return None

class UpdateOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = [
            'team', 'title', 'description', 'status',
            'start', 'end', 'predicted_team', 'plan'
        ]
    
class ConnectOrderSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Order
        fields = ['team',]
    


    

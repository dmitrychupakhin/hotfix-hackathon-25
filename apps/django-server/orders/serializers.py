from rest_framework import serializers
from .models import *
import os
    
class CreateOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['title', 'description']
        
class GetOrderSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    
    class Meta:
        model = Order
        fields = ['id', 'user', 'team', 'title', 'description', 'status', 'start', 'end', 'created_at', 'predicted_team']
        
    def get_user(self, obj):
        return f"{obj.user.last_name} {obj.user.first_name}"
    
class ConnectOrderSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Order
        fields = ['team',]
    


    

from rest_framework import serializers
from .models import *
import os
    
class TeamMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamMember
        fields = ['id', 'role', 'photo', 'first_name', 'last_name', 'middle_name', 'stack']

class TeamMemberCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamMember
        fields = ['role', 'first_name', 'photo', 'last_name', 'middle_name', 'stack']

class TeamMemberUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamMember
        fields = ['role', 'photo', 'first_name', 'last_name', 'middle_name', 'stack']

from rest_framework import serializers
from .models import Thread, Message

class MessageSer(serializers.ModelSerializer):
    class Meta:
        model  = Message
        fields = ("id", "sender", "text", "sent_at", "is_read")

class ThreadSer(serializers.ModelSerializer):
    last_message = serializers.SerializerMethodField()

    def get_last_message(self, obj):
        msg = obj.messages.last()
        return MessageSer(msg).data if msg else None

    class Meta:
        model  = Thread
        fields = ("id", "customer", "manager", "created", "last_message")
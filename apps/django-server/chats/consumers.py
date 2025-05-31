import json
from channels.generic.websocket import AsyncWebsocketConsumer
from .models import Thread, Message
from channels.db import database_sync_to_async
from django.utils import timezone

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.thread_id = self.scope["url_route"]["kwargs"]["thread_id"]
        self.room_group = f"thread_{self.thread_id}"

        user = self.scope["user"]
        if user.is_anonymous:
            await self.close()
            return

        await self.channel_layer.group_add(self.room_group, self.channel_name)
        await self.accept()

    async def disconnect(self, _):
        await self.channel_layer.group_discard(self.room_group, self.channel_name)

    async def receive(self, text_data):
        data = json.loads(text_data)
        msg_obj = await self.save_msg(data["message"])
        await self.channel_layer.group_send(
            self.room_group,
            {
                "type": "chat.message",
                "message": data["message"],
                "sender": msg_obj.sender_id,
                "sent_at": msg_obj.sent_at.isoformat(),
            },
        )

    async def chat_message(self, event):
        await self.send(text_data=json.dumps(event))

    @database_sync_to_async
    def save_msg(self, message):
        thread = Thread.objects.get(id=self.thread_id)
        return Message.objects.create(
            thread=thread,
            sender=self.scope["user"],
            text=message,
            sent_at=timezone.now(),
        )
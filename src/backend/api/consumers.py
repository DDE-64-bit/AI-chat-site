import json
from channels.generic.websocket import AsyncWebsocketConsumer
from django.contrib.auth.models import User
from .models import ChatMessage

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.channel_layer.group_add("chat", self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard("chat", self.channel_name)

    async def receive(self, text_data):
        data = json.loads(text_data)
        user = self.scope["user"]
        text = data["text"]

        message = await self.save_message(user, text)

        await self.channel_layer.group_send(
            "chat",
            {
                "type": "chat_message",
                "user": user.username,
                "text": message.text,
                "timestamp": str(message.timestamp),
            },
        )


    async def chat_message(self, event):
        await self.send(text_data=json.dumps(event))

    @staticmethod
    async def save_message(user, text):
        return ChatMessage.objects.create(user=user, text=text)

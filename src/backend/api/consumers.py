import json
from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import sync_to_async
from django.contrib.auth.models import User
from .models import ChatMessage

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.group_name = f"chat_{self.room_name}"

        print(f"connect() called in room: {self.room_name}")
        await self.channel_layer.group_add(self.group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.group_name, self.channel_name)

    async def receive(self, text_data):
        user = self.scope["user"]
        if user.is_anonymous:
            print("User is not authenticated")
            return

        data = json.loads(text_data)
        text = data["text"]

        message = await self.save_message(user, text)

        await self.channel_layer.group_send(
            self.group_name,
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
    @sync_to_async
    def save_message(user, text):
        return ChatMessage.objects.create(user=user, text=text)

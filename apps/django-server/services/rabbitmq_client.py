import aio_pika
import json
from django.conf import settings

async def send_email_task(email: str, code: str, email_type: int):
    connection = await aio_pika.connect_robust(
        f"amqp://{settings.RABBITMQ['USER']}:{settings.RABBITMQ['PASSWORD']}@"
        f"{settings.RABBITMQ['HOST']}:{settings.RABBITMQ['PORT']}/"
    )
    
    async with connection:
        channel = await connection.channel()
        message_body = json.dumps({
            "email": email,
            "code": code,
            "type": email_type
        }).encode()
        
        await channel.default_exchange.publish(
            aio_pika.Message(body=message_body),
            routing_key=settings.RABBITMQ['QUEUE']
        )
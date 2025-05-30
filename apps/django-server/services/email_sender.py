from asgiref.sync import sync_to_async
from .rabbitmq_client import send_email_task

class EmailSender:
    @staticmethod
    async def _send_async(email: str, code: str, email_type: int):
        await send_email_task(email, code, email_type)
    
    @classmethod
    def send_email(cls, email: str, code: str, email_type: int):
        import asyncio
        asyncio.run(cls._send_async(email, code, email_type))
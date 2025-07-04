import asyncio
import json
import aio_pika
import aiosmtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from jinja2 import Template
from core.config import settings

async def load_template(template_name: str, code: str) -> str:
    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    TEMPLATES_DIR = os.path.join(BASE_DIR, 'static', 'templates')
    template_path = os.path.join(TEMPLATES_DIR, template_name)

    with open(template_path, "r", encoding="utf-8") as f:
        template = Template(f.read())
    return template.render(code=code)

async def send_email(recipient_email: str, code: str, email_type: int):
    
    if email_type == 1:
        template_name = "confirm_registration.html"
        subject = "Подтверждение регистрации SlobodaSoft"
    elif email_type == 2:
        template_name = "rebuild_password.html"
        subject = "Восстановление пароля SlobodaSoft"
    elif email_type == 3:
        template_name = "vk_registration.html"
        subject = "Данные от аккаунта SlobodaSoft"

    html_content = await load_template(template_name, code)

    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"] = settings.smtp.email
    msg["To"] = recipient_email
    msg.attach(MIMEText(html_content, "html"))

    try:
        await aiosmtplib.send(
            msg,
            hostname=settings.smtp.server,
            port=settings.smtp.port,
            username=settings.smtp.user,
            password=settings.smtp.password,
            use_tls=True,
            start_tls=False,
        )
    except Exception as e:
        print(e)

async def consume():
    try:
        connection = await aio_pika.connect_robust(f"amqp://{settings.rabbit.user}:{settings.rabbit.password}@{settings.rabbit.host}/")
        async with connection:
            channel = await connection.channel()

            queue = await channel.declare_queue(settings.rabbit.queue, durable=True)

            async for message in queue:
                async with message.process():
                    try:
                        data = json.loads(message.body)

                        email = data.get("email")
                        code = data.get("code")
                        email_type = int(data.get("type"))

                        if not email or not code:
                            continue

                        await send_email(email, code, email_type)

                    except Exception as e:
                        print(e)

    except Exception as e:
        print(e)
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from users.models import User
from django.contrib.auth.hashers import make_password

if not User.objects.exists():
    User.objects.create(
        username="admin",
        email="skisterev78@mail.ru",
        password=make_password("password"),
        is_superuser=True,
        is_staff=True
    )
    User.objects.create(
        username="staff",
        email="example@mail.ru",
        password=make_password("password"),
        is_staff=True
    )
    User.objects.create(
        username="leader",
        email="example1@mail.ru",
        password=make_password("password"),
        is_team=True
    )
    User.objects.create(
        username="user",
        email="example12@mail.ru",
        password=make_password("password")
    )
else:
    pass
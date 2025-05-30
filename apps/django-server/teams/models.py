from django.db import models
from users.models import *

class TeamRole(models.TextChoices):
    BACKEND = "backend", "Backend"
    FRONTEND  = "frontend",  "Frontend"
    ML  = "ml",  "ML"
    DESIGN  = "design",  "Design"
    DEVOPS  = "devops",  "Devops"

class TeamMember(models.Model):
    leader = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="Тимлид")
    role = models.CharField(max_length=16, choices=TeamRole.choices, verbose_name="Роль")
    first_name = models.CharField(max_length=64, null=True, blank=False)
    last_name = models.CharField(max_length=64, null=True, blank=False)
    middle_name = models.CharField(max_length=64, null=True, blank=True)
    stack = models.TextField(blank=True, null=True, verbose_name="Стек")
    photo = models.ImageField(
        upload_to="members", 
        blank=True, 
        null=True, 
        default='members/none.png'
    )

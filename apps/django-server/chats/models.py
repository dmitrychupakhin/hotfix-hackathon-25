from django.db import models
from django.conf import settings

class Thread(models.Model):
    customer = models.ForeignKey(settings.AUTH_USER_MODEL,
                                 related_name="threads_as_customer",
                                 on_delete=models.CASCADE)
    manager = models.ForeignKey(settings.AUTH_USER_MODEL,
                                related_name="threads_as_manager",
                                on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("customer", "manager")

class Message(models.Model):
    thread   = models.ForeignKey(Thread, related_name="messages",
                                 on_delete=models.CASCADE)
    sender   = models.ForeignKey(settings.AUTH_USER_MODEL,
                                 on_delete=models.CASCADE)
    text     = models.TextField()
    sent_at  = models.DateTimeField(auto_now_add=True)
    is_read  = models.BooleanField(default=False)

    class Meta:
        ordering = ("sent_at",)
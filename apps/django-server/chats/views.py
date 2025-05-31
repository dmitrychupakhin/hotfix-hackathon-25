from rest_framework import generics, permissions
from .models import Thread, Message
from .serializers import ThreadSer, MessageSer
from django.db.models import Q

class MyThreads(generics.ListAPIView):
    serializer_class = ThreadSer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        u = self.request.user
        return Thread.objects.filter(Q(customer=u) | Q(manager=u))

class ThreadMessages(generics.ListCreateAPIView):
    serializer_class = MessageSer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        thread = Thread.objects.get(pk=self.kwargs["pk"])
        return thread.messages.all()

    def perform_create(self, serializer):
        thread = Thread.objects.get(pk=self.kwargs["pk"])
        serializer.save(thread=thread, sender=self.request.user)
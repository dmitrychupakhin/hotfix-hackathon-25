from rest_framework import generics
from drf_spectacular.utils import extend_schema
from .serializers import *
from users.permissions import IsLeader, IsTeamLeaderOfMember, IsStaff
from .models import *

@extend_schema(summary="Вывести команду тимлида", tags=["Тимлид"])
class TeamMembersListAPIView(generics.ListAPIView):
    permission_classes = [IsLeader]
    serializer_class = TeamMemberSerializer

    def get_queryset(self):
        user = self.request.user
        return TeamMember.objects.filter(leader=user)

@extend_schema(summary="Добавить участника в команду", tags=["Тимлид"])
class TeamMemberCreateAPIView(generics.CreateAPIView):
    permission_classes = [IsLeader]
    serializer_class = TeamMemberCreateSerializer

    def perform_create(self, serializer):
        serializer.save(leader=self.request.user)

@extend_schema(summary="Удалить участника из команды", tags=["Тимлид"])
class TeamMemberDestroyAPIView(generics.DestroyAPIView):
    permission_classes = [IsTeamLeaderOfMember]
    queryset = TeamMember.objects.all()

@extend_schema(summary="Изменить участника команды", tags=["Тимлид"])
class TeamMemberUpdateAPIView(generics.UpdateAPIView):
    permission_classes = [IsTeamLeaderOfMember]
    serializer_class = TeamMemberUpdateSerializer
    queryset = TeamMember.objects.all()
    http_method_names = ['put']

@extend_schema(summary="Все разработчики тимлида по id", tags=["Менеджер"])
class TeamMembersbyIDListAPIView(generics.CreateAPIView):
    permission_classes = [IsStaff]
    serializer_class = TeamMemberSerializer

    def get_queryset(self):
        leader = self.kwargs['pk']
        return TeamMember.objects.filter(leader=leader)

    
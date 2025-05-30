from django.urls import path
from .views import *

urlpatterns = [
    path('team/my', TeamMembersListAPIView.as_view()),
    path('team/add', TeamMemberCreateAPIView.as_view()),
    path('team/<int:pk>/delete', TeamMemberDestroyAPIView.as_view()),
    path('team/<int:pk>/update', TeamMemberUpdateAPIView.as_view()),
    path('team/<int:pk>', TeamMembersbyIDListAPIView.as_view())
]
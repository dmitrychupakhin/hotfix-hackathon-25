from rest_framework.permissions import BasePermission

class IsStaff(BasePermission):
    def has_permission(self, request, view):
        return bool(
            request.user and
            request.user.is_authenticated and
            (request.user.is_staff or request.user.is_superuser)
        )

class IsLeaderOrStaff(BasePermission):
    def has_permission(self, request, view):
        return bool(
            request.user and
            request.user.is_authenticated and
            (request.user.is_team or request.user.is_staff or request.user.is_superuser)
        )
        
class IsLeader(BasePermission):
    def has_permission(self, request, view):
        return bool(
            request.user and
            request.user.is_authenticated and
            request.user.is_team
        )
    
class IsOrderRelatedUser(BasePermission):
    def has_object_permission(self, request, view, obj):
        user = request.user
        return (
            user.is_authenticated and (
                obj.user == user or
                obj.team == user or
                user.is_staff or
                user.is_superuser
            )
        )
    
class IsTeamLeaderOfMember(BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.leader == request.user or request.user.is_superuser
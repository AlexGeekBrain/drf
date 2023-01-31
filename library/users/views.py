from rest_framework.viewsets import ModelViewSet
from rest_framework import permissions
from .models import User
from .serializers import UserModelSerializer


class UserModelViewSet(ModelViewSet):
    # permission_classes = [permissions.IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = UserModelSerializer

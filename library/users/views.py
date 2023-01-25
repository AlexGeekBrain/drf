from rest_framework.viewsets import ModelViewSet
from rest_framework import mixins
from .models import User
from .serializers import UserModelSerializer


class UserModelViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer

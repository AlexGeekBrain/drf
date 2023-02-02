from rest_framework.viewsets import ModelViewSet
from rest_framework import permissions
from .models import User
from .serializers import UserModelSerializer, UserModelSerializerCustom
from rest_framework.generics import ListAPIView


class UserModelViewSet(ModelViewSet):
    # permission_classes = [permissions.IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = UserModelSerializer


class UserListAPIView(ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer

    def get_serializer_class(self):
        if self.request.version == '2':
            return UserModelSerializerCustom
        return UserModelSerializer

    # def get_serializer_class(self):
    #     if self.request.method in ['GET']:
    #         return UserModelSerializerCustom
    #     return UserModelSerializer
from rest_framework.serializers import ModelSerializer
from .models import User


class UserModelSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'user_name', 'first_name', 'last_name', 'email')
        

class UserModelSerializerCustom(ModelSerializer):
    class Meta:
        model = User
        fields = ('user_name', 'first_name', 'last_name', 'email', 'is_superuser', 'is_staff')

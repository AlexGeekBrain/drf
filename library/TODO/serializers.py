from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer
from .models import Project, ToDo
from users.models import User


class UserModelSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['user_name']
        ref_name = 'UserTodoModelSerializer'


class ProjectModelSerializerBase(ModelSerializer):

    class Meta:
        model = Project
        fields = '__all__'


class ProjectModelSerializer(ModelSerializer):
    users = UserModelSerializer(many=True)

    class Meta:
        model = Project
        fields = '__all__'


class ToDoModelSerializer(ModelSerializer):
    user = UserModelSerializer()
    project = ProjectModelSerializer()

    class Meta:
        model = ToDo
        fields = '__all__'

    def create(self, validated_data):
        return User(**validated_data)

    def update(self, instance, validated_data):
        instance.closed = validated_data.get('closed', instance.closed)
        instance.save()
        return instance

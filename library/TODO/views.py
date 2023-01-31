from rest_framework.viewsets import ModelViewSet
from rest_framework.pagination import LimitOffsetPagination

from .models import Project, ToDo
from .serializers import ProjectModelSerializer, ToDoModelSerializer, ProjectModelSerializerBase
from .filters import ProjectFilter


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    filtresset_class = ProjectFilter

    def get_serializer_class(self):
        if self.request.method in ['GET']:
            return ProjectModelSerializer
        return ProjectModelSerializerBase


class ProjectPagination(LimitOffsetPagination):
    default_limit = 10


class ToDoModelViewSet(ModelViewSet):
    queryset = ToDo.objects.all()
    serializer_class = ToDoModelSerializer
    filterset_fields = ['title', 'user', 'created_at', 'closed']


class ToDoPagination(LimitOffsetPagination):
    default_limit = 20
    
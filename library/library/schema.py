import graphene
from graphene_django import DjangoObjectType
from users.models import User
from TODO.models import Project, ToDo


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = '__all__'


class ToDoType(DjangoObjectType):
    class Meta:
        model = ToDo
        fields = '__all__'


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class Query(graphene.ObjectType):
    all_users = graphene.List(UserType)
    all_todo = graphene.List(ToDoType)
    all_projects = graphene.List(ProjectType)
    todo_by_id = graphene.Field(ToDoType, id=graphene.Int(required=True))
    todo_by_user_name = graphene.List(ToDoType, name=graphene.String(required=False))

    def resolve_all_users(self, info):
        return User.objects.all()

    def resolve_all_todo(self, info):
        return ToDo.objects.all()
    
    def resolve_all_projects(self, info):
        return Project.objects.all()
    
    def resolve_todo_by_id(self, info, id):
        try:
            return ToDo.objects.get(id=id)
        except ToDo.DoesNotExist:
            return None

    def resolve_todo_by_user_name(self, info, name=None):
        todolist = ToDo.objects.all()
        if name:
            todolist = todolist.filter(user__user_name=name)
        return todolist
    

# Меням статус списка дел на открыт/закрыт 
class ToDoMutation(graphene.Mutation):
    class Arguments:
        closed = graphene.Boolean(required=True)
        id = graphene.ID()

    todo = graphene.Field(ToDoType)

    @classmethod
    def mutate(cls, root, info, closed, id):
        todo = ToDo.objects.get(pk=id)
        todo.closed = closed
        todo.save()
        return ToDoMutation(todo=todo)


class Mutation(graphene.ObjectType):
    update_todo = ToDoMutation.Field()



schema = graphene.Schema(query=Query, mutation=Mutation)

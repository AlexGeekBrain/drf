from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
from django.contrib.auth.models import User as DjangoUser
from .views import UserModelViewSet
from .models import User
from TODO.models import Project
from mixer.backend.django import mixer

# import requests


# post_response = requests.post('http://127.0.0.1:8000/api-token-auth/', data={'username':
# 'Alex', 'password': 'alex070887'})

# print(post_response.status_code)
# print(post_response.json())

# get_response = requests.get('http://127.0.0.1:8000/api/users/', 
#                         data={'token': '5f8ebab90754611bd03db4838f5e8db0d2803cd6'})

# print(get_response.status_code)
# print(get_response.json())


# response = requests.get('http://127.0.0.1:8000/api/users/')
# print(response.json())
# response = requests.get('http://127.0.0.1:8000/api/users/', headers={'Accept': 'application/json; version=2'})
# print(response.json())


class TestUserViewSet(TestCase):

    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/users')
        view = UserModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
    def test_create_guest(self):
        factory = APIRequestFactory()
        request = factory.post('/api/users', {
            'id': 1,
            'user_name': 'Alex',
            'first_name': 'Алексей',
            'last_name': 'Соболев',
            'email': 'alex@alex.com'
        })
        view = UserModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
    
    def test_get_detail(self):
        user = User.objects.create(user_name='Alex', first_name='Алексей', last_name='Соболев', email='alex@alex.com')
        client = APIClient()
        response = client.get(f'/api/users/{user.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_guest(self):
        user = User.objects.create(user_name='Alex', first_name='Алексей', last_name='Соболев', email='alex@alex.com')
        client = APIClient()
        response = client.put(f'/api/users/{user.id}/', 
                              {'user_name': 'Ivan', 'first_name': 'Иван', 'last_name': 'Иванов'})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_edit_admin(self):
        user = User.objects.create(user_name='Alex', first_name='Алексей', last_name='Соболев', email='alex@alex.com')
        client = APIClient()
        admin = DjangoUser.objects.create_superuser('admin', 'admin@admin.com', 'admin')
        client.login(username='admin', password='admin')
        response = client.put(f'/api/users/{user.id}/', 
                              {'user_name': 'Ivan', 'first_name': 'Иван', 'last_name': 'Иванов'})
        user = User.objects.get(pk=user.id)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(user.user_name, 'Ivan')
        self.assertEqual(user.first_name, 'Иван')
        self.assertEqual(user.last_name, 'Иванов')
        client.logout()


class TestProjectViewSet(APITestCase):
    
    def test_get_list(self):
        response = self.client.get('/api/project/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)


    # Не смог заставить работать, ловлю 400((
    # def test_edit_mixer(self):
    #     project = mixer.blend(Project)
    #     print(project.__dict__)
    #     admin = DjangoUser.objects.create_superuser('admin', 'admin@admin.com', 'admin')
    #     self.client.login(username='admin', password='admin')
    #     response = self.client.put(f'/api/project/{project.id}/', {'name': 'Test', 'link': 'http://ya.ru'})
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)
    #     project = Project.objects.get(id=Project.id)
    #     self.assertEqual(project.name, 'Test')
    #     self.client.logout()

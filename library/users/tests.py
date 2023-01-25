from django.test import TestCase

import requests


post_response = requests.post('http://127.0.0.1:8000/api-token-auth/', data={'username':
'Alex', 'password': 'alex070887'})

print(post_response.status_code)
print(post_response.json())

get_response = requests.get('http://127.0.0.1:8000/api/users/', 
                        data={'token': '5f8ebab90754611bd03db4838f5e8db0d2803cd6'})

print(get_response.status_code)
print(get_response.json())

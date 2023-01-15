from django.db import models
from users.models import User
from django.utils import timezone


class Project(models.Model):
    name = models.CharField(max_length=64)



class ToDo(models.Model):
    title = models.CharField(max_length=250)
    content = models.TextField(blank=True)
    user = models.ForeignKey(User, blank=True, on_delete=models.CASCADE)
    project = models.ForeignKey(Project, blank=True, on_delete=models.CASCADE)
    created_at = models.DateField(default=timezone.now().strftime("%d-%m-%Y"))
    updated_at = models.DateField(default=timezone.now().strftime("%d-%m-%Y"))

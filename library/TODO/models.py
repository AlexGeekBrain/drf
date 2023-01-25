from django.db import models
from users.models import User


class Project(models.Model):
    name = models.CharField(max_length=64)
    link = models.URLField(max_length=64, null=True)
    users = models.ManyToManyField(User)



class ToDo(models.Model):
    title = models.CharField(max_length=250)
    content = models.TextField(blank=True)
    user = models.ForeignKey(User, blank=True, on_delete=models.CASCADE)
    project = models.ForeignKey(Project, blank=True, on_delete=models.CASCADE)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    closed = models.BooleanField(default=False)

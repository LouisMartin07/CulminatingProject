from django.db import models
from django.contrib.auth.models import AbstractUser

class AppUser(AbstractUser):
    email = models.EmailField(unique=True)
    display_name = models.CharField(default='unknown' , max_length=50)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS =[]

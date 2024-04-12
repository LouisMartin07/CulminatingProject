from django.db import models
from django.contrib.auth.models import AbstractUser

class AppUser(AbstractUser):
    email = models.EmailField(unique=True)
    display_name = models.CharField(default='unknown' , max_length=50)
    zip_code = models.CharField(max_length=10, null=False, blank=False) #5 digit zips plus hyphen and 4 digits
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS =[]

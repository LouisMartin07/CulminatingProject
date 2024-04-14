# models.py
from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager

class AppUserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        """Creates and saves a User with the given email and password."""
        if not email:
            raise ValueError('The email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, **extra_fields):
        """Creates and saves a superuser with the given email and password."""
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(email, password, **extra_fields)

class AppUser(AbstractUser):
    email = models.EmailField(unique=True)
    display_name = models.CharField(default='unknown', max_length=50)
    zip_code = models.CharField(max_length=10, blank=False)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []  # Email and password are required by default

    objects = AppUserManager()  # attach the custom UserManager to the model
from django.db import models
from django.contrib.auth.models import AbstractBaseUser,PermissionsMixin
from django.utils import timezone
from .managers import CustomUserManager

class CustomUser(AbstractBaseUser,PermissionsMixin):
    email=models.EmailField("Email Address",unique=True)
    first_name=models.CharField("First Name",max_length=100)
    last_name=models.CharField("Last Name",max_length=100)
    is_staff=models.BooleanField(default=False)
    is_superuser=models.BooleanField(default=False)
    is_verified=models.BooleanField(default=False)
    is_active=models.BooleanField(default=True)
    date_joined=models.DateTimeField(default=timezone.now)
    last_login=models.DateTimeField(auto_now=True)

    USERNAME_FIELD="email"
    REQUIRED_FIELDS=["first_name","last_name"]
    objects=CustomUserManager()

    def __str__(self):
        return self.email
    
    @property
    def get_full_name(self):
        return f"{self.first_name} {self.last_name}"
    
    def tokens(self):
        pass
    

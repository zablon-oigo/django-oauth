from django.contrib.auth.base_user import BaseUserManager
from django.core.validators import validate_email
from django.core.exceptions import ValidationError


class CustomUserManager(BaseUserManager):
    def create_user(self,email,first_name,last_name,password=None,**extra_fields):

        if not email:
            raise ValueError("The Email must be set")
        if not first_name:
            raise ValueError("The First Name field must be set")
        if not last_name:
            raise ValueError("The Last Name field must be set")
        try:
            validate_email(email)
        except ValidationError:
            raise ValueError("Please enter a valid email address")
        email=self.normalize_email(email)
        user=self.model(email=email,first_name=first_name,last_name=last_name ,**extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self,email,first_name,last_name,password=None, **extra_fields):
        extra_fields.setdefault("is_staff",True)
        extra_fields.setdefault("is_superuser",True)
        extra_fields.setdefault("is_active",True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must havve is_superuser=True")
        return self.create_user(email,first_name,last_name,password, **extra_fields)